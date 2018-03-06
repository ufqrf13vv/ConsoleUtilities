const fs = require('fs');
const path = require('path');
const readFiles = require('./modules/read.js');
const deleteFolder = require('./modules/delete.js');
const yargs = require('yargs');
const argv = yargs
    .help('h')
    .alias('h', 'help')
    .demand('f')
    .nargs('f', 1)
    .describe('f', 'Enter the path to the source folder.')
    .alias('f', 'from')
    .nargs('t', 1)
    .describe('t', 'Enter the path to the new folder.')
    .alias('t', 'to')
    .nargs('d', 1)
    .describe('d', 'Delete source folder? Yes(y)/No(n)')
    .alias('d', 'delete')
    .argv;

//  Чтение и копирование файлов в новую папку
readFiles(argv.f, argv.t);

//  Удаление исходной папки
if (argv.d == 'y') {
    deleteFolder(argv.f);
}

console.log('Application complete!');