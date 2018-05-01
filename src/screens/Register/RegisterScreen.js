// @flow

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import RegisterMutation from './RegisterEmailMutation';

import { IMAGES } from '../../utils/design/images';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryColor}
  padding: 20px;
`;

const ForgotButton = styled.TouchableOpacity`
`;

const ForgotText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: bold;
  font-size: 20px;
  text-align: right;
`;

const TextWrapper = styled.View`
  flex: 3;
`;

const BigText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 36px;
  font-weight: bold;
  padding: 20px 0 20px 0;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-horizontal: 5;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 24px;
  font-weight: bold
`;

const BottomFixedReactLogo = styled.Image.attrs({
  source: IMAGES.REACT,
})`
  width: 303;
  height: 271.39;
  position: absolute;
  right: -100;
  bottom: -90;
  tint-color: rgba(0,0,0,0.1);
`;

const Arrow = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 30;
  height: 24;
  margin-top: 5;
  tint-color: black;
`;

type Props = {};

type State = {};

@withNavigation
export default class LoginScreen extends Component<any, Props, State> {
  state = {
    name: '',
    email: '',
    password: '',
  };

  handleRegisterPress = async () => {
    const { name, email, password } = this.state;
    const input = {
      name,
      email,
      password,
    };

    const onCompleted = async res => {
      const { navigation } = this.props;
      const response = res && res.RegisterEmail;
      const token = response && response.token;
      console.log('register sucess res', res);
      if (response && response.error) {
        console.log('Register onCompleted error', response.error);
      } else if (token) {
        await AsyncStorage.setItem('token', token);
        navigation.navigate('EventsScreen');
      }
    };

    const onError = () => {
      console.log('Register onError');
    };

    RegisterMutation.commit(input, onCompleted, onError);
  };

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <Header>
          <ForgotButton onPress={() => navigation.pop()}>
            <Arrow />
          </ForgotButton>
          <ForgotButton onPress={() => navigation.navigate('LoginScreen')}>
            <ForgotText>Login</ForgotText>
          </ForgotButton>
        </Header>
        <TextWrapper>
          <BigText>Create an Account</BigText>
          <Input
            placeholder="Name"
            onChangeText={text => this.setState({ name: text })}
          />
          <Input
            placeholder="Email"
            onChangeText={text => this.setState({ email: text })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </TextWrapper>
        <ButtonsWrapper>
          <Button fill onPress={this.handleRegisterPress}>
            <ButtonText>Create an Account</ButtonText>
          </Button>
        </ButtonsWrapper>
        <BottomFixedReactLogo />
      </Wrapper>
    );
  }
}
