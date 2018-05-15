// @flow

import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import createQueryRenderer from '../../relay/RelayUtils';

import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import LoggedHeader from '../../components/LoggedHeader';
import ActionButton from '../../components/ActionButton';
import EventCard from '../../components/EventCardMVP';
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
    const { navigation, query } = this.props;
    const { schedule, title, date, location, image, description, publicLimit } = query;
    const { searchText, IsSearchVisible } = this.state;

    console.log('query', query);
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
          {query.events.edges.map(({node}) => (
              <EventCard
                title={node.title}
                description={node.description}
                publicLimit={node.publicLimit}
              />
            ))}
        </ScrollView>
        <ActionButton onPress={() => this.props.navigation.navigate(ROUTENAMES.EVENT_ADD)}/>
      </Wrapper>
    );
  }
}


const EventsScreenRefetchContainer = createRefetchContainer(
  EventsScreen,
  {
    query: graphql`
      fragment EventsScreen_query on Query @argumentDefinitions(first: { type: "Int", defaultValue: 20 }) {
        events(first: $first) @connection(key: "EventsScreen_events", filters: []) {
          edges {
            node {
              id
              schedule {
                title
                talker
                time
              }
              title
              date
              location
              image
              description
              publicLimit
            }
          }
        }
      }
    `,
  },
  graphql`
    query EventsScreenRefetchQuery {
      ...EventsScreen_query
    }
  `,
);

export default createQueryRenderer(EventsScreenRefetchContainer, {
  query: graphql`
    query EventsScreenQuery {
      ...EventsScreen_query
    }
  `,
});
