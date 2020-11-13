const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('./'));
app.use(express.static(path.join('./', 'dist')));
app.use(express.static(path.join('./', 'dist','client')));
//console.log(`server is running at ${port}`);
//console.log(`dirname is ${__dirname}`);
app.get('/*', function(req, res){
	res.sendFile(path.resolve(path.join(__dirname, '..', 'client', 'index.html')));
});

app.listen(port);
