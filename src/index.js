const http = require('http');
const { getUsers } = require('./users');

const HOST = '127.0.0.1';
const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
    const url = new URL(request.url, `http://${HOST}`);
    const params = url.searchParams;
    const paramKeys = [...params.keys()];

    if (paramKeys.length === 0) {
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Hello, World!');
        return;
    }

    if (paramKeys.length === 1 && paramKeys[0] === 'hello') {
        const name = params.get('hello');

        if (!name) {
            response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end('Enter a name');
            return;
        }

        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(`Hello, ${name}.`);
        return;
    }

    if (paramKeys.length === 1 && paramKeys[0] === 'users') {
        getUsers((error, data) => {
            if (error) {
                response.writeHead(500);
                response.end();
                return;
            }

            response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            response.end(data);
        });
        return;
    }

    response.writeHead(500);
    response.end();
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
