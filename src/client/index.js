import React from 'react';
import ReactDOM from 'react-dom';

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
	constructor(props) {
		super(props);
		this.state = {user_name: ""};
		this.getUsernameByUserid(this.props.user_id);
	}
	
	getUsernameByUserid(user_id){
		fetch('/api/getUsernameByUserid/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({'user_id': user_id})
		})
			.then((response) => response.json())
			.then((jsonData) => {
				this.setState({user_name: jsonData[0].name});
			})
			.catch((error) => console.error(error))
	}
	
	render() {
		return(
			<div className='tweet'>
				<span className='tweet_user_name'>{this.state.user_name}</span>
				<span className='tweet_text'>{this.props.text}</span>
				<span className='tweet_time'>{this.props.time.getFullYear()}/{this.props.time.getMonth()+1}/{this.props.time.getDate()} {('00'+this.props.time.getHours()).slice(-2)}:{('00'+this.props.time.getMinutes()).slice(-2)}　</span>
				<button onClick={v => this.props.deleteTweet(this.props.tweet_id)}>×</button>
			</div>
		);
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
		this.setState({nGetTweet: e.target.value});
	}

	render(){
		return(
			<div>
				表示する叫びの数
				<input type='tel' id='NGetTweetBox' value={this.state.nGetTweet} onChange={e => this.onChange(e)} maxlength='4' onblur={e => this.props.update(this.state.nGetTweet)}/>
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
				{this.props.tweets}
			</div>
		);
	}
}

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: [{}], tweets: [], nGetTweet: 0};
		this.getTweet();
		setInterval(() => {this.getTweet()}, 5000);
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
				//console.log(jsonData);
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
			body: JSON.stringify({'tweet': text})
		})
			.then((response) => response.json())
			.then((jsonData) => {
				//console.log(jsonData);
				this.getTweet();
			})
			.catch((error) => console.error(error))
	}
	
	getTweet(){
		//console.log('getTweet');
		const latest = this.state.nGetTweet;
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
					<Tweet key={tweet.tweet_id} tweet_id={tweet.tweet_id} user_id={tweet.user_id} text={tweet.tweet} time={new Date(tweet.tweet_time)} deleteTweet={v => this.deleteTweet(v)} />
				)});
			})
			.catch((error) => console.error(error))
	}

	updateNGetTweet(num){
		console.log('updateNGetTweet: '+num);
		this.setState({nGetTweet: num});
	}
	
	render() {
		return (
			<div>
				<TweetBox sendTweet={v => this.sendTweet(v)}/>
				<TweetList tweets={this.state.tweets} getTweet={() => this.getTweet()} updateNGetTweet={(v) => this.updateNGetTweet(v)}/>
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById('index')); 
