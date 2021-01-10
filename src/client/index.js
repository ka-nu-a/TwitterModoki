import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {id: '', pw: ''};
	}

	cngTboxId(tboxId){
		this.setState({
			id: tboxId.target.value,
		});
	}
	
	cngTboxPw(tboxPw){
		this.setState({
			pw: tboxPw.target.value,
		});
	}

	doLogin(){
		if(this.state.id == '' || this.state.pw == ''){
			alert('IDとPWを入力してください。');
			return;
		} else {
			this.props.doLogin(this.state.id, this.state.pw);
		}
	}

	createUser(){
		if(this.state.id == '' || this.state.pw == ''){
			alert('作成したいIDとPWを入力してください。');
			return;
		}
		if(this.state.id.length > 10){
			alert('IDの長さは10文字までです。');
			return;
		}
		if(confirm('ID: ' + this.state.id + '\nPW: ' + this.state.pw + '\n上記の内容でユーザーを作成します。\nよろしいですか？') == false){
			return;
		}
		fetch('/api/user/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'id': this.state.id, 'pw': this.state.pw})
		})
			.then((response) => {
				if(!response.ok){
					throw new Error(response.status);
				} else {
					this.doLogin();
				}
			})
			.catch((httpStatus) => {
				switch(httpStatus.message.substr(-3)){
					default: // ユーザーIDの重複など... (作成時にチェックできるようにする予定)
						alert('ユーザー作成の際にエラーが発生しました：' + httpStatus.message.substr(-3));
						console.error('ERROR: HTTP Status is ' + httpStatus.message.substr(-3));
				}
			})
	}
	
	render () {
		if(this.props.isShow){
			return (
				<div className='modal-overlay' onClick={this.props.hideForm}>
					<div className='modal-content' onClick={(e) => e.stopPropagation()}>
						<div className='loginForm_header'><h3 className='loginForm_title'>ログイン/新規登録フォーム</h3>
						<button className='closeButton' onClick={this.props.hideForm}>✖</button></div>
						<p className='loginForm_label'>ID <input type='textbox' id='loginId' className='loginForm_textBox' onChange={e => this.cngTboxId(e)} value={this.state.id}></input></p>
						<p className='loginForm_label'>PW <input type='password' id='loginPw' className='loginForm_textBox' onChange={e => this.cngTboxPw(e)} value={this.state.pw}></input></p>
						<div className='loginForm_loginButtons'>
							<button className='loginForm_loginButton' onClick={() => this.doLogin()}>ログイン</button>
							<button className='loginForm_loginButton' onClick={() => this.createUser()}>新規登録</button>
						</div>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
}

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLogin: false ,userId: '', loginId: '', userName: ''};
	}

	componentDidMount(){
		this.tryLoginByCookie();
	}
	
	tryLoginByCookie(){
		if(!(typeof Cookies.get('login-token') === "undefined")){
			this.doLoginByToken(Cookies.get('login-token'));
		}
	}
	
	doLoginByToken(token){
		fetch('/api/login/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'token': token})
		})
			.then((response) => {
				if(!response.ok){
					throw new Error(response.status);
				} else {
					return response.json()
				}
			})
			.then((jsonData) => {
				this.doLogin(jsonData);
			})
			.catch((httpStatus) => {
				switch(httpStatus.message.substr(-3)){
					case '401':
						console.log('token is invalid.');
						break;
					default:
						console.error('ERROR: HTTP Status is ' + httpStatus)
				}
			})
	}
	doLoginById(loginId, pw){
		fetch('/api/login/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'id': loginId, 'pw': pw})
		})
			.then((response) => {
				if(!response.ok){
					throw new Error(response.status);
				} else {
					return response.json()
				}
			})
			.then((jsonData) => {
				this.doLogin(jsonData);
			})
			.catch((httpStatus) => {
				switch(httpStatus.message.substr(-3)){
					case '401':
						console.log('ID or PW are invalid.');
						alert('IDまたはPWが正しくありません。');
						break;
					default:
						console.error('ERROR: HTTP Status is ' + httpStatus)
				}
			})
	}
	
	doLogin(userData){
		const userId = userData.id;
		const loginId = userData.loginId;
		const userName = userData.name;
		this.setState({isLogin: true, userId: userId, userName: userName, loginId: loginId});
		Cookies.set('login-token', userData.token, {expires: 1});
		this.props.setUserId(userId);
		this.hideLoginForm();
	}
	
	showLoginForm(){
		this.tryLoginByCookie();
		this.setState({isShowingLoginForm: true});
	}
	
	hideLoginForm(){
		this.setState({isShowingLoginForm: false});
	}
	
	doLogout(){
		this.setState({isLogin: false});
		Cookies.remove('login-token');
		this.props.setUserId();
	}
	
	render () {
		if(this.state.isLogin){
			return (
				<div>
					<div className='header_loginInfo'>ログイン中：{this.state.userName}さん</div>
					<button className='header_loginInfo' onClick={() => this.doLogout()}>ログアウト</button>
				</div>
			)
		} else {
			return (
				<div>
					<div className='header_loginInfo'>未ログイン</div>
					<button className='header_loginInfo' onClick={() => this.showLoginForm()}>ログイン</button>
					<LoginForm isShow={this.state.isShowingLoginForm} hideForm={() => this.hideLoginForm()} doLogin={(id, pw) => this.doLoginById(id, pw)} />
				</div>
			)
		}
	}
}

