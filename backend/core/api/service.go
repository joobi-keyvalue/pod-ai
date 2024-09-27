package api

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Message      string       `json:"message,omitempty"`
	Data         interface{}  `json:"data,omitempty"`
	Error        string       `json:"error,omitempty"`
	ErrorCode    string       `json:"error_code,omitempty"`
	RequestID    string       `json:"request_id,omitempty"`
	ResponseCode ResponseCode `json:"response_code,omitempty"`

	// can be used when returning multiple form errors
	Errors []ErrorInfo `json:"errors,omitempty"`
}

// ErrorInfo specifies what info are we sending.
// Use IsEmpty method instead of comparing with struct literal.
type ErrorInfo struct {
	Field    string          `json:"field"`
	Message  string          `json:"message"`
	Metadata json.RawMessage `json:"metadata,omitempty"`
}

type ResponseCode string

func RespondWithJSON(rw http.ResponseWriter, status int, response Response) {
	respBytes, err := json.Marshal(response)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}
	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(status)
	rw.Write(respBytes)
}

func RespondWithError(rw http.ResponseWriter, status int, response Response) {
	respBytes, err := json.Marshal(response)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Add("Content-Type", "application/json")
	rw.WriteHeader(status)
	rw.Write(respBytes)
}
