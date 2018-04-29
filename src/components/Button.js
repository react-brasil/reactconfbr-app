//@flow
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50;
  border-bottom-left-radius: 50;
  border-bottom-right-radius: 50;
  border-top-left-radius: 50;
  border-top-right-radius: 50;
  margin-top: 20;
  background-color: ${props => props.fill ? props.theme.colors.secondaryColor : 'transparent'};
  margin-left: auto;
  margin-right: auto;
  border: 2px solid ${props => props.theme.colors.secondaryColor};
`;

type Props = {
  onPress?: (void) => void,
  children?: Node,
  fill?: boolean
};

const Button = (props: Props) => (
  <Wrapper onPress={() => props.onPress()} {...props}>
    {props.children}
  </Wrapper>
);

export default Button;
