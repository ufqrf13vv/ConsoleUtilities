const fs = require('fs');
const path = require('path');

//  Удаление исходной папки
const deleteFolder = (directory) => {
    const files = fs.readdirSync(directory);

    files.forEach(item => {
        let filePath = path.join(directory, item);

        if (fs.statSync(filePath).isDirectory()) {
            return deleteFolder(filePath);
        } else {
            fs.unlinkSync(filePath);
        }
    });

    fs.rmdirSync(directory);
};

module.exports = deleteFolder;