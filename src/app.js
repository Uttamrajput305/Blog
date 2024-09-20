const express = require("express");
const helmet = require("helmet");
const cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/dev.env" });
require("./db/mongoose");
const vendorRouter = require("./routers/admin.router");
const contextPath = "/rest/api";
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(contextPath, vendorRouter);
require("./swagger/swagger")(app);
app.use(helmet());
app.use(cors()); 
const PORT = process.env.PORT;
app.get("/",(req, res)=>{
 res.send("Hi, This  is the Blog...")
})
const server = app.listen(PORT, () =>
  console.log(`server running on port ${PORT}`)
);