class Header extends React.Component {
	render () {
		return (
			<div>
				<Account setUserId={this.props.setUserId}/>
			</div>
		)
	}
}

class TweetBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: '', length: 140};
	}

	cngTbox(tbox){
		this.setState({
			text: tbox.target.value,
			length: 140-tbox.target.value.length
		});
		return;
	}

	doTweet(e){
		if(this.state.length < 0){
			alert('叫べるのは140字までだ。そんなに欲張っちゃダメだぞ。');
			return;
		}
		this.props.sendTweet(this.state.text);
		document.getElementById('tweetBox').value='';
		this.setState({text: '', length: 140});
	}

	render () {
		return (
			<div>
				<input type='textbox' id='tweetBox' onKeyPress={e => {if(e.key == 'Enter'){this.doTweet(e);}}} onChange={e => this.cngTbox(e)}/>
				<button onClick={e => this.doTweet(e)}>叫ぶ！！！</button>
				残り{this.state.length}文字
			</div>
		);
	}
}

class Tweet extends React.Component {
	render() {
		return(
			<div className='tweet'>
				<span className='tweet_user_name'>{this.props.user_name}</span>
				<span className='tweet_text'>{this.props.text}</span>
				<span className='tweet_time'>{this.props.time.getFullYear()}/{this.props.time.getMonth()+1}/{this.props.time.getDate()} {('00'+this.props.time.getHours()).slice(-2)}:{('00'+this.props.time.getMinutes()).slice(-2)}　</span>
			</div>
		);
		//<button onClick={v => this.props.deleteTweet(this.props.tweet_id)}>×</button>
	}
}

class BtnGetTweet extends React.Component {
	render(){
		return(
			<button onClick={e => {this.props.getTweet();}}>手動更新(5秒ごとに自動更新されてるよ)</button>
		);
	}
}

class BoxSetNGetTweet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {nGetTweet: 30};
		this.props.update(this.state.nGetTweet);
	}
	
	onChange(e){
		const num = e.target.value.replace(/[^0-9]+/i,'');
		this.setState({nGetTweet: num});
		this.props.update(num);
	}

	render(){
		return(
			<div>
				表示する叫びの数
				<input type='tel' id='NGetTweetBox' value={this.state.nGetTweet} onChange={e => this.onChange(e)} maxLength='4'/>
			</div>
		);
	}
}

class TweetList extends React.Component {
	render() {
		return(
			<div>
				<BtnGetTweet getTweet={() => this.props.getTweet()}/>
				<BoxSetNGetTweet update={(v) => this.props.updateNGetTweet(v)}/>
				<div className='tweets'>
					{this.props.tweets}
				</div>
			</div>
		);
	}
}

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tweets: [], userId: []};
		var nGetTweet = 30;
	}
	componentDidMount(){
		this.setUserId();
		this.getTweet();
	}
	
	setUserId(id){
		if(typeof id === "undefined"){
			const defaultId = 1;
			this.setState({userId: defaultId});
		} else {
			this.setState({userId: id});
		}
	}

	deleteTweet(tweet_id){
		fetch('/api/delete/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'tweet_id': tweet_id})
		})
			.then((response) => response.json())
			.then((jsonData) => {
				this.getTweet();
			})
			.catch((error) => console.error(error))
	}
	
	sendTweet(text){
		if(text==''){
			console.log('ERROR!! tweet is empty.');
			return;
		}
		fetch('/api/write/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'tweet': text, 'userId': this.state.userId})
		})
			.then((response) => response.json())
			.then((jsonData) => {
				this.getTweet();
			})
			.catch((error) => console.error(error))
	}

	getTweet(){
		setTimeout(() => {this.getTweet()}, 5000);
		const latest = this.nGetTweet;
		fetch('/api/read/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'latest': latest})
		})
			.then((response) => response.json())
			.then((jsonData) => {
				this.setState({tweets: jsonData.map((tweet) => 
					<Tweet key={tweet.tweet_id} tweet_id={tweet.tweet_id} user_id={tweet.user_id} text={this.purseTweet(tweet.tweet)} time={new Date(tweet.tweet_time)} user_name={tweet.name} deleteTweet={v => this.deleteTweet(v)} />
				)});
			})
			.catch((error) => console.error(error))
	}
	
	purseTweet(text){
		var pursedText = text.match(/(.*)(https?:\/\/[^ |^　]*)(.*)/i);
		if(pursedText == null){
			return (<>{text}</>);
		} else {
			//console.log(pursedText);
			return (
				<>
					{pursedText[1]}<a href={pursedText[2]} target="_blank" rel="noopener">{pursedText[2]}</a>{pursedText[3]}
				</>
			);
		}
	}

	updateNGetTweet(num){
		this.nGetTweet = num;
	}
	
	render() {
		return (
			<div>
				<Header setUserId={v => this.setUserId(v)}/>
				<TweetBox sendTweet={v => this.sendTweet(v)}/>
				<TweetList tweets={this.state.tweets} getTweet={() => this.getTweet()} updateNGetTweet={(v) => this.updateNGetTweet(v)}/>
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('index')); 
