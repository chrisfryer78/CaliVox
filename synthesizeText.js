async function synthesizeText(text) {
    'use strict';
    // [START tts_synthesize_text]
    const textToSpeech = require('@google-cloud/text-to-speech');
    const fs = require('fs');
    const util = require('util');

    const client = new textToSpeech.TextToSpeechClient();
    // const outputFile = Date.now().toString(36).slice(2) + '.mp3';
    var bla = text.replace(/\s+/g, '');
    const outputFile = 'pub/' + bla.substr(0,12) + '.mp3';
    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // const text = 'Text to synthesize, eg. hello';
    // const outputFile = 'Local path to save audio file to, e.g. output.mp3';

    const request = {
        input: {
            text: text
        },
        voice: {
            languageCode: 'en-AU',
            ssmlGender: 'MALE'
        },
        audioConfig: {
            audioEncoding: 'MP3'
        },
    };
    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
    // [END tts_synthesize_text]
}
module.exports = synthesizeText;