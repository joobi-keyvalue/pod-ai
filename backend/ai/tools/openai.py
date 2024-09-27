
from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv()

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def summarize_topic(topic, content):
    prompt = (
    'You are a specialized bot designed to summarize topics. '
    'Your task is to take the provided content and generate summary paragraph of the topic. '
    'Please follow these guidelines: '
    '-The input contents data scrapped from multiple websites, Ensure to include topics from every sites '
    '- Keep in mind that the summary will be later used to generate a podcast script, So summarize it into discussable topics. '
    '- Do not include any additional information that is not present in the content. '
    '- Your output must contain only the summary, with no additional commentary or explanations. '
    '- Ensure to include every distinct topic in the content in the sumarry'

    'Now, summarize the following topic and content: '
    f'Topic: "{topic}"'
    f'Content: "{content}"'
)
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    summary = response.choices[0].message.content.strip()
    print(response.choices[0].message.content.strip())
    return script_generator(summary)

def script_generator(content):
    prompt = (
    'You are a specialized bot designed to generate podcast scripts. '
    'Your task is to take the provided content and generate a podcast script. '
    'Please follow these guidelines: '
    'Ensure the script is engaging and conversational. '
    'Add filler words and sounds to make the conversation sound more natural. '
    'Add words like "um", "uh", "hmm", "ahh", etc wherever it is relevant '
    'Include pauses and breaks between dialogues. '
    'Example output format :'
    'Host: Host 1: Hey, welcome to todays episode! We got a... hmmm exciting topic on the table. We are talking about how to generate a podcast using Eleven Labs text-to-speech APIs. The idea is to take written dialogues, turn them into speech, and then stitch them all together for a seamless, natural-sounding episode. '
    'Host 2: Yeah, ahh, it sounds cool, right? I mean, imagine you hve got the podcast script ready, and then you just call the API for each speakers part—and, boom, instantly you have got high-quality voiceovers. You get to control voices, the tone, even, ahh, accents if you want to. Pretty sweet for content creators, right?'
    f'Content: {content}'
    )

    response = openai_client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt}],
    )
    script = response.choices[0].message.content.strip()
    print(response.choices[0].message.content.strip())
    return convert_to_ssml(script)


def convert_to_ssml(content):
    prompt = (
    'You are a specialized bot designed to convert podcast scripts into SSML format. '
    'Your task is to take the provided content and transform it into valid SSML format. '
    'Please follow these guidelines: '
    '- Use distinct voice tags for each speaker. '
    '- Maintain the prosody settings for speech rate and pitch as shown in the examples. '
    '- Ensure to include appropriate breaks between speaker dialogues. '
    '- Use the `<emphasis>` tag to highlight important words or phrases. '
    '- Include `<break>` tags to add pauses between sentences. '
    '- Use `<prosody>` tags to adjust the speech rate, pitch, and volume. '
    '- Ensure to use ONLY tags provided in the example'
    '- Do not include any additional tags or attributes. '
    '- Do not include any escape sequences like \n or \t in the SSML.'
    '- Your output must contain only the SSML formatted text, with no additional commentary or explanations. '
    'Here is an example of the input and the expected output: '
    'Input: '
    'Host: Host 1: Hey, welcome to todays episode! We got a... hmmm exciting topic on the table. We are talking about how to generate a podcast using Eleven Labs text-to-speech APIs. The idea is to take written dialogues, turn them into speech, and then stitch them all together for a seamless, natural-sounding episode. '
    'Host 2: Yeah, ahh, it sounds cool, right? I mean, imagine you hve got the podcast script ready, and then you just call the API for each speakers part—and, boom, instantly you have got high-quality voiceovers. You get to control voices, the tone, even, ahh, accents if you want to. Pretty sweet for content creators, right?'
    'Output: '
    '{'
    '{host1, `<speak><prosody rate="medium">Hey, welcome to todays episode! <break time="300ms"/> We got a... <emphasis level="strong">hmmm</emphasis> exciting topic on the table. <break time="200ms"/> We are talking about how to generate a podcast using Eleven Labs text-to-speech APIs. <break time="100ms"/> The idea is to take written dialogues, turn them into speech, and then stitch them all together for a seamless, natural-sounding episode.</prosody></speak>`},'
    '{host2, `<speak><prosody rate="medium" pitch="medium">Yeah, ahh, it sounds cool, right? <break time="100ms"/> I mean, imagine you hve got the podcast script ready, and then you just call the API for each speakers part—<break time="200ms"/> and, boom, <emphasis level="strong">instantly</emphasis> youhve got high-quality voiceovers. <break time="100ms"/> You get to control voices, the tone, even, ahh, accents if you want to. <break time="200ms"/> Pretty sweet for content creators, right?</prosody></speak>`},'
    '}'
    'Now, convert the following content into SSML format: '
    'Strictly follow the output format as shown in the example. which is a JSON object with the speaker name and the SSML formatted text. '
    'Make sure you return the converted SSML not the expected one from the given example.  '
    f'Content: {content}'
)
    response = openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )
    print(response.choices[0].message.content.strip())
    return response.choices[0].message.content.strip()