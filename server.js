// const server = http.createServer();
const http = require("http");
http
    .createServer((reqs, resp) => {
            resp.writeHead(200, { 'Content-Type': 'application/json' });

            if(reqs.url === '/product'){
                resp.end(JSON.stringify({
                    message: "Router of product"
                })
              );
            }
    
            if(reqs.url === '/costumer'){
                resp.end(JSON.stringify({
                    message: "Router of costumer"
                })
              );
            }

            resp.end(
                JSON.stringify({
                message: "unknown route"
            }));
            
        })
    .listen(4001, () => console.log("Loading port 4001"));

