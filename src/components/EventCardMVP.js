// @flow
import * as React from 'react';
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const MakeTouchable = styled.TouchableOpacity`
  border-radius: 20;
`;

const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgb(41, 123, 247)', 'rgb(101,31, 255)'],
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
})`
  margin-horizontal: 20;
  margin-top: 20;
  overflow: hidden;
  border-radius: 20;
  ${Platform.select({ ios: css`
      shadow-color: grey;
      shadow-offset: 0px 0px;
      shadow-radius: 2px;
      shadow-opacity: 2px;`, android: css`
        elevation: 5;
  ` })};
  flex-direction: column;
  padding: 22px 15px;
  border-radius: 20;
`;

const Row = styled.View`
  flex-direction: row;
  flex: 1;
`;

const DateText = styled.Text`
  font-size: 16;
  color: white;
  font-weight: bold;
  flex: 1;
  text-align: center;
  width: 10;
  margin: 0px 8px;
`;

const Container = styled.View`
  flex-direction: column;
  flex: 4;
  padding: 0px 10px; 
`;

const Separator = styled.View`
  width: 1;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 20;
  color: white;
  font-weight: bold;
`;

const EventAddress = styled.Text`
  font-size: 14;
  color: white;
  font-weight: bold;
`;

const AtendeesRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Atendees = styled.View`
  width: 30;
  height: 30;
  border-radius: 15;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const AttendeesInitials = styled.Text`
  color: rgb(41, 123, 247);
  font-size: 14;
  font-weight: 800;
`;

type User = {
  image: string,
  name: string,
};

type Props = {
  atendees: Array<User>,
  title: string,
  address: string,
  date: string,
  seeButtonAction: () => void,
};

export const getInitials = (name: string) => {
  return name ? name.split(' ').slice(0, 2).map(namePart => namePart.charAt(0).toUpperCase()).join('') : '';
};

const EventCard = ({ atendees, title, address, date, seeButtonAction }: Props) => {
  return (
    <MakeTouchable onPress={seeButtonAction}>
      <Wrapper>
        <Row>
          <DateText>
            {moment(date).format('DD \n MMM \n YYYY')}
          </DateText>
          <Separator />
          <Container>
            <EventAddress>{address}</EventAddress>
            <Title>{title}</Title>
            <AtendeesRow>
              {atendees.map((atendee, i) => (
                <Atendees key={i}>
                  <AttendeesInitials>{getInitials(atendee.name)}</AttendeesInitials>
                </Atendees>
              ))}
            </AtendeesRow>
          </Container>
        </Row>
      </Wrapper>
    </MakeTouchable>
  );
};

export default EventCard;
