//async function soundFiles() {
    const path = require('path');
    const fs = require('fs');
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'pub');

    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            if (file.substr(-3,3) == 'mp3')
                console.log(file); 
        });
    });

//}
//module.exports = soundFiles;