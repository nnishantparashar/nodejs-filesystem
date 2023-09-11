const express = require("express");

const fs = require('fs');
const path = require('path');
const date = require('date-and-time')

const app = express();

app.get("/create", (req, res) => {
 
    //note: since these characters- '.\ / : * ? " < > |' are not allowed in file name. 
    //format date time
  const value = date.format((new Date()), 'YYYY-MM-DD-HH-mm-ss');
 
  const newFileName = `${value}.txt`
  const folderName = "files";
  const timestamp = Date.now()
  const data = timestamp.toString();

  console.log(newFileName, folderName, data)

  fs.appendFile(path.join(__dirname, folderName, newFileName), data, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  res.send({
    message: "file created successfully.",
    filePath: path.join(__dirname, folderName, newFileName)
  });
});

app.get("/read", (req, res) => {
    fs.readdir(path.join(__dirname, 'files'), 'utf8',
    
    function(err, data) {       
        if (err) throw err;
        res.send({
            files: data
        })
});
});

app.listen(5000, () => {
  console.log("App is running on PORT: 5000");
});
