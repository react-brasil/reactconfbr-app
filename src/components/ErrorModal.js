import React from 'react';
import { Platform, Dimensions } from 'react-native';
import styled, { css } from 'styled-components';
import { IMAGES } from '../utils/design/images';

const { width } = Dimensions.get('window');

const Wrapper = styled.Modal`
  height: 90;
`;

const ErrorView = styled.View`
  padding: 10px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 7px;
  ${Platform.select({ ios: css`
      shadow-color: grey;
      shadow-offset: 0px 0px;
      shadow-radius: 2px;
      shadow-opacity: 2px;`, android: css`
        elevation: 5;
    ` })};
  width: ${width - 40};
  height: 68;
  left: 20;
  right: 20;
  position: absolute;
  bottom: 15;
  z-index: 10;
`;

const CloseButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.Text`
  flex: 6;
  color: ${props => props.theme.colors.errorViewColor};
  font-weight: bold;
  margin-horizontal: 10;
  font-size: 16;
`;

const CloseIcon = styled.Image.attrs({
  source: IMAGES.CLOSE,
})`
  tint-color: ${props => props.theme.colors.errorViewColor};
  width: 25;
  height: 25;
`;

type Props = {
  errorText: string,
  visible: visible,
  onRequestClose: () => void,
  timeout: number,
};

const ErrorModal = ({ errorText, visible, timeout, onRequestClose }: Props) => {
  if (timeout && visible === true) {
    setTimeout(() => {
      onRequestClose();
    }, timeout);
  }
  return (
    <Wrapper
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
      hardwareAccelerated
    >
      <ErrorView>
        <ErrorText>
          {errorText}
        </ErrorText>
        <CloseButton onPress={onRequestClose}>
          <CloseIcon />
        </CloseButton>
      </ErrorView>
    </Wrapper>
  );
};

export default ErrorModal;
