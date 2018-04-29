// @flow

import React from 'react';
import styled from 'styled-components/native';

const InputWrapper = styled.View`
  height: 40;
  border-bottom-color: ${props => props.theme.colors.secondaryColor};
  border-bottom-width: 1;
  margin-top: 30px;
`;

const RegisterTextInput = styled.TextInput`
  height: 40;
  width: 100%;
`;

type Props = {
  name?: string,
  placeholder?: string,
  value?: string,
  onChangeText?: (string) => void,
  secureTextEntry?: boolean,
};

const Input = (props: Props) => (
  <InputWrapper>
    <RegisterTextInput placeholderTextColor="#000000" {...props}/>
  </InputWrapper>
);

export default Input;