//@flow
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50;
  background-color: ${props => props.theme.colors.primaryColor};
`;

type Props = {
  onPress?: (void) => void,
  children?: Node
};

const Header = (props: Props) => (
  <Wrapper>
    {props.children}
  </Wrapper>
);

export default Header;
