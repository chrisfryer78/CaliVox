# CaliVox

## Setup

Clone this repo:

git clone git@github.com:chrisfryer78/CaliVox.git

You also need Google TTS credentials. This includes a file that you need to put into
the project directory. I don't yet have instructions on how to set that up.

Once it's done, you need to tell the application how to use it. For example:

export GOOGLE_APPLICATION_CREDENTIALS="/mnt/c/Users/Chris/google-tts/CaliVox-TTS.json"

or

export GOOGLE_APPLICATION_CREDENTIALS="/Users/jon/Src/CaliVox/CaliVox-TTS.json"

That command can be done manually each time you open a new shell to run CaliVox, or
you can add it to your .bashrc or equivalent file.

Then:

npm install

## Use

To run it:

node index

We need to create a startup script.

CaliVax will create a local web server running on port 3126. Load it in a web
browser running on the same machine:

http://localhost:3126

