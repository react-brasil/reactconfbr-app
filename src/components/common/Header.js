//@flow
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50;
  background-color: transparent;
`;

type Props = {
  onPress?: void => void,
  children?: any,
};

const Header = (props: Props) => (
  <Wrapper>
    {props.children}
  </Wrapper>
);

export default Header;
