import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS } from '@vkontakte/vkui';
import { Panel, Tabs, TabsItem, Button, Group, Div, Placeholder, Avatar, Separator, PanelHeader, Footer, Search, CardGrid, Card, List, Cell, Header, Tooltip, FormStatus, FixedLayout, Epic, Tabbar, TabbarItem, MiniInfoCell } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon28Game from '@vkontakte/icons/dist/28/game';
import Icon28DiamondOutline from '@vkontakte/icons/dist/28/diamond_outline';

import persik from '../img/persik.png';
import './Persik.css';

import './style.css';


const Persik = ({ id, go }) => (
	<Panel id={id}>
		<PanelHeader>
			Скоро...
		</PanelHeader>
		<div className="persikText">Уже совсем скоро тут будет топ...</div>
		<img className="Persik" src={persik} />
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

Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Persik;
