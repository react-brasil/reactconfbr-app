// @flow
import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, SafeAreaView, StatusBar, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Timeline from 'react-native-timeline-listview';
import { createFragmentContainer, graphql } from 'react-relay';
import moment from 'moment';
import { IMAGES } from '../../utils/design/images';
import { createQueryRenderer } from '../../relay/RelayUtils';
const { width } = Dimensions.get('window');

const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgb(41, 123, 247)', '#651FFF'],
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
})`
  flex: 1;
`;

const HeaderContainer = styled.View`
  padding: 10px 20px;
  padding-bottom: 20;
  z-index: 1000
`;

const Header = styled.View`
  margin-top: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
`;

const HeaderButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  z-index: 1000;
  margin-top: 10;
`;

const CloseIcon = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 30;
  height: 24;
  tint-color: white;
`;

const EditIcon = styled.Image.attrs({
  source: IMAGES.EDIT,
})`
  width: 26;
  height: 26;
  tint-color: white;
`;

const EventName = styled.Text`
  font-size: 32px;
  color: white;
  font-weight: 800;
  width: 88%;
  margin: 20px 25px;
`;

const EventDescription = styled.Text`
  font-size: 45px;
  color: white;
  font-weight: 800;
  width: 88%;
  margin: 10px 25px;
`;

const DateAndLocationRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 10px 30px;
`;

const AttendRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 30px;
  background-color: ${props => props.theme.colors.secondaryColor};
  border-radius: 20;
  height: 82px;
  padding: 0 20px 0 20px;
`;

const ValuesContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-horizontal: 10;
`;

const Value = styled.Text`
  font-size: 20px;
  color: ${props => (props.active ? 'white' : 'rgba(255,255,255,0.43)')};
  margin: 5px 0px;
  font-weight: 800;
`;

const ScheduleList = styled(Timeline).attrs({
  circleSize: 15,
  lineColor: 'white',
  lineWidth: 4,
  circleColor: 'rgb(0, 188, 255)',
  showTime: false,
})`
  padding: 10px 20px;
  flex: 1;
`;

const ScheduleBaloon = styled.View`
  background-color: ${props => props.theme.colors.secondaryColor};
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20;
  padding-vertical: 15;
  border-radius: 30;
  border-top-left-radius: 0;
  margin: 10px 0px;
`;

const CommentText = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: rgb(51, 108, 248);
  width: ${width - 160};
`;

const ProfileInitials = styled.View`
  width: 40;
  height: 40;
  border-radius: 20;
  align-items: center;
  justify-content: center;
  background-color: #651FFF
`;

const InitialsText = styled.Text`
  color: white;
  font-size: 24;
  font-weight: bold
`;

const IconBall = styled.TouchableOpacity`
  width: 40;
  height: 40;
  border-radius: 20;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primaryColor};
`;

type Schedules = { title: string, talker: string, time: string };

type State = {};

type Props = {};

class EventDetails extends Component<Props, State> {
  getInitials = name => {
    return name ? name.split(' ').slice(0, 2).map(namePart => namePart.charAt(0).toUpperCase()).join('') : '';
  };

  renderItem = (schedule: Schedules) => {
    const { title, talker, time } = schedule;

    if (!talker) {
      return (
        <ScheduleBaloon>
          <View>
            <CommentText>{title}</CommentText>
            <CommentText>{time}</CommentText>
          </View>
        </ScheduleBaloon>
      );
    }

    return (
      <ScheduleBaloon>
        <View>
          <CommentText>{title}</CommentText>
          <CommentText>{time}</CommentText>
        </View>
        <ProfileInitials>
          <InitialsText>{this.getInitials(talker)}</InitialsText>
        </ProfileInitials>
      </ScheduleBaloon>
    );
  };
  render() {
    const { schedule, title, description, date, location } = this.props.query.event;

    return (
      <Wrapper>
        <StatusBar barStyle="light-content" />
        <HeaderContainer>
          <SafeAreaView />
          <Header>
            <HeaderButton onPress={() => this.props.navigation.goBack()}>
              <CloseIcon />
            </HeaderButton>
            <HeaderButton>
              <EditIcon />
            </HeaderButton>
          </Header>
        </HeaderContainer>
        <ScrollView>
          <EventName>{title}</EventName>
          <EventDescription>{description}</EventDescription>
          <DateAndLocationRow>
            <ValuesContainer>
              <Value active>WHEN</Value>
              <TouchableOpacity>
                <Value>{moment(date).format('MMM Do YYYY')}</Value>
              </TouchableOpacity>
            </ValuesContainer>
            <ValuesContainer>
              <Value active>WHERE</Value>
              <TouchableOpacity>
                <Value>{location && location.street && location.street.split('-')[0]}</Value>
              </TouchableOpacity>
            </ValuesContainer>
          </DateAndLocationRow>
          <AttendRow>
            <CommentText>Can you go to the event?</CommentText>
            <IconBall />
          </AttendRow>
          <ScheduleList data={schedule} renderDetail={this.renderItem} />
        </ScrollView>
      </Wrapper>
    );
  }
}

const EventDetailFragmentCotnainer = createFragmentContainer(EventDetails, {
  query: graphql`
    fragment EventDetails_query on Query @argumentDefinitions(id: { type: "ID!" }) {
      me {
        email
      }
      event(id: $id) {
        title
        location {
          street
        }
        description
        date
        schedule {
          time
          title
          talker
        }
        publicList {
          name
        }
      }
    }
  `,
});

export default createQueryRenderer(EventDetailFragmentCotnainer, EventDetails, {
  query: graphql`
    query EventDetailsQuery($id: ID!) {
      ...EventDetails_query @arguments(id: $id)
    }
  `,
  queriesParams: props => {
    const { id } = props.navigation.state.params;
    return {
      id,
    };
  },
});
