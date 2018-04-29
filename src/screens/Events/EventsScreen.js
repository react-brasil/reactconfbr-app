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

const ButtonText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 20px;
`;

type Props = {};

type State = {};

@withNavigation
export default class AuthScreen extends Component<any, Props, State> {

  render() {
    const { navigation } = this.props;

    return (
      <Wrapper>
        <Header>
          <LoginButton onPress={() => navigation.navigate('LoginScreen')}>
            <LoginText>Events Screen</LoginText>
          </LoginButton>
        </Header>
        <TextWrapper>
          <BigText>This is the events screen</BigText>
        </TextWrapper>
        <ButtonsWrapper>
          <Button>
            <ButtonText>events</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate('RegisterScreen')}>
            <ButtonText>screen</ButtonText>
          </Button>
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}