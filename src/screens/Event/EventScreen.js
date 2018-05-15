// @flow

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import ActionButton from '../../components/ActionButton';

import { IMAGES } from '../../utils/design/images';
import GradientWrapper from '../../components/GradientWrapper';

const Wrapper = styled.View`
  flex: 1;
`
const ForgotButton = styled.TouchableOpacity`
`;

const ImageWrapper = styled(GradientWrapper)`
  flex: 0.6;
  padding: 20px;
  shadow-color: grey;
  shadow-offset: 0px 10px;
  shadow-radius: 0;
  shadow-opacity: 1;
`;

const TextWrapper = styled.View`
  margin-top: auto;
`;

const Title = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 36px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: bold;
  font-size: 20px;
`;

const Arrow = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 30;
  height: 24;
  margin-top: 5;
  tint-color: ${props => props.theme.colors.secondaryColor};
`;

const BodyWrapper = styled.View`
  flex: 6;
  background-color: ${props => props.theme.colors.secondaryColor};
`;

const TimeLineWrapper = styled.View`
  margin: 20px;
  margin: 20px 28px 20px 28px;
  background-color: ${props => props.theme.colors.secondaryColor};
  margin-top: -40px;
  border-radius: 20px;
  border-radius: 20;
  shadow-offset: { width: 0, height: 0 };
  shadow-opacity: 0.15;
  shadow-radius: 20;
  elevation: 1;
  min-height: 300px;
`;

const HeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TimeLine = styled.ScrollView.attrs({
  contentContainerStyle: () => ({
    zIndex: 9,
    marginTop: 20,
  }),
})``;

const Talk = styled.View`
  height: 90px;
  margin: 0 20px 0 20px;
  border-left-color:  gray;
  border-left-width: 1px;
  flex-direction: row;
`;

const TalkTitle = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-weight: bold;
  font-size: 20px;
`;

const IconWrapper = styled.View`
  flex: 1;
`;

const Ball = styled.View`
  height: 16px;
  width: 16px;
  border-radius: 50;
  background-color: #2979FF;
  margin-left: -8px;
  margin-top: 6px
`;

const ContentWrapper = styled.View`
  flex: 9
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const BasicInfosWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 5px;
`;

const InfosText = styled.Text`
  color: ${props => props.theme.colors.secondaryText};
  font-weight: bold;
  font-size: 14px;
`;


type Props = {
  navigation: Object,
};

type State = {
  scheduleCount: number,
  email: string,
  password: string,
  errorText: string,
};


@withNavigation
export default class LoginScreen extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    errorText: '',
    scheduleCount: 1,
  };

  closeModal = () => {
    this.setState({
      errorText: '',
    });
  };

  renderTalk = (title, author, date) => (
    <Talk>
      <IconWrapper>
        <Ball />
      </IconWrapper>
      <ContentWrapper>
        <TalkTitle>{title}</TalkTitle>
        <BasicInfosWrapper>
          <InfosText>By: {author}</InfosText>
          <InfosText>{date}</InfosText>
        </BasicInfosWrapper>
      </ContentWrapper>
    </Talk>
  );

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <ImageWrapper>
          <SafeAreaView />
          <HeaderWrapper>
            <ForgotButton onPress={() => navigation.pop()}>
              <Arrow />
            </ForgotButton>
            <Title>Event Title</Title>
          </HeaderWrapper>
          <TextWrapper>
            <Description></Description>
            <Description></Description>
          </TextWrapper>
        </ImageWrapper>
        <BodyWrapper>
          <TimeLineWrapper>
            <TimeLine>
              {this.renderTalk('React native animations', 'Jabur', '8:00')}
            </TimeLine>
          </TimeLineWrapper>
        </BodyWrapper>
        <ActionButton onPress={() => this.setState({ scheduleCount: this.state.scheduleCount + 1 })}/>
      </Wrapper>
    );
  }
}
