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
  height: 160px;
  border-radius: 5px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
  shadow-radius: 5px;
  shadow-opacity: 0.1;
`;

const Body = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 130px;
  justify-content: space-around;
  align-items: center;
`;

const Bottom = styled.View`
  flex-direction: row;
  height: 30px;
  justify-content: space-around;
  align-items: center;
`;

const Pill = styled.TouchableOpacity`
  padding: 8px 18px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 2px solid ${props => props.theme.colors.secondaryColor};
  margin-right: 10;
  background-color: ${props => props.fill ? props.theme.colors.secondaryColor : 'transparent'}
  width: 110px;
  height: 35px;
`;

const PillText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 14px;
  font-weight: bold;
`
const Row = styled.View`
  flex-direction: row;
`

const ClosePill = styled.TouchableOpacity`
  padding: 8px 18px;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${props => props.theme.colors.secondaryColor};
  margin-right: 10;
  background-color: ${props => props.fill ? props.theme.colors.secondaryColor : 'transparent'}
`;

type Props = {
  isVisible: boolean,
  setDate: (number) => void,
  closeDateModal: void => void,
};

const DistanceModal = ({ isVisible, setDate, closeDateModal }: Props) => (
  <Wrapper>
    <Modal isVisible={isVisible}>
      <ModalContent>
        <Body>
          <Row>
            <Pill fill onPress={() => setDate(3)}>
              <PillText>3 days</PillText>
            </Pill>
            <Pill fill onPress={() => setDate(7)}>
              <PillText>1 week</PillText>
            </Pill>
          </Row>
          <Row>
            <Pill fill onPress={() => setDate(14)}>
              <PillText>2 weeks</PillText>
            </Pill>
            <Pill fill onPress={() => setDate(28)}>
              <PillText>4 weeks</PillText>
            </Pill>
          </Row>
        </Body>
        <Bottom>
          <ClosePill onPress={closeDateModal} />
        </Bottom>
      </ModalContent>
    </Modal>
  </Wrapper>
);

export default DistanceModal;