// @flow

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

import Header from '../../components/common/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import LoginMutation from './LoginEmailMutation';

import { IMAGES } from '../../utils/design/images';
import { ROUTENAMES } from '../../navigation/RouteNames';
import GradientWrapper from '../../components/GradientWrapper';
import { withContext } from '../../Context';


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

const ButtonText = styled.Text`
  color: ${props => (!props.error ? props.theme.colors.primaryColor : props.theme.colors.errorViewColor)};
  font-size: 24px;
  font-weight: bold
`;

const Arrow = styled.Image.attrs({
  source: IMAGES.ARROW,
})`
  width: 30;
  height: 24;
  margin-top: 5;
  tint-color: ${props => props.theme.colors.secondaryColor};
`;

type Props = {
  navigation: Object,
  context: Object,
};

type State = {
  email: string,
  password: string,
  errorText: string,
};

@withNavigation
class LoginScreen extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    errorText: '',
  };

  handleLoginPress = async () => {
    const { email, password } = this.state;
    const { navigation } = this.props;

    if (!email || !password) {
      console.log('this.props', this.props)
    }

    const input = {
      email,
      password,
    };

    const onCompleted = async res => {
      const response = res && res.LoginEmail;
      const token = response && response.token;
      if (response && response.error) {
        this.props.context.openModal(response.error);
      } else if (token) {
        this.props.context.openSuccessModal('Você logou com sucesso');
        await AsyncStorage.setItem('token', token);
        navigation.navigate(ROUTENAMES.LOGGED_APP);
      }
    };

    const onError = () => {
      this.setState({
        errorText: 'Verifique sua conexão com a internet e tente novamente',
      });
    };

    LoginMutation.commit(input, onCompleted, onError);
  };

  closeModal = () => {
    this.setState({
      errorText: '',
    });
  };

  render() {
    const { navigation, context } = this.props;
    const { errorText } = context;

    return (
      <GradientWrapper error={errorText ? true : false}>
        <Header>
          <ForgotButton onPress={() => navigation.pop()}>
            <Arrow />
          </ForgotButton>
          <ForgotButton>
            <ForgotText>Forgot Password</ForgotText>
          </ForgotButton>
        </Header>
        <TextWrapper>
          <BigText>Login</BigText>
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
          <Button fill onPress={this.handleLoginPress}>
            <ButtonText error={errorText ? true : false}>Login</ButtonText>
          </Button>
        </ButtonsWrapper>
        <BottomFixedReactLogo />
      </GradientWrapper>
    );
  }
}

export default withContext(LoginScreen);