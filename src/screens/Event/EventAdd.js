import * as React from 'react';
import { SafeAreaView, StatusBar, Platform, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../../utils/design/images';
import KeyBoardSpacer from 'react-native-keyboard-spacer';
import DatePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

const Wrapper = styled(LinearGradient).attrs({
  colors: ['rgb(41, 123, 247)', '#651FFF'],
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
}) `
  flex: 1;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 10;
  left: 20;
  right: 20;
  background-color: transparent;
  z-index: 1000;
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
`;

const CloseIcon = styled.Image.attrs({
  source: IMAGES.CLOSE,
}) `
  width: 26;
  height: 26;
  tint-color: white;
`;

const CreateButton = styled.TouchableOpacity`
  padding: 8px 20px;
  z-index: 1000;
  border-radius: 20;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-right: -10;
`;

const SmallText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 16;
  font-weight: 800; 
`;

const EventName = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.43)',
  placeholder: 'Event Name ...',
  underlineColorAndroid: 'transparent',
  selectionColor: 'white',
}) `
  font-size: 32px;
  color: white;
  font-weight: 800;
  width: 88%;
  margin: 20px 25px;
  margin-top: 80;
`;

const EventDescription = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.43)',
  placeholder: 'What’s the plan for the event?',
  underlineColorAndroid: 'transparent',
  multiline: true,
  selectionColor: 'white',
}) `
  font-size: 45px;
  color: white;
  font-weight: 800;
  width: 88%;
  height: 150px;
  margin: 10px 25px;
`;

const DateAndLocationRow = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 10px 30px;
`;

const ValuesContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin-horizontal: 10;
`;

const Value = styled.Text`
  font-size: 20px;
  color: ${props => props.active ? 'white' : 'rgba(255,255,255,0.43)'};
  margin: 5px 0px;
  font-weight: 800;
`;

const BiggerText = styled(Value) `
  font-size: 27px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-left: 10;
`;

const IncreaseButtons = styled.TouchableOpacity`
  width: 36;
  height: 36;
  background-color: white;
  border-radius: ${36 / 2};
  align-items: center;
  justify-content: center;
  margin: 0px 20px;
`;

const PlusIcon = styled.Image.attrs({
  source: IMAGES.ADD,
}) `
  width: 20;
  height: 20;
  tint-color: ${props => props.theme.colors.primaryColor};
`;

const MinusIcon = styled.Image.attrs({
  source: IMAGES.MINUS,
}) `
  width: 20;
  height: 20;
  tint-color: ${props => props.theme.colors.primaryColor};
`;

type Schedules = { title: string, talker: string, time: string }

type State = {
  name: string,
  description: string,
  date: string,
  location: {
    cep: string,
    coordinates: Array<number>,
  },
  address: string,
  schedules: Array<Schedules>,
  errorText: string,
  eventLimit: number,
  isDatePickerVisible: boolean,
}

type Props = {};

class EventAdd extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      date: '',
      location: { cep: '', coordinates: [0, 0] },
      address: '',
      eventLimit: 10,
      schedules: [],
      errorText: '',
      isDatePickerVisible: false,
    }
    this.timer = null;
  }

  addOne = () => {
    this.setState({ eventLimit: this.state.eventLimit + 1 });
    this.timer = setTimeout(this.addOne, 80);
  }

  stopTimer = () => {
    clearTimeout(this.timer);
  }

  handleDatePicked = (date: string) => {
    this.setState({
      date,
      isDatePickerVisible: false,
    });
  };

  setDatePicker = () => this.setState({ isDatePickerVisible: !this.isDatePickerVisible });

  render() {
    const { name, description, address, date, eventLimit, isDatePickerVisible } = this.state;
    return (
      <Wrapper>
        <StatusBar barStyle="light-content" />
        <HeaderContainer>
          <SafeAreaView />
          <Header>
            <HeaderButton onPress={() => this.props.navigation.goBack()}>
              <CloseIcon />
            </HeaderButton>
            <CreateButton>
              <SmallText>CREATE</SmallText>
            </CreateButton>
          </Header>
        </HeaderContainer>
        <ScrollView>
          <EventName
            value={name}
            maxLength={50}
            onChangeText={(name: string) => this.setState({ name })}
          />
          <EventDescription
            value={description}
            maxLength={100}
            onChangeText={(description: string) => this.setState({ description })}
          />
          <DateAndLocationRow>
            <ValuesContainer>
              <Value active>WHEN</Value>
              <TouchableOpacity onPress={this.setDatePicker}>
                <Value>{date ? moment(date).format('MMM Do YYYY') : 'Pick a date'}</Value>
              </TouchableOpacity>
            </ValuesContainer>
            <ValuesContainer>
              <Value active>WHERE</Value>
              <Value>{address ? address : 'Set a location'}</Value>
            </ValuesContainer>
          </DateAndLocationRow>
          <DateAndLocationRow>
            <BiggerText active>Event Limit: </BiggerText>
            <Row>
              <IncreaseButtons onPressIn={this.addOne} onPressOut={this.stopTimer}>
                <PlusIcon />
              </IncreaseButtons>
              <Value active>{eventLimit}</Value>
              <IncreaseButtons onPress={() => this.setState({ eventLimit: eventLimit === 0 ? eventLimit : eventLimit - 1 })}>
                <MinusIcon />
              </IncreaseButtons>
            </Row>
          </DateAndLocationRow>
        </ScrollView>
        {Platform.OS === 'ios' && <KeyBoardSpacer />}
        <DatePicker onCancel={this.setDatePicker} onConfirm={this.handleDatePicked} isVisible={isDatePickerVisible} />
      </Wrapper>
    )
  }
}

export default EventAdd