// @flow
import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

const Wrapper = styled.View`
`;

const ModalContent = styled(LinearGradient).attrs({
  colors: ['#53B1FF', '#651FFF'],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 },
})`
  flex-direction: column;
  height: 150px;
  border-radius: 5px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
  shadow-radius: 5px;
  shadow-opacity: 0.1;
`;

const ModalText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 32px;
  font-weight: bold;
`;

const Body = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 110px;
`;

const Bottom = styled.TouchableOpacity`
  height: 40px;
  border-top-width: 1px;
  border-top-color: ${props => props.theme.colors.secondaryColor};
  justify-content: center;
  align-items: center;
`;

const BottomText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 18px;
  font-weight: bold;
`;

const InputTitle = styled.TextInput.attrs({
  placeholderTextColor: props => props.theme.colors.secondaryText,
  underlineColorAndroid: props => props.theme.colors.secondaryColor,
  selectionColor: props => props.theme.colors.secondaryColor,
  color: props => props.theme.colors.secondaryColor,
  autoCapitalize: 'none',
  keyboardType: 'numeric',
  maxLength: 3,
}) `
  font-size: 32;
  font-weight: bold;
`;

type Props = {
  isVisible: boolean,
  distance: number,
  changeDistance: string => void,
  closeDistanceModal: () => void,
};

const DistanceModal = ({ isVisible, distance, changeDistance, closeDistanceModal }: Props) => (
  <Wrapper>
    <Modal isVisible={isVisible}>
      <ModalContent>
        <Body>
          <InputTitle
            value={distance.toString()}
            onChangeText={(text) => changeDistance(text)}
          />
          <ModalText>
            {' '}km
          </ModalText>
        </Body>
        <Bottom onPress={closeDistanceModal}>
          <BottomText>See results</BottomText>
        </Bottom>
      </ModalContent>
    </Modal>
  </Wrapper>
);

export default DistanceModal;