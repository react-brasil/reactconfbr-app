// @flow

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styled from 'styled-components/native';
import { withNavigation, SwitchNavigator } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';
import ErrorModal from '../../components/ErrorModal';
import Input from '../../components/Input';
import RegisterMutation from './RegisterEmailMutation';

import { IMAGES } from '../../utils/design/images';
import { ROUTENAMES } from '../../navigation/RouteNames';
import { LoggedAppRouter } from '../../navigation/Router';

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
  z-index: 3;
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
  z-index: 1;
`;

const Arrow = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 30;
  height: 24;
  margin-top: 5;
  tint-color: black;
`;

type Props = void;

type State = {
  name: string,
  email: string,
  password: string,
  errorText: string,
};

@withNavigation
export default class LoginScreen extends Component<any, Props, State> {
  state = {
    name: '',
    email: '',
    password: '',
    errorText: '',
  };

  handleRegisterPress = async () => {
    const { name, email, password } = this.state;
    const { navigation } = this.props;

    if (!name || !email || !password) {
      return this.setState({
        errorText: 'Preencha todos os campos!',
      });
    }

    const input = {
      name,
      email,
      password,
    };

    const onCompleted = async res => {
      const response = res && res.RegisterEmail;
      const token = response && response.token;
      console.log('register sucess res', res);
      if (response && response.error) {
        console.log('Register onCompleted error', response.error);
        return this.setState({
          errorText: response.error,
        });
      } else if (token) {
        console.log('Cadastro realizado com sucesso!');
        await AsyncStorage.setItem('token', token);
        navigation.navigate(ROUTENAMES.LOGGED_APP);
      }
    };

    const onError = () => {
      console.log('Register onError');
      return this.setState({
        errorText: 'Verifique sua conexão com a internet e tente novamente',
      });
    };

    RegisterMutation.commit(input, onCompleted, onError);
  };

  closeModal = () => {
    this.setState({
      errorText: '',
    });
  };

  render() {
    const { navigation } = this.props;
    const { errorText } = this.state;

    return (
      <Wrapper>
        <Header>
          <ForgotButton onPress={() => navigation.pop()}>
            <Arrow />
          </ForgotButton>
          <ForgotButton onPress={() => navigation.navigate(ROUTENAMES.LOGIN)}>
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
        <ErrorModal
          visible={errorText ? true : false}
          errorText={errorText}
          onRequestClose={this.closeModal}
        />
      </Wrapper>
    );
  }
}
