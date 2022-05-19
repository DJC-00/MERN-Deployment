const express = require("express");
const cors = require('cors')
const app = express();

port = 8000;

require("./server/config/mongoose.config");
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors())
require('./server/routes/pet.routes')(app);

app.listen(port, () => console.log("The server is all fired up on port 8000"));