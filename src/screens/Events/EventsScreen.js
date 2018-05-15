// @flow

import React, { Component } from 'react';
import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import LoggedHeader from '../../components/LoggedHeader';
import ActionButton from '../../components/ActionButton';
import EventCard from '../../components/EventCard';
import { ROUTENAMES } from '../../navigation/RouteNames';

const Wrapper = styled.View`
  flex: 1;
  background-color: white
`;

type Props = {
  navigation: Object,
};

type State = {
  searchText: string,
  IsSearchVisible: boolean,
};

const UserArrayMock = [
  {
    name: 'Francisco Rhodes',
    image: 'https://i.imgur.com/Gi7x0nZ.png',
  },
  {
    name: 'Raymond Brooks',
    image: 'https://i.imgur.com/3I2V6lU.png',
  },
  {
    name: 'Michelle McCartney',
    image: 'https://i.imgur.com/Fcx8lCu.png',
  },
  {
    name: 'Heather Nolan',
    image: 'https://i.imgur.com/C3YDUHi.png',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
  {
    name: 'Erik Edwards',
    image: 'https://i.imgur.com/ZQXbX2t.jpg',
  },
];

class EventsScreen extends Component<Props, State> {
  state = {
    searchText: '',
    IsSearchVisible: false,
  };
  changeSearchText = (search: string) => {
    this.setState({
      searchText: search,
    });
  };
  setVisible = () => {
    const { IsSearchVisible } = this.state;
    this.setState({
      IsSearchVisible: !IsSearchVisible,
    });
  };
  render() {
    const { navigation } = this.props;
    const { searchText, IsSearchVisible } = this.state;
    return (
      <Wrapper>
        <StatusBar barStyle="light-content" />
        <LoggedHeader
          title="Events"
          searchValue={searchText}
          IsSearchVisible={IsSearchVisible}
          showSearch={this.setVisible}
          onChangeSearch={search => this.changeSearchText(search)}
        />
        <ScrollView>
          <EventCard
            title="React Conf"
            description="A primeira conferência do ecossistema React da América Latina."
            bgImage="https://i.imgur.com/IetnYn7.png"
            atendees={UserArrayMock}
          />
        </ScrollView>
        <ActionButton onPress={() => this.props.navigation.navigate(ROUTENAMES.NEW_EVENT)}/>
      </Wrapper>
    );
  }
}

export default withNavigation(EventsScreen);
