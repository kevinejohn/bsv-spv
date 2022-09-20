const { Server } = require("../src");
const path = require("path");

const name = "test-server";
const ticker = "BSV";

const dataDir = path.join(__dirname, "data");
const server = new Server({ name, ticker, dataDir });
server.connect();
server.listen();
