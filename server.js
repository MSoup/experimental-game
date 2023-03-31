const express = require('express')
const path = require('path')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("dist"))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(port);
console.log('Server started at http://localhost:' + port);