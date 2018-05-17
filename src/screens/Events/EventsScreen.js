// @flow

import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import idx from 'idx';

import createQueryRenderer from '../../relay/RelayUtils';
import { withContext } from '../../Context';
import type { ContextType } from '../../Context';

import { StatusBar, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import LoggedHeader from '../../components/LoggedHeader';
import ActionButton from '../../components/ActionButton';
import EventCard from '../../components/EventCardMVP';
import { ROUTENAMES } from '../../navigation/RouteNames';
import DistanceModal from './DistanceModal';

const Wrapper = styled.View`
  flex: 1;
  background-color: white
`;

type Props = {
  navigation: Object,
  relay: Object,
  context: ContextType,
};

type State = {
  searchText: string,
  IsSearchVisible: boolean,
  coordinates: Array<number>,
  distance: number,
  isDistanceModalVisible: boolean
};

class EventsScreen extends Component<Props, State> {
  state = {
    searchText: '',
    IsSearchVisible: false,
    coordinates: [ 0, 0],
    distance: 120,
    isDistanceModalVisible: false,
  };

  changeSearchText = (searchText: string) => {
    const { coordinates, distance } = this.state;

    this.props.relay.refetch({ search: searchText, coordinates, distance }, null, () => {}, { force: true });

    return this.setState({ searchText });
  };

  setVisible = () => {
    const { IsSearchVisible } = this.state;
    this.setState({
      IsSearchVisible: !IsSearchVisible,
    });
  };

  componentDidMount() {
    const { context } = this.props
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = [coords.longitude, coords.latitude];
        this.setState({ coordinates });
      },
      (error) => context.openModal(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.props.relay.refetch();
  }

  seeDistanceResults() {
    const { searchText, coordinates, distance } = this.state;

    console.log('closeDistanceModal refetch', this.state);
    this.props.relay.refetch(
      { search: searchText, coordinates, distance },
      null,
      () => {},
      { force: true },
    );

    return this.setState({ isDistanceModalVisible: false });
  }

  render() {
    const { navigation, query } = this.props;
    const { schedule, title, date, location, image, description, publicLimit } = query;
    const { searchText, IsSearchVisible, distance, isDistanceModalVisible } = this.state;

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
          openDistanceModal={() => this.setState({ isDistanceModalVisible: true })}
          distance={distance}
        />
        <ScrollView>
          {idx(query, _ => _.events.edges[0]) && query.events.edges.map(({ node }, key) => (
              <EventCard
                title={node.title}
                description={node.description}
                publicLimit={node.publicLimit}
                key={key}
              />
            ))}
        </ScrollView>
        <ActionButton onPress={() => this.props.navigation.navigate(ROUTENAMES.EVENT_ADD)}/>
        <DistanceModal
          isVisible={isDistanceModalVisible}
          distance={distance}
          changeDistance={(distance) => this.setState({ distance })}
          closeDistanceModal={() => this.setState({ isDistanceModalVisible: false })}
          seeDistanceResults={() => this.seeDistanceResults()}
        />
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
          coordinates: { type: "[Float]" }
          distance: { type: Int }
        ) {
        events(
          first: $first,
          search: $search,
          coordinates: $coordinates,
          distance: $distance
        ) @connection(key: "EventsScreen_events", filters: []) {
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
      $coordinates: [Float]
      $distance: Int
      ) {
      ...EventsScreen_query
      @arguments(
        first: $first,
        search: $search,
        coordinates: $coordinates,
        distance: $distance
      )
    }
  `,
);

export default createQueryRenderer(withContext(withNavigation(EventsScreenRefetchContainer)), {
  query: graphql`
    query EventsScreenQuery(
      $first: Int
      $search: String
      $coordinates: [Float]
      $distance: Int
    ) {
      ...EventsScreen_query
      @arguments(
        first: $first,
        search: $search,
        coordinates: $coordinates,
        distance: $distance
      )
    }
  `,
  variables: {
    first: 10,
    cursor: null,
    search: '',
    distance: 20,
    coordinates: [0, 0],
  },
});
