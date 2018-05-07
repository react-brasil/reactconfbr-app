import React from 'react';
import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { IMAGES } from '../utils/design/images';

const Wrapper = styled.TouchableOpacity`
  ${Platform.select({ ios: css`
      shadow-color: grey;
      shadow-offset: 0px 0px;
      shadow-radius: 2px;
      shadow-opacity: 2px;`, android: css`
        elevation: 5;
  ` })};
  background-color: ${props => props.theme.colors.primaryColor};
  align-items: center;
  justify-content: center;
  width: 60;
  height: 60;
  border-radius: 30;
  bottom: 20;
  right: 20;
  position: absolute;
`;

const Icon = styled.Image.attrs({
  source: IMAGES.CLOSE,
})`
  width: 13;
  height: 13;
  tint-color: white;
  transform: rotate(45deg);
`;

type Props = {
  action: () => void,
};

const ActionButton = ({ action }: Props) => (
  <Wrapper onPress={action}>
    <Icon />
  </Wrapper>
);

export default ActionButton;
