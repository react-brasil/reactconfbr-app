// @flow

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native'
import { withNavigation } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import RegisterMutation from './RegisterEmailMutation';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryColor}
  padding: 20px;
`;

const ForgotButton = styled.TouchableOpacity`
`;

const ArrowImage = styled.Image.attrs({
  source: { uri: 'http://www.stickpng.com/assets/images/585e4695cb11b227491c3373.png' },
})`
  width: 90px;
  height: 15px;
`;

const ForgotText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: 900;
  font-size: 24px;
  text-align: right;
`;

const TextWrapper = styled.View`
  flex: 3;
`;

const BigText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 34px;
  font-weight: 900;
  padding: 20px 0 20px 0;
`;

const ButtonsWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 20px;
`;

type Props = {};

type State = {};

@withNavigation
export default class LoginScreen extends Component<any, Props, State> {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  handleRegisterClick = async () => {
    const { email, password, confirmPassword } = this.state;
    if ( password !== confirmPassword) {
      console.log('register password === confirmPassword');
      return;
    }

    const input = {
      email,
      password,
    };

    const onCompleted = async (res) => {
      const response = res && res.Register;
      const token = response && response.token;

      if (response && response.error) {
        console.log('Register onCompleted error', response.error);
      } else if (token) {
        await AsyncStorage.setItem('token', token);
      }
    };

    const onError = () => {
      console.log('Register onError')
    };

    RegisterMutation.commit(input, onCompleted, onError);
  };




  render() {
    return (
      <Wrapper>
        <Header>
          <ForgotButton>
            <ForgotText>{'<=='}</ForgotText>
          </ForgotButton>
          <ForgotButton>
            <ForgotText>Login</ForgotText>
          </ForgotButton>
        </Header>
        <TextWrapper>
          <BigText>Create an Account</BigText>
          <Input
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            secureTextEntry
          />
          <Input
            placeholder="Confirm Password"
            secureTextEntry
          />
        </TextWrapper>
        <ButtonsWrapper>
          <Button fill>
            <ButtonText>Create an Account</ButtonText>
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}