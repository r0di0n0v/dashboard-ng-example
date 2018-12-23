const WebSocket = require('ws');

const ports = [
    8080,
];

const servers = ports.map((port) => {
    const wss = new WebSocket.Server({ port });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log(`[${port}] received: ${message}`);
            try {
                const data = JSON.parse(JSON.parse(message));
                ws.send(JSON.stringify({
                    event: data.event,
                    data: data.data
                }));
            } catch (e) {
                console.error(e);
            }
        });
    });

    console.log(`Init server on port: ${port}`);
});

