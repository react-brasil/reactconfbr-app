import * as React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '../utils/design/images';
import * as Btn from './Button';

const Wrapper = styled(LinearGradient).attrs({
  colors: ['#53B1FF', '#651FFF'],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 },
})`
  flex-direction: column;
  justify-content: center;
  padding-top: 36px;
  padding-horizontal: 18;
  padding-bottom: 20;
`;

const PillsContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  flex-direction: row;
  ${/* justify-content: space-around;
  align-items: center; */ ''}
  margin-horizontal: -6;
  margin-top: 18;
`;

const Pill = styled.TouchableOpacity`
  padding: 6px 18px;
  align-items: center;
  border-radius: 20px;
  border: 2px solid ${props => props.theme.colors.secondaryColor};
  margin-right: 10;
`;

const PillLabel = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: #ffffff;
`;

const Title = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: #ffffff;
`;

const TitleAndIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.TextInput.attrs({
  autoCapitalize: false,
  autoCorrect: false,
  autoFocus: true,
  placeholderTextColor: '#fff',
  underlineColorAndroid: 'transparent',
  placeholder: 'Search here...',
})`
  font-size: 30;
  font-weight: bold;
  color: #FFF;
  width: 280;
`;

const Icon = styled.Image.attrs({
  source: props => (props.visible ? IMAGES.CLOSE : IMAGES.SEARCH),
})`
  width: ${props => (props.visible ? 26 : 31)};
  height: ${props => (props.visible ? 26 : 31)};
  tint-color: white;
`;

const Button = styled.TouchableOpacity`
  width: 31;
  height: 31;
  align-items: center;
  justify-content: center;
`;

type Pills = {
  routeTitle: string,
  routeAction: () => void,
};

type Props = {
  title: string,
  searchValue: string,
  onChangeSearch: (search: string) => void,
  showSearch: () => void,
  IsSearchVisible: boolean,
  pills: Array<Pills>,
};

const LoggedHeader = ({
  title,
  searchValue,
  onChangeSearch,
  showSearch,
  IsSearchVisible,
}: Props) => (
  <Wrapper>
    <SafeAreaView />
    <TitleAndIcon>
      {!IsSearchVisible
        ? <Title>{title}</Title>
        : <SearchInput
            value={searchValue}
            onChangeSearch={search => onChangeSearch(search)}
          />}
      <Button onPress={showSearch}>
        <Icon visible={IsSearchVisible} />
      </Button>
    </TitleAndIcon>
    <PillsContainer horizontal>
      <Pill>
        <PillLabel>Date - 29/01/1998</PillLabel>
      </Pill>
      <Pill>
        <PillLabel>Range - 20km</PillLabel>
      </Pill>
      <Pill>
        <PillLabel>Address</PillLabel>
      </Pill>
    </PillsContainer>
  </Wrapper>
);

export default LoggedHeader;
