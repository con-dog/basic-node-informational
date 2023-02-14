import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const host = "localhost";
const port = 8000;

const requestListener = function (req, res) {
    if (req.url === "/") {
        fs.readFile(path.resolve() + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    } else if (["/about", "/contact"].includes(req.url)) {
        fs.readFile(path.resolve() + `/${req.url}.html`)
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    } else {
        fs.readFile(path.resolve() + "/404.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(404);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
    }
};


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
