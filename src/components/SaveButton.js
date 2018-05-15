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
  bottom: 90;
  right: 20;
  position: absolute;
`;

const Icon = styled.Image.attrs({
  source: IMAGES.SAVE,
})`
  width: 23;
  height: 23;
  tint-color: white;
`;

type Props = {};

const SaveButton = (props: Props) => (
  <Wrapper {...props}>
    <Icon />
  </Wrapper>
);

export default SaveButton;
