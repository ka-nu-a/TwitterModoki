const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const PATH_CLIENT = path.resolve(__dirname, '..', 'client');
const getPostgresClient = require('./postgres').getPostgresClient;

app.use(express.static('./'));
app.use(express.static(path.join('./', 'dist')));
app.use(express.static(path.join('./', 'dist','client')));

console.log(`server is running at ${port}`);
//console.log(`dirname is ${__dirname}`);

app.get('/api/read/', function(req, res){
	console.log('DB: Read');
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = 'SELECT * FROM hoge';
			const result = await db.execute(SQL);
			//console.log(result);
			res.status(200).send(result);
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error.");
			throw e;
		}
	})();
});

app.get('/api/write/:name', function(req, res){
	//console.log('DB: write: ' + req.params.name);
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = "INSERT INTO hoge(foo) VALUES ($1)";
			const result = await db.execute(SQL, [req.params.name]);
			//console.log(result);
			res.status(200).send("Succeed!");
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error.");
			throw e;
		}
	})();
});

app.get('/api/delete/', function(req, res){
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = "DELETE from hoge";
			const result = await db.execute(SQL);
			res.status(200).send("Succeed!");
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error.");
			throw e;
		}
	})();
});

app.get('/api/delete/:name', function(req, res){
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = "DELETE from hoge WHERE foo = $1";
			const result = await db.execute(SQL, [req.params.name]);
			res.status(200).send("Succeed!");
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error.");
			throw e;
		}
	})();
});

app.get('/*', function(req, res){
	console.log('**');
	res.sendFile(path.resolve(PATH_CLIENT, 'index.html'));
});

app.listen(port);
