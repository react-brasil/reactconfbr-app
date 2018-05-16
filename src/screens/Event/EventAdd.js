// @flow

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';

import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';
import { withContext } from '../../Context';
import type { ContextType } from '../../Context';

import ActionButton from '../../components/ActionButton';
import SaveButton from '../../components/SaveButton';
import { IMAGES } from '../../utils/design/images';
import ErrorModal from '../../components/ErrorModal';
import GradientWrapper from '../../components/GradientWrapper';
import EventAddMutation from './EventAddMutation';
import TextInputMask from 'react-native-text-input-mask';

const Wrapper = styled.View`
  flex: 1;
`
const ForgotButton = styled.TouchableOpacity`
`;

const ImageWrapper = styled(GradientWrapper) `
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

const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.secondaryColor,
  color: props => props.theme.colors.primaryColor,
  autoCapitalize: 'none',
}) `
  font-size: 36;
  color: ${props => props.theme.colors.secondaryColor};
`;

const Description = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: bold;
  font-size: 20px;
`;

const Arrow = styled.Image.attrs({
  source: IMAGES.ARROW,
}) `
  width: 30;
  height: 24;
  margin-top: 5;
  tint-color: ${props => props.theme.colors.secondaryColor};
`;

const Edit = styled.Image.attrs({
  source: IMAGES.EDIT,
}) `
  width: 20;
  height: 20;
  margin-top: 5;
  tint-color: ${props => props.theme.colors.secondaryColor};
`;


const BodyWrapper = styled.View`
  flex: 6;
  background-color: ${props => props.theme.colors.secondaryColor};
`;

const TimeLineWrapper = styled.View`
  margin: 20px 28px 20px 28px;
  background-color: ${props => props.theme.colors.secondaryColor};
  margin-top: -30px;
  border-radius: 20px;
  border-radius: 20;
  shadow-offset: { width: 0, height: 0 };
  shadow-opacity: 0.15;
  shadow-radius: 20;
  elevation: 1;
  min-height: 300px;
`;

const HeaderWrapper = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

const TimeLine = styled.ScrollView.attrs({
  contentContainerStyle: () => ({
    zIndex: 9,
    marginTop: 20,
  }),
}) ``;

const Talk = styled.View`
  height: 90px;
  margin: 0 20px 0 20px;
  border-left-color:  gray;
  border-left-width: 1px;
  flex-direction: row;
`;

const InputTalkTitle = styled.TextInput.attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.primaryColor,
  color: props => props.theme.colors.primaryColor,
  autoCapitalize: 'none',
}) `
  height: 40;
  width: 100%;
  font-size: 20;
`;

const InputCep = styled(TextInputMask).attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.secondaryColor,
  color: props => props.theme.colors.secondaryColor,
  autoCapitalize: 'none',
  mask: '[00][000][000]',
}) `
  font-size: 20;
`;

const InputDate = styled(TextInputMask).attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.secondaryColor,
  color: props => props.theme.colors.secondaryColor,
  autoCapitalize: 'none',
  mask: '[00]/[00] [00]:[00]',
}) `
  font-size: 20;
  margin-left: 20px;
`;

const InputInfoText = styled.TextInput.attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.primaryColor,
  color: props => props.theme.colors.primaryColor,
  autoCapitalize: 'none',
}) `
  font-size: 14;
  color: ${props => props.theme.colors.primaryColor};
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
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-top: 5px;
`;

