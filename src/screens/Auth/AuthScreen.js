// @flow

import React, { Component } from 'react';
import styled from 'styled-components/native'
import { withNavigation } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primaryColor}
  padding: 20px;
`;

const LoginButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const LoginText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-weight: 900;
  font-size: 18px;
  text-align: right;
`;

const TextWrapper = styled.View`
  flex: 2;
`;

const ReactLogo = styled.Image.attrs({
  source: { uri: 'https://8sph.azureedge.net/media/Default/_Profiles/8f14fafe/ae24358d/reactjs.png?v=636119954010000000' },
})`
  width: 100px;
  height: 88px;
`;

const BigText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 34px;
  font-weight: 900;
  margin-top: 20px;
`;

const ButtonsWrapper = styled.View`
  flex: 2;
  justify-content: flex-start;
`;

const FacebookLogo = styled.Image.attrs({
  source: { uri: 'https://s3.amazonaws.com/freebiesupply/large/2x/facebook-logo-black-transparent.png' },
})`
  width: 20px;
  height: 28px;
  margin: 0 15px 5px 0;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 20px;
`;

type Props = {};

type State = {};

@withNavigation
export default class AuthScreen extends Component<any, Props, State> {
  render() {
    return (
      <Wrapper>
        <Header>
          <LoginButton>
            <LoginText>Login</LoginText>
          </LoginButton>
        </Header>
        <TextWrapper>
          <ReactLogo />
          <BigText>Welcome to React Brasil Events</BigText>
        </TextWrapper>
        <ButtonsWrapper>
          <Button>
            <FacebookLogo />
            <ButtonText>Continue with Facebook</ButtonText>
          </Button>
          <Button>
            <ButtonText>Create an Account</ButtonText>
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}