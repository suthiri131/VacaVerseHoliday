require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const cors = require("cors");
const app = express();
const route = require("./src/route/routes");
const webhookRoute = require("./src/route/stripeWebhook"); // Import the new webhook route

const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(router);
route(app, router);
// app.use("/api", webhookRoute);
app.use("/api", webhookRoute);
//app.use('/webhook', express.raw({type: '*/*'}))
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server)
io.on('connection',socket =>{
  console.log('New WS Connection...')
})
const port = process.env.PORT || 8081;
server.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
