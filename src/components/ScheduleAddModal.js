import * as React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Input from './Input';
import { IMAGES } from '../utils/design/images';
import { View, Platform, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const ModalContent = styled(LinearGradient).attrs({
  colors: ['#53B1FF', '#651FFF'],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 },
})`
  padding: 5px;
  flex-direction: column;
  border-radius: 10px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
  shadow-radius: 5px;
  shadow-opacity: 0.1;
`;

const ModalText = styled.Text`
  color: ${props => props.theme.colors.secondaryColor};
  font-size: 32;
  font-weight: bold;
  padding-top: 10;
`;

const CloseAction = styled.TouchableOpacity`
  width: 20;
  height: 20;
  color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 10;

`;

const CloseIcon = styled.Image.attrs({
  source: IMAGES.CLOSE,
})`
  tint-color: white;
  width: 20;
  height: 20;
`;

const Body = styled.View`
  flex-direction: column;
  padding: 10px;
`;

const IsLoadingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 150px;
`;

const Loading = styled.ActivityIndicator.attrs({
  color: 'white',
  animating: true,
})``;

const CreateButton = styled.TouchableOpacity`
  padding: 8px 20px;
  z-index: 1000;
  margin: 10px 0px;
  border-radius: 20;
  align-items: center;
  justify-content: center;
  background-color: white;
  margin-right: -10;
`;

const SmallText = styled.Text`
  color: ${props => props.theme.colors.primaryColor};
  font-size: 16;
  font-weight: 800; 
`;

const ButtonsRow = styled.View`
  flex-direction: row-reverse;
  padding: 5px 20px;
  width: 100%;
  margin-top: 20;
`;

type Props = {
  cepValue: string,
  address: string,
  number: string,
  onChangeAddress: (address: string) => void,
  onChangeNumber: (number: string) => void,
  onChangeCep: (cep: string) => void,
  isVisible: boolean,
  onClose: () => void,
  onConfirm: () => void,
  isLoading: boolean,
};

const ScheduleAddModal = ({
  time,
  talker,
  title,
  onChangeTime,
  onChangeTalker,
  onChangeTitle,
  isVisible,
  onClose,
  onConfirm,
  isLoading,
  modalText,
}: Props) => (
  <Modal isVisible={isVisible}>
    <ModalContent>
      {isLoading
        ? <IsLoadingContainer>
            <Loading />
          </IsLoadingContainer>
        : <View>
            <Body>
              <ScrollView>
                <CloseAction onPress={onClose}>
                  <CloseIcon />
                </CloseAction>
                <ModalText>{modalText}</ModalText>
                <Input
                  mask="[00]:[00]"
                  value={time}
                  placeholder="Time"
                  onChangeText={(cep: string) => onChangeTime(cep)}
                />
                <Input value={title} placeholder="Title" onChangeText={(title: string) => onChangeTitle(title)} />
                <Input value={talker} placeholder="Talker" onChangeText={(talker: string) => onChangeTalker(talker)} />
              </ScrollView>
            </Body>
            <ButtonsRow>
              <CreateButton onPress={onConfirm}>
                <SmallText>Add Item</SmallText>
              </CreateButton>
            </ButtonsRow>
          </View>}
    </ModalContent>
    {Platform.OS === 'ios' && <KeyboardSpacer />}
  </Modal>
);

export default ScheduleAddModal;
