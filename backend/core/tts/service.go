package tts

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jmoiron/sqlx"
	"github.com/keycode/podai/logger"
	"io"
	"net/http"
	"os"
	"regexp"
	"time"
)

type service struct {
	db *sqlx.DB
}

type Service interface {
	GenerateAndStore()
}

func NewService(
	db *sqlx.DB,
) Service {
	return &service{
		db: db,
	}
}

func (s service) GenerateAndStore() {
	logger.Info(context.Background(), "in sercice")

	scripts, err := s.GetScript()
	if err != nil {
		logger.Error(context.Background(), "error while getting scripts", err.Error())
	}
	for _, sc := range scripts {
		logger.Info(context.Background(), sc)
		re := regexp.MustCompile(`"([^"]+)":\s*"((?:[^"\\]|\\.)*?)"`)

		// Find all matches
		matches := re.FindAllStringSubmatch(sc.Script, -1)

		// Create a slice to hold the results
		var dialogues []Dialogues

		// Iterate through matches and populate the slice
		for _, match := range matches {
			hostID := match[1] // host ID
			text := match[2]   // corresponding text
			logger.Info(context.Background(), hostID, text)
			dialogues = append(dialogues, Dialogues{VoiceID: voiceIDMap[hostID], Text: text})
		}

		logger.Info(context.Background(), dialogues)

		err = s.generateAudio(dialogues, sc.PodcastID)
		if err != nil {
			logger.Error(context.Background(), "error while generating audio", err.Error())
			return
		}
	}

	//	store link in db
}

func (s service) generateAudio(dialogues []Dialogues, podcastID int) error {
	var files []string

	for i, part := range dialogues {
		fmt.Printf("Processing part %d...\n", i+1)
		fileName := fmt.Sprintf("part%d.mpga", i+1)
		logger.Info(context.Background(), "request", part.VoiceID, part.Text, fileName)
		err := generateSpeech(part.VoiceID, part.Text, fileName)
		if err != nil {
			fmt.Printf("Error generating speech for part %d: %v\n", i+1, err)
			continue
		}
		files = append(files, fileName)
	}

	outputFile := fmt.Sprintf("final_podcast_%d.mpga", time.Now().Unix())
	err := concatenateFiles(files, outputFile)
	if err != nil {
		fmt.Printf("Error concatenating files: %v\n", err)
		return err
	}

	// Delete temporary files
	for _, file := range files {
		if err := os.Remove(file); err != nil {
			fmt.Printf("Error deleting temporary file %s: %v\n", file, err)
		}
	}

	// Read the final output file
	fileBytes, err := os.ReadFile(outputFile)
	if err != nil {
		return fmt.Errorf("error reading final output file: %v", err)
	}

	// Prepare S3 upload request
	s3Request := S3UploadRequest{
		Bucket:    "keycode-wetestinprod", // Replace with your actual bucket name
		S3Path:    "podcasts/" + outputFile,
		FileBytes: fileBytes,
	}

	// Upload to S3
	s3Link, err := UploadFile(s3Request)
	if err != nil {
		return fmt.Errorf("error uploading to S3: %v", err)
	}

	logger.Info(context.Background(), "Podcast uploaded successfully. S3 link: %s\n", s3Link)

	err = s.UpdateAudioLink(context.Background(), podcastID, s3Link)
	if err != nil {
		logger.Error(context.Background(), err.Error())
	}

	// Delete the local final output file
	if err = os.Remove(outputFile); err != nil {
		fmt.Printf("Error deleting final output file %s: %v\n", outputFile, err)
	}

	return nil
}

func generateSpeech(voiceID, text, fileName string) error {
	// Create the request body
	body := SpeechRequest{
		Text: text,
		VoiceSettings: VoiceSettings{
			Stability:       1,
			SimilarityBoost: 1,
		},
	}
	bodyJSON, err := json.Marshal(body)
	if err != nil {
		return err
	}

	// Make the request
	req, err := http.NewRequest("POST", apiURL+voiceID, bytes.NewBuffer(bodyJSON))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("xi-api-key", apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// Save the .mpga file
	out, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	if err != nil {
		return err
	}

	fmt.Printf("File saved: %s\n", fileName)
	return nil
}

func concatenateFiles(files []string, output string) error {
	out, err := os.Create(output)
	if err != nil {
		return err
	}
	defer out.Close()

	for _, file := range files {
		f, err := os.Open(file)
		if err != nil {
			return err
		}

		_, err = io.Copy(out, f)
		f.Close()

		if err != nil {
			return err
		}
	}

	fmt.Printf("Concatenated file created: %s\n", output)
	return nil
}

func UploadFile(request S3UploadRequest) (link string, err error) {
	var awsSession *session.Session

	// The session the S3 Uploader will use
	awsSession, err = session.NewSession(&aws.Config{
		Region: aws.String("ap-south-1"),
	})
	if err != nil {
		return
	}

	// Create an uploader with the session and default options
	uploader := s3manager.NewUploader(awsSession)

	inputRequest := &s3manager.UploadInput{
		Bucket: &request.Bucket,
		Key:    &request.S3Path,
		Body:   bytes.NewReader(request.FileBytes),
	}

	// Upload the file to S3.
	upload, err := uploader.Upload(inputRequest)
	if err != nil {
		return
	}

	link = upload.Location
	return
}
