import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListItem, List, Cell, Group, Avatar, PanelHeader } from '@vkontakte/vkui';
import Icon24LinkCircle from '@vkontakte/icons/dist/24/link_circle';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';
import Icon24User from '@vkontakte/icons/dist/24/user';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Your's VK</PanelHeader>
		{fetchedUser &&
		<Group>
			<ListItem
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.bdate}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</ListItem>
			<List>
				<Cell before={<Icon24LinkCircle />}>{`${fetchedUser.id}`}</Cell>
				<Cell before={<Icon24Globe />}>{`${fetchedUser.country.title}`}</Cell>
				<Cell before={<Icon24Place />}>{`${fetchedUser.city.title}`}</Cell>
				<Cell before={<Icon24Recent />}>UTC {`${fetchedUser.timezone}`}</Cell>
				<Cell expandable before={<Icon24User />} onClick={go} data-to='friends'>Friends</Cell>
			</List>
		</Group>}
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