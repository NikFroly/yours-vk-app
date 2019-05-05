import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Friends from './panels/Friends';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({
						token: e.detail.data.access_token
					});
					this.getFriends();
					break;
				case 'VKWebAppCallAPIMethodResult':
					if (e.detail.data.request_id === '49test') {
						this.setState({ friends: e.detail.data.response.items });
					}
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	getToken = () => {
		connect.send("VKWebAppGetAuthToken", {"app_id": 6969969, "scope": "friends"});
	}

	getFriends() {
		connect.send("VKWebAppCallAPIMethod", {
			'method': "friends.get",
			'request_id': '49test',
			'params': {
				'fields': 'nickname,city,photo_100',
				'v': '5.95',
				'access_token': this.state.token,
			}
		});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
				<Friends id="friends" data={this.state.data} friends={this.state.friends} getToken={this.getToken} token={this.state.token} go={this.go} />
			</View>
		);
	}
}

export default App;