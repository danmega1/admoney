import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import connect from '@vkontakte/vk-bridge';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';



class App extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      totalAd: 0,
      activePanel: 'home',
      fetchedUser: {
                id: 0,
                first_name: 'Загрузка...'
            },
      popout: <ScreenSpinner />
    }
  }

  componentDidMount() {
  bridge.send("VKWebAppJoinGroup", { "group_id": 183895372 });
  connect.send("VKWebAppShowNativeAds", {ad_format:"preloader"}) 
  connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					this.createUser();
                    setTimeout(() => {
                    	this.closePopout()
                    }, 3000)
                    
					break;
                case 'VKWebAppOpenCodeReaderResult':
                    this.setState({ toid: e.detail.data.code_data, activePanel: 'transfer' });
                    console.log(e.detail.data)
                    
                    break;

				default:
					console.log(e.detail.type);
			}
		});

       
		connect.send('VKWebAppGetUserInfo', {});
                    setTimeout(() => {
                    	this.closePopout()
                    }, 1000)

                    setInterval(() => {
            this.createUser()
        }, 1000)
		};

	closePopout() {
        this.setState({ popout: null });
    };


    createUser = () => {   
        fetch(`https://cclickru.tk:9090/findUser/?uid=${this.state.fetchedUser.id}&photo=${this.state.fetchedUser.photo_100}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
            .then((response) => response.json())
            .then((response) => {
               
                this.setState({ balance: response.response[0].balance, totalAd: response.response[0].totalAd })
               
            })
            .catch((error) => {
                
                console.log('connection error')
            })




            
    }


adBonus = () => {
        connect.sendPromise("VKWebAppShowNativeAds", {ad_format: "preloader"})
.then((data) => {
	fetch(`https://cclickru.tk:9090/adBonus/?uid=${this.state.fetchedUser.id}&photo=${this.state.fetchedUser.photo_100}&name=${this.state.fetchedUser.first_name}`, {
            method: 'get',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
})
.catch((error) => {
console.log('adError')

});
    }


	 go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	render() {
	return(
		<View activePanel={this.state.activePanel} popout={this.state.popout}>
			<Home id='home' go={this.go} balance={this.state.balance} />
			<Persik id='persik' go={this.go} />
		</View>
		)
	}
	}

export default App;

