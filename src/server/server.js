const express = require('express');
const path = require('path');
const bodyParser = require('body-Parser');
//const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;
const app = express();
const PATH_CLIENT = path.resolve(__dirname, '..', 'client');
const getPostgresClient = require('./postgres').getPostgresClient;

app.use(express.static('./'));
app.use(express.static(path.join('./', 'dist')));
app.use(express.static(path.join('./', 'dist','client')));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/write/', function(req, res){
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = "INSERT INTO tweets(user_id, tweet, tweet_time) VALUES ($1, $2, $3)";
			const result = await db.execute(SQL, [1, req.body.tweet, "now()"]);
			res.status(200).send("Write: Succeed: " + req.body.tweet);
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error: Write");
			throw e;
		}
	})();
});

app.post('/api/read/', function(req, res){
	(async() => {
		try {
			const db = await getPostgresClient();
			const SQL = 'SELECT * FROM tweets';
			const result = await db.execute(SQL);
			res.status(200).send(result);
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error: Read");
			throw e;
		}
	})();
});

app.post('/api/test/', function(req, res){
	console.log(req.body.name);
	res.status(200).send(req.body.name);
});

app.post('/api/delete/', function(req, res){
	(async() => {
		try {
			const db = await getPostgresClient();
			if(req.body.tweet_id == ""){
				const SQL = "DELETE from tweets";
				const result = await db.execute(SQL);
			} else {
				const SQL = "DELETE from tweets WHERE tweet_id = $1";
				const result = await db.execute(SQL, [req.body.tweet_id]);
			}
			res.status(200).send("Delete: Succeed!");
		} catch (e) {
			console.log('#ERROR#: unknown');
			res.status(500).send("DB Error: Delete");
			throw e;
		}
	})();
});

app.get('/*', function(req, res){
	console.log('**');
	res.sendFile(path.resolve(PATH_CLIENT, 'index.html'));
});

app.listen(port, () => {
	console.log("server is running at "+port);
});
