// Imports the Google Cloud client library 
const textToSpeech = require('@google-cloud/text-to-speech'); 
 // Import other required libraries 
const fs = require('fs'); 
const util = require('util'); 
let arg0 = process.argv[2];
let arg1 = process.argv[3];
// Creates a client 
const client = new textToSpeech.TextToSpeechClient(); 
async function quickStart() {
    // The text to synthesize
    // Construct the request
   const request = {
     input: {text: arg0},
     // Select the language and SSML voice gender (optional)
     voice: {languageCode: 'en-UK', ssmlGender: 'MALE'},
     // select the type of audio encoding
     audioConfig: {audioEncoding: 'MP3', speakingRate: 0.9},
   };

    // Performs the text-to-speech request
   const [response] = await client.synthesizeSpeech(request);
   // Write the binary audio content to a local file
   const writeFile = util.promisify(fs.writeFile);
   await writeFile('pub/' + arg1 + '.mp3', response.audioContent, 'binary');
   console.log('Audio content written to file:' + arg1);
 }

 quickStart();