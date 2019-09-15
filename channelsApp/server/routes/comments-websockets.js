var express = require('express');
var router = express.Router();
const WebSocket = require("ws");

const broadcast = (clients, message) => {

    clients.forEach((client) => {

        if (client.readyState === WebSocket.OPEN) {

            client.send(message);
        }
    });
};

router.get("/message", (req, res) => {
    console.log("Message Recieved");
    broadcast(req.app.locals.clients, "Bark!");

    return res.sendStatus(200);
});


module.exports = router;