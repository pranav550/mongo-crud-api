var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.port || 3000;
var app = express();
var Users = require("./routes/user");
var mongooseUrl = require("mongoose");
mongooseUrl
  .connect(
    "mongodb://localhost/crudMongoApi",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoose connected"))
  .catch(err => console.log("Error:" + err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", Users);

app.listen(port, () => {
  console.log("server started");
});
