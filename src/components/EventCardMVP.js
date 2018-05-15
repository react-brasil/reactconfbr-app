import * as React from 'react';
import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Wrapper = styled(LinearGradient).attrs({
  colors: props => props.theme.colors.gradient,
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
})`
  margin-horizontal: 20;
  margin-top: 20;
  overflow: hidden;
  border-radius: 20;
  ${Platform.select({ ios: css`
      shadow-color: grey;
      shadow-offset: 0px 0px;
      shadow-radius: 2px;
      shadow-opacity: 2px;`, android: css`
        elevation: 5;
  ` })};
`;

const CardOpacity = styled.View`
  flex-direction: column;
  padding: 22px 15px;
  border-radius: 20;
  background-color: rgba(0, 0, 0, 0.4);
`;

const CardDescription = styled.Text`
  font-size: 14;
  color: white;
  font-weight: bold;
  background-color: transparent;
  margin-bottom: 5;
  margin-left: 5;
`;

const CardTitle = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: white;
  margin-bottom: 5;
  margin-left: 5;
  background-color: transparent;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const TextContainer = styled.View`
  flex: 3;
  flex-direction: column
`;

const ReadButton = styled.TouchableOpacity`
  padding-vertical: 5;
  padding-horizontal: 20;
  align-items: center;
  justify-content: center;
  border-radius: 20;
  background-color: white;
`;

const ButtonText = styled.Text`
  font-size: 15;
  font-weight: 800;
  color: #4f4e4e;
`;


const Atendees = styled.View`
  margin-left: 10;  
  flex-direction: row;
  align-items: center;
`;

const AtendeesNumber = styled.View`
  padding-vertical: 5;
  padding-horizontal: 15;
  align-items: center;
  justify-content: center;
  border-radius: 20;
  background-color: white;
`;

const AtendeesNumberText = styled.Text`
  font-size: 15;
  color: black;
`;

const getInitials = (name: string) => {
  return name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(namePart => namePart.charAt(0).toUpperCase())
        .join('')
    : '';
};

type User = {
  image: string,
  name: string,
};

type Props = {
  atendees: Array<User>,
  title: string,
  description: string,
  bgImage: string,
  seeButtonAction: () => void,
};

const EventCard = ({
  title,
  description,
  publicLimit,
  seeButtonAction,

}: Props) => {

  return (
    <Wrapper>
      <CardOpacity>
        <Row>
          <TextContainer>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <Atendees>
              <AtendeesNumber>
                <AtendeesNumberText>{publicLimit}</AtendeesNumberText>
              </AtendeesNumber>
            </Atendees>
          </TextContainer>
          <ButtonContainer>
            <ReadButton onPress={seeButtonAction}>
              <ButtonText>SEE</ButtonText>
            </ReadButton>
          </ButtonContainer>
        </Row>
      </CardOpacity>
    </Wrapper>
  );
};

export default EventCard;
