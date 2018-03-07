const http = require('http');
const server = http.createServer();
const port = 3000;

const yargs = require('yargs');
const argv = yargs
    .help('h')
    .alias('h', 'help')
    .demand('t')
    .nargs('t', 2)
    .describe('t', 'Enter time interval and time end')
    .alias('t', 'time')
    .argv;

const timeInterval = argv.t[0] * 1000;
const timeEnd = argv.t[1] * 1000;

server.on('request', (req, res) => {
    res.writeHead(200);

    if (req.url === '/') {
        const getTime = setInterval(() => {
            console.log(new Date().toUTCString());
        }, timeInterval);

        setTimeout(() => {
            console.log('End');
            clearInterval(getTime);
            res.end(new Date().toUTCString());
        }, timeEnd);
    }
});

server.listen(port, () => {
    console.log(`Сервер запущен на порту: ${port}`);
});

