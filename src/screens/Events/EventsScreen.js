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
  relay: Object,
};

type State = {
  searchText: string,
  IsSearchVisible: boolean,
};

class EventsScreen extends Component<Props, State> {
  state = {
    searchText: '',
    IsSearchVisible: false,
  };

  changeSearchText = (searchText: string) => {
    console.log('change text', this.props.relay);
    this.props.relay.refetch(
      { search: searchText },
      null,
      () => {},
      { force: true },
    );

    this.setState({ searchText });
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
          {query.events.edges.map(({ node }, key) => (
              <EventCard
                title={node.title}
                description={node.description}
                publicLimit={node.publicLimit}
                key={key}
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
      fragment EventsScreen_query on Query @argumentDefinitions(
          first: { type: Int }
          search: { type: String }
        ) {
        events(first: $first, search: $search) @connection(key: "EventsScreen_events", filters: []) {
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
    query EventsScreenRefetchQuery(
      $first: Int
      $search: String
      ) {
      ...EventsScreen_query
      @arguments(first: $first, search: $search)
    }
  `,
);

export default createQueryRenderer(withNavigation(EventsScreenRefetchContainer), {
  query: graphql`
    query EventsScreenQuery(
      $first: Int
      $search: String
    ) {
      ...EventsScreen_query
      @arguments(first: $first, search: $search)
    }
  `,
  variables: {
    first: 10,
    cursor: null,
    search: '',
  },
});