const InfosText = styled.Text`
  color: ${props => props.theme.colors.secondaryText};
  font-weight: bold;
  font-size: 14px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

type Props = {
  navigation: Object,
  context: ContextType,
};

type State = {
  title: string,
  errorText: string,
  schedules: Array<Object>,
  date: string,
  location: Object,
  date: string,
  image: string,
  description: string,
  publicLimit: string
};



@withNavigation
class EventAdd extends Component<Props, State> {
  state = {
    image: '',
    title: '',
    errorText: '',
    schedules: [],
    date: '',
    location: { cep: '', geolocation: [0, 0] },
    description: '',
    publicLimit: '20',
  };

  save = async () => {
    const { context } = this.props;
    const { schedules, title, date, location, image, description, publicLimit } = this.state;
    console.log('location onsave', location);
    const input = {
      title,
      date,
      location,
      schedule: schedules,

      // @TODO
      image,
      description,
      publicLimit,
    };

    console.log('input', input)

    const onCompleted = async res => {
      const response = res && res.EventAdd;
      if (response && response.error) {
        context.openModal('Verifique sua conexão com a internet e tente novamente');
      } else {
        context.openSuccessModal('Seu evento foi criado com sucesso');
      }

    };

    const onError = () => {
      context.openModal('Verifique sua conexão com a internet e tente novamente');
    };

    EventAddMutation.commit(input, onCompleted, onError);
  };

  closeModal = () => {
    this.setState({
      errorText: '',
    });
  };

  handleChangeInputField = (value: string, index: number, element: string) => {
    const schedules = [...this.state.schedules];
    let newSchedules;
    switch (element) {
      case 'title':
        newSchedules = Object.assign({}, schedules[index], {
          title: value,
        });
        break;
      case 'talker':
        newSchedules = Object.assign({}, schedules[index], {
          talker: value,
        });
        break;
      case 'time':
        newSchedules = Object.assign({}, schedules[index], {
          time: value,
        });
        break;
      default:
        break;
    }
    schedules[index] = newSchedules;
    this.setState({ schedules });
  };

  addSchedule = () => {
    const newRange = { title: '', talker: '', time: '' };
    this.setState({ schedules: [...this.state.schedules, newRange] });
  };

  removeSchedule = (index: number) => {
    const newschedules = [...this.state.schedules.filter((s, id) => index !== id)];
    this.setState({ schedules: newschedules });
  };

  getLocation = () => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=88075220&key=AIzaSyCuvQjcYHf8cktJBnNG7TC_6pfopL-C3OE', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let lng = responseJson.results[0].geometry.location.lng
      let lat = responseJson.results[0].geometry.location.lat
      const location = { ...this.state.location, geolocation: [lng, lat] }
      console.log('onBlur location', location);
      this.setState({ location });
    })
    .catch((error) => {
      console.error(error);
    });

  }

  render() {
    const { navigation } = this.props;
    const { schedules, errorText, location } = this.state;
    return (
      <Wrapper>
        <ImageWrapper>
          <SafeAreaView />
          <HeaderWrapper>
            <Row>
              <ForgotButton onPress={() => navigation.pop()}>
                <Arrow />
              </ForgotButton>
              <InputTitle
                placeholder="Event Title"
                onChangeText={(text) => this.setState({ title: text })}
              />
              <ForgotButton onPress={() => navigation.pop()}>
                <Edit />
              </ForgotButton>
            </Row>
            <Row>
              <InputCep
                placeholder="000000000"
                onChangeText={(text) => this.setState({ location: { ...location, cep: text } })}
                onBlur={this.getLocation}
              />
              <InputDate
                placeholder="DD/MM HH:MM"
                onChangeText={(text) => this.setState({ date: text })}
              />
            </Row>
          </HeaderWrapper>
          <TextWrapper>
            <Description></Description>
            <Description></Description>
          </TextWrapper>
        </ImageWrapper>
        <BodyWrapper>
          <TimeLineWrapper>
            <TimeLine>
              {schedules.map((schedule, index) => (
                <Talk key={index}>
                  <IconWrapper>
                    <Ball />
                  </IconWrapper>
                  <ContentWrapper>
                    <InputTalkTitle
                      placeholder="Talk title"
                      onChangeText={(text) => this.handleChangeInputField(text, index, 'title')}
                    />
                    <BasicInfosWrapper>
                      <Row>
                        <InfosText>By: </InfosText>
                        <InputInfoText
                          placeholder=" Author name"
                          onChangeText={(text) => this.handleChangeInputField(text, index, 'talker')}
                        />
                      </Row>
                      <Row style={{ marginTop: 5 }}>
                        <InfosText>At: </InfosText>
                        <InputInfoText
                          placeholder=" ex: 8:00"
                          onChangeText={(text) => this.handleChangeInputField(text, index, 'time')}
                        />
                      </Row>
                    </BasicInfosWrapper>
                  </ContentWrapper>
                </Talk>
              ))}
            </TimeLine>
          </TimeLineWrapper>
        </BodyWrapper>
        {schedules.length > 0 && <SaveButton onPress={() => this.save()} />}
        <ActionButton onPress={() => this.addSchedule()} />
        <ErrorModal
          visible={errorText ? true : false}
          errorText={errorText}
          onRequestClose={this.closeModal}
          timeout={6000}
        />
      </Wrapper>
    );
  }
}

export default withContext(EventAdd);
