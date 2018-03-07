const fs = require('fs');
const path = require('path');

const readFiles = (directory, newDirectory) => {
    let newDir = path.normalize(newDirectory);
    let files = fs.readdirSync(directory);

    //  Новая папка для копирования файлов
    if (!fs.existsSync(newDir)) {
        fs.mkdirSync(newDir);
    }

    files.forEach(file => {
        let filePath = path.join(directory, file);

        if (fs.statSync(filePath).isDirectory()) {  //  если папка, то заходим внутрь
            readFiles(filePath, newDir);
        } else {
            let newFolderName = file.toString().charAt(0).toUpperCase();
            let newFolderPath = path.join(newDir, newFolderName);

            if (!fs.existsSync(newFolderPath)) {    //  создаём новые папки с именем первого заглавного символа из названия файлов
                fs.mkdirSync(newFolderPath);
            }
            //  Копирование файла в новую папку
            fs.copyFileSync(filePath, `${newFolderPath}/${file}`);
        }
    });
};

module.exports = readFiles;