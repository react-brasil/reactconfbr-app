// @flow

import React from 'react';
import styled from 'styled-components/native';

const InputWrapper = styled.View`
  padding: 10px;
  border-bottom-color: ${props => props.theme.colors.secondaryColor};
  border-bottom-width: 2.5;
  margin-top: 30px;
`;

const RegisterTextInput = styled.TextInput`
  height: 40;
  width: 100%;
  font-size: 20;
  padding-top:2;
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
    <RegisterTextInput
      placeholderTextColor="black"
      underlineColorAndroid="rgba(0,0,0,0)"
      autoCapitalize="none"
      {...props}
    />
  </InputWrapper>
);

export default Input;
