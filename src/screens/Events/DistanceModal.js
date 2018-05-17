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

const Bottom = styled.View`
  flex-direction: row;
  height: 40px;
  justify-content: space-around;
  align-items: center;
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

const Pill = styled.TouchableOpacity`
  padding: 8px 18px;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${props => props.theme.colors.secondaryColor};
  margin-right: 10;
  background-color: ${props => props.fill ? props.theme.colors.secondaryColor : 'transparent'}
`;

type Props = {
  isVisible: boolean,
  distance: number,
  changeDistance: string => void,
  closeDistanceModal: () => void,
  seeDistanceResults: () => void,
};

const DistanceModal = ({ isVisible, distance, changeDistance, seeDistanceResults, closeDistanceModal }: Props) => (
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
        <Bottom>
          <Pill onPress={closeDistanceModal} />
          <Pill fill onPress={seeDistanceResults} />
        </Bottom>
      </ModalContent>
    </Modal>
  </Wrapper>
);

export default DistanceModal;