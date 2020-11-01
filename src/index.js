import React from "react";
import ReactDOM from "react-dom";

class TweetBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: "", length: 140};
	}

	cngTbox(tbox){
		this.setState({
			text: tbox.target.value,
			length: 140-tbox.target.value.length
		});
		return;
	}

	tweet(e){
		this.props.add(this.state.text);
		document.getElementById("tweetBox").value="";
		this.setState({text: "", length: 140});
	}

	render () {
		return (
			<div>
				<input type="textbox" id="tweetBox" onKeyPress={e => {if(e.key == "Enter"){this.tweet(e);}}} onChange={e => this.cngTbox(e)}/>
				<button onClick={e => {this.tweet(e);}}>叫ぶ！</button>
				残り{this.state.length}文字
			</div>
		);
	}
}

class Tweet extends React.Component {
	render() {
		return(
			<div className="tweet">
				<span>
					<span style={{paddingRight: 10 + 'px'}}>{this.props.text}</span>
					<button onClick={e => this.props.del(this.props.id)}>×</button>
				</span>
			</div>
		);
	}
}

class TweetList extends React.Component {
	render() {
		return(
			<div>{this.props.list}</div>
		);
	}
}

class Index extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			//list: [<Tweet key={1} text="hoge" />, <Tweet key={2} text="fuga" />],
			list: [],
			tweetId: 0
		}
	}

	addTweet(tweetText){
		if(tweetText != ""){
			if(tweetText.length > 140){
				alert("叫べる文字数は140字以内です。");
			} else {
				this.setState({
					list: [<Tweet key={this.state.tweetId} id={this.state.tweetId} text={tweetText+"！！！"} del={(v) => this.delTweet(v)} />, ...this.state.list],
					tweetId: this.state.tweetId+1
				});
			}
		}
		return;
	}

	delTweet(id){
		//console.log(this.state.list);
		this.setState({
			list: this.state.list.filter(n => n.props.id !== id)
		})
	}

	render() {
		return (
			<div>
				<TweetBox add={(v) => this.addTweet(v)}/>
				<TweetList list={this.state.list}/>
			</div>
		);
	}
}

ReactDOM.render(<Index />, document.getElementById("index")); 
