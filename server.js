import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let esp = null;
let app = null;

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (msg) => {
    const text = msg.toString();

    if (text === "ESP32_CONNECTED") esp = ws;
    else if (text === "APP_CONNECTED") app = ws;
    else if (ws === app && esp) esp.send(text);
    else if (ws === esp && app) app.send(text);
  });
});

console.log("Server running on ws://localhost:8080");
