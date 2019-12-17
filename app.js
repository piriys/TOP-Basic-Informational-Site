const http = require('http');
const url = require('url');
const fileSystem = require('fs');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    const query = url.parse(request.url, true);
    const fileName = `.${query.pathname}`;

    fileSystem.readFile(fileName, (error, data) => {
        if (error) {
            console.log(`page not found. redirecting to http://${request.headers['host']}/404.html`);
            response.writeHead(302, { 'Location': `http://${request.headers['host']}/404.html` });
            return response.end();
        } else {
            console.log('page found');
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            return response.end();
        }
    });
}).listen(8080);