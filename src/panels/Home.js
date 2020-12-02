import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Tabs, TabsItem, Button, Group, Div, Placeholder, Avatar, Separator, PanelHeader, Footer, Search, CardGrid, Card, List, Cell, Header, Tooltip, FormStatus, FixedLayout, Epic, Tabbar, TabbarItem, MiniInfoCell } from '@vkontakte/vkui';
import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28DiamondOutline from '@vkontakte/icons/dist/28/diamond_outline';
import './style.css';
import connect from '@vkontakte/vk-bridge';

const Home = ({ id, go, fetchedUser, props, balance }) => (
	<Panel id={id}>
		<PanelHeader
		left={<Avatar size={36} src="https://sun1.dataix-kz-akkol.userapi.com/c855632/v855632359/18fe0e/LvLZEUNFrAg.jpg" />}
		>
			CoolClick
		</PanelHeader>

		<div className="balanceText">Твой баланс: {parseFloat(balance).toFixed(3)}</div>
		<Group>
			<Div className="buttonsDiv">
				<Button size="xl" level="2" onClick={() => connect.sendPromise("VKWebAppShowNativeAds", {ad_format: "preloader"})}>
					Заработать
				</Button>
			</Div>
			<Div>
				<Button size="xl" level="2" onClick={() => document.location.href="https://vk.com/write-183895372"}>
					Вывести
				</Button>
			</Div>
		</Group>
		<Tabbar>
          <TabbarItem
          	onClick={go} 
          	data-to="home"
            text="Главная"
          ><Icon28Game/></TabbarItem>
          <TabbarItem
          	onClick={go}
          	data-to="persik"
            text="Топ"
          ><Icon28DiamondOutline /></TabbarItem>
        </Tabbar>
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
