const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
//const port = process.env.PORT || 3000;
const app = express();
const PATH_CLIENT = path.resolve(__dirname, '..', 'client');
const { getPostgresClient } = require('./postgres');

app.use(express.static('./'));
app.use(express.static(path.join('./', 'dist')));
app.use(express.static(path.join('./', 'dist','client')));
//app.use(bodyParser.urlencoded({ extended: true })); //client側のjsでは、urlencodedよりjsonのほうが扱いやすそうなので修正(curlが少し大変)
app.use(bodyParser.json());

app.post('/api/write/', function(req, res){
	console.log('write: ' + req.body.tweet);
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'INSERT INTO tweets(user_id, tweet, tweet_time) VALUES ($1, $2, $3)';
			const result = await db.execute(SQL, [1, req.body.tweet, 'now()']);
			res.status(200).send(JSON.stringify({'message': 'Write: Succeed: ' + req.body.tweet}));
		} catch (e) {
			console.log('#ERROR#: Write');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Write'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});

app.post('/api/read/', function(req, res){
	console.log('read');
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'SELECT * FROM tweets';
			const result = await db.execute(SQL);
			res.status(200).send(result);
		} catch (e) {
			console.log('#ERROR#: Read');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Read'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});

app.post('/api/test/', function(req, res){
	console.log(req.body.name);
	res.status(200).send(req.body.name);
});

app.post('/api/delete/', function(req, res){
	console.log('delete: '+req.body.tweet_id);
	(async() => {
		const db = await getPostgresClient();
		try {
			if(req.body.tweet_id == ''){
				const SQL = 'DELETE from tweets';
				const result = await db.execute(SQL);
			} else {
				const SQL = 'DELETE from tweets WHERE tweet_id = $1';
				const result = await db.execute(SQL, [req.body.tweet_id]);
			}
			res.status(200).send(JSON.stringify({'message': 'Delete: Succeed!'}));
		} catch (e) {
			console.log('#ERROR#: Delete');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Delete'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});

app.get('/*', function(req, res){
	console.log('**');
	res.sendFile(path.resolve(PATH_CLIENT, 'index.html'));
});

app.listen(port, () => {
	console.log('server is running at '+port);
});
