// @flow
import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

const Wrapper = styled.View`
`;

const ModalContent = styled.View`
  background-color: ${props => props.theme.colors.secondaryColor};
  flex-direction: column;
  height: 200px;
  border-radius: 5px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
  shadow-radius: 20px;
  shadow-opacity: 1;
`;

const ModalText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 32px;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  border: 3px solid ${props => props.theme.colors.primaryColor};
  justify-content: center;
  align-items: center;
`;

const Body = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 160px;
`;

const Bottom = styled.TouchableOpacity`
  height: 40px;
  border-top-width: 1px;
  border-top-color: grey;
  justify-content: center;
  align-items: center;
`;

const BottomText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 18px;
  font-weight: bold;
`;

type Props = {
  isVisible: boolean,
  distance: number,
  decreaseDistance: () => void,
  increaseDistance: () => void,
};

const DistanceModal = ({ isVisible, distance, decreaseDistance, increaseDistance, closeDistanceModal }: Props) => (
  <Wrapper>
    <Modal isVisible={isVisible}>
      <ModalContent>
        <Body>
          <Button onPress={decreaseDistance}>
            <ModalText>-</ModalText>
          </Button>
          <ModalText>{distance} km</ModalText>
          <Button onPress={increaseDistance}>
            <ModalText>+</ModalText>
          </Button>
        </Body>
        <Bottom onPress={closeDistanceModal}>
          <BottomText>See results</BottomText>
        </Bottom>
      </ModalContent>
    </Modal>
  </Wrapper>
);

export default DistanceModal;