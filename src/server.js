const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
//app.use(express.static('./'));
//app.use(express.static(path.join('./', 'dist')));
app.get('/*', function(req, res){
	//res.sendFile(path.join('./', 'dist', 'index.html'));
	res.sendFile(path.join(__dirname, '../', 'test.html'));
});

app.listen(port);
