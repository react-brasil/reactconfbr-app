// @flow

import React from 'react';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

const InputWrapper = styled.View`
  padding: 10px;
  border-bottom-color: ${props => props.theme.colors.secondaryColor};
  border-bottom-width: 2.5;
  margin-top: 30px;
`;

const RegisterTextInput = styled(TextInputMask).attrs({
  placeholderTextColor: props => props.theme.colors.secondaryColor,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.secondaryColor,
  autoCapitalize: 'none',
})`
  height: 40;
  width: 100%;
  font-size: 20;
  padding-top:2;
  color: white;
`;

type Props = {
  name?: string,
  placeholder?: string,
  value?: string,
  onChangeText?: string => void,
  secureTextEntry?: boolean,
};

const Input = (props: Props) => (
  <InputWrapper>
    <RegisterTextInput {...props} />
  </InputWrapper>
);

export default Input;
