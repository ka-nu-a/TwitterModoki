const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuid4 = require('uuid4');
//const port = process.env.PORT || 8080;
const port = process.env.PORT || 3000;
const app = express();
const PATH_CLIENT = path.resolve(__dirname, '..', 'client');
const { getPostgresClient } = require('./postgres');

app.use(express.static('./'));
app.use(express.static(path.join('./', 'dist')));
app.use(express.static(path.join('./', 'dist','client')));
//app.use(bodyParser.urlencoded({ extended: true })); //client側のjsでは、urlencodedよりjsonのほうが扱いやすそうなので修正(curlが少し大変)
app.use(bodyParser.json());

const createToken = async function(psqlClient, loginId){
	const token = uuid4(); //tokenとしてuuid v4を使用 (将来変更の可能性もあるため、DB上の型自体は文字列としている。)
	const SQL = 'UPDATE users SET token = $1 WHERE loginid = $2';
	await psqlClient.execute(SQL, [token, loginId]);
	
	return token;
}

// ログイン
app.post('/api/login/', function(req, res){
	(async() => {
		const db = await getPostgresClient();
		try {
			if(typeof req.body.token === "undefined"){ // tokenパラメータがなければ、ID/PWによるログインとみなす
				const SQL = 'SELECT id, password, name FROM users WHERE loginid = $1';
				const result = await db.execute(SQL, [req.body.id]);
				if(result.length == 1 && req.body.pw === result[0].password){
					var token = ''
					try {
						token = await createToken(db, req.body.id);
					} catch (e) {
						console.log('#ERROR: Login->write login-token.');
					}
					res.status(200).send(JSON.stringify({'message': 'login: ID/PW: testing now.', 'id': result[0].id, 'loginId': req.body.id, 'token': token, 'name': result[0].name}));
				} else {
					console.log('login: Failure...');
					res.status(401).send(JSON.stringify({'message': 'login: ID or PW are failure.'}));
				}
			} else { // tokenによるログイン
				console.log('login: token');
				const SQL = 'SELECT id, password, name, loginid FROM users WHERE token = $1';
				const result = await db.execute(SQL, [req.body.token]);
				if(result.length == 1){
					res.status(200).send(JSON.stringify({'message': 'login: token: testing now.', 'id': result[0].id, 'loginId': result[0].loginid, 'token': req.body.token, 'name': result[0].name}));
				} else {
					console.log('login: Failure...');
					res.status(401).send(JSON.stringify({'message': 'login: token is failure.'}));
				}
			}
		} catch (e) {
			console.log('#ERROR#: Login');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Login'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});

// ユーザー作成
app.post('/api/user/', function(req, res){
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'INSERT INTO users(name, password, loginid) VALUES ($1, $2, $3)';
			const result = await db.execute(SQL, [req.body.id, req.body.pw, req.body.id]); // 仮で、ユーザー名 = ログインIDにする
			res.status(200).send(JSON.stringify({'message': 'Create User: testing now.', 'loginId': req.id}));
		} catch (e) {
			console.log('#ERROR#: Write');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Write'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});

app.post('/api/write/', function(req, res){
	//console.log('write: ' + req.body.tweet);
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'INSERT INTO tweets(user_id, tweet, tweet_time) VALUES ($1, $2, $3)';
			const result = await db.execute(SQL, [req.body.userId, req.body.tweet, 'now()']);
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
	//console.log('read: ' + req.body.latest);
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'SELECT tweets.tweet_id, tweets.user_id, tweets.tweet, tweets.tweet_time, tweets.count_like, users.name FROM tweets INNER JOIN users ON tweets.user_id = users.id WHERE tweets.flg_delete != TRUE ORDER BY tweet_time desc limit $1';
			const result = await db.execute(SQL, [req.body.latest]);
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
	//console.log('delete: '+req.body.tweet_id);
	/*(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'UPDATE tweets SET flg_delete = TRUE WHERE tweet_id = $1';
			const result = await db.execute(SQL, [req.body.tweet_id]);
			res.status(200).send(JSON.stringify({'message': 'Delete: Succeed!'}));
		} catch (e) {
			console.log('#ERROR#: Delete');
			res.status(500).send(JSON.stringify({'message': 'DB Error: Set Delete Flag'}));
			throw e;
		} finally {
			await db.release();
		}
	})();*/
	res.status(200).send("");
});

/* //delete flagではなく直接削除していた旧バージョン
app.post('/api/delete/', function(req, res){
	//console.log('delete: '+req.body.tweet_id);
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
*/

app.post('/api/getUsernameByUserid/', function(req, res){
	//console.log('getUsernameByUserid ' + req.body.user_id);
	(async() => {
		const db = await getPostgresClient();
		try {
			const SQL = 'SELECT * FROM users WHERE id = $1';
			const result = await db.execute(SQL, [req.body.user_id]);
			res.status(200).send(result);
		} catch (e) {
			console.log('#ERROR#: getUsernameByUserid');
			res.status(500).send(JSON.stringify({'message': 'DB Error: getUsernameByUserid'}));
			throw e;
		} finally {
			await db.release();
		}
	})();
});


app.get('/*', function(req, res){
	//console.log('**');
	res.sendFile(path.resolve(PATH_CLIENT, 'index.html'));
});

app.listen(port, () => {
	console.log('server is running at '+port);
});
