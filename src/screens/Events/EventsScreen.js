// @flow

import React, { Component } from 'react';
import { createRefetchContainer, graphql } from 'react-relay';
import { createQueryRenderer } from '../../relay/RelayUtils';
import { withContext } from '../../Context';
import type { ContextType } from '../../Context';

import { StatusBar, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import LoggedHeader from '../../components/LoggedHeader';
import ActionButton from '../../components/ActionButton';
import EventCard from '../../components/EventCardMVP';
import { ROUTENAMES } from '../../navigation/RouteNames';
import DistanceModal from './DistanceModal';

const TOTAL_REFETCH_ITEMS = 10;

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
  isDistanceModalVisible: boolean,
  isRefreshing: boolean,
  isFetchingEnd: boolean,
};

@withContext
@withNavigation
class EventsScreen extends Component<Props, State> {
  state = {
    searchText: '',
    IsSearchVisible: false,
    coordinates: [0, 0],
    distance: 120,
    isDistanceModalVisible: false,
    isRefreshing: false,
    isFetchingEnd: false,
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
    const { context } = this.props;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = [coords.longitude, coords.latitude];
        this.setState({ coordinates });
      },
      error => context.openModal(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.props.relay.refetch();
  }

  seeDistanceResults() {
    const { searchText, coordinates, distance } = this.state;

    console.log('closeDistanceModal refetch', this.state);
    this.props.relay.refetch({ search: searchText, coordinates, distance }, null, () => {}, { force: true });

    return this.setState({ isDistanceModalVisible: false });
  }

  onRefresh = () => {
    const { isRefreshing } = this.state;

    if (isRefreshing) return;

    this.setState({ isRefreshing: true });

    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
    });
    this.props.relay.refetch(
      refetchVariables,
      null,
      () => {
        this.setState({
          isRefreshing: false,
          isFetchingEnd: false,
        });
      },
      {
        force: true,
      },
    );
  };

  onEndReached = () => {
    const { isFetchingEnd } = this.state;

    if (isFetchingEnd) return;

    const { events } = this.props.query;

    if (!events.pageInfo.hasNextPage) return;

    this.setState({
      isFetchingEnd: true,
    });

    const { endCursor } = events.pageInfo;

    const total = events.edges.length + TOTAL_REFETCH_ITEMS;
    const refetchVariables = fragmentVariables => ({
      ...fragmentVariables,
      count: TOTAL_REFETCH_ITEMS,
      cursor: endCursor,
    });
    const renderVariables = {
      count: total,
    };

    this.props.relay.refetch(
      refetchVariables,
      renderVariables,
      () => {
        this.setState({
          isRefreshing: false,
          isFetchingEnd: false,
        });
      },
      {
        force: false,
      },
    );
  };

  renderItem = ({ item }) => {
    const { node } = item;

    return (
      <EventCard
        title={node.title}
        description={node.description}
        publicLimit={node.publicLimit}
        seeButtonAction={() =>
          this.props.navigation.navigate(ROUTENAMES.EVENT_DETTAILS, {
            id: node.id,
          })}
      />
    );
  };

  render() {
    const { query } = this.props;
    const { searchText, IsSearchVisible, distance, isDistanceModalVisible, isRefreshing } = this.state;

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
        <FlatList
          data={query.events.edges}
          keyExtractor={item => item.node.id}
          renderItem={this.renderItem}
          onRefresh={this.onRefresh}
          refreshing={isRefreshing}
          onEndReached={this.onEndReached}
        />
        <ActionButton onPress={() => this.props.navigation.navigate(ROUTENAMES.EVENT_ADD)} />
        <DistanceModal
          isVisible={isDistanceModalVisible}
          distance={distance}
          changeDistance={distance => this.setState({ distance })}
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
          search: { type: String }
          coordinates: { type: "[Float]" }
          distance: { type: Int }
          count: { type: Int, defaultValue: 10 }
          cursor: { type: String }
        ) {
        events(
          first: $count,
          after: $cursor
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
      $count: Int
      $cursor: String
      $search: String
      $coordinates: [Float]
      $distance: Int
      ) {
      ...EventsScreen_query
      @arguments(
        count: $count,
        cursor: $cursor,
        search: $search,
        coordinates: $coordinates,
        distance: $distance
      )
    }
  `,
);

export default createQueryRenderer(EventsScreenRefetchContainer, EventsScreen, {
  query: graphql`
    query EventsScreenQuery {
      ...EventsScreen_query
    }
  `,
});
