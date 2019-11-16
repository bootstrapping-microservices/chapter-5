const express = require("express");
const fs = require("fs");
const request = require("request");

//
// Send the "viewed" to the history microservice.
//
function sendViewedMessage(videoPath) {
    const postOptions = { // Options to the HTTP POST request.
        body: { 
            videoPath: videoPath 
        },
        json: true
    };

    request.post( // Send the "viewed" message to the history microservice.
        "http://history/viewed",
        postOptions,
        (err, res) => {
            if (err)  {
                console.error("Failed to send 'viewed' message!");
                console.error(err && err.stack || err);
            }
            else {
                console.log("Sent 'viewed' message to history microservice.");
            }
        }
    );
}

//
// Setup event handlers.
//
function setupHandlers(app) {
    app.get("/video", (req, res) => { // Route for streaming video.

        const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error("An error occurred ");
                res.sendStatus(500);
                return;
            }
    
            res.writeHead(200, {
                "Content-Length": stats.size,
                "Content-Type": "video/mp4",
            });
    
            fs.createReadStream(videoPath).pipe(res);

            sendViewedMessage(videoPath); // Send message to "history" microservice that this video has been "viewed".
        });
    });
}

//
// Start the HTTP server.
//
function startHttpServer() {
    return new Promise(resolve => { // Wrap in a promise so we can be notified when the server has started.
        const app = express();
        setupHandlers(app);
        
        const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
        app.listen(port, () => {
            resolve();
        });
    });
}

//
// Application entry point.
//
function main() {
    return startHttpServer();
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });