import { Server } from "../src";
import path from "path";

const name = "test-server";
const ticker = "BSV";
const dataDir = path.join(__dirname, "data");

const server = new Server({ name, ticker, dataDir });
server.connect({ port: 8080 });
server.listen({ port: 8081 });
