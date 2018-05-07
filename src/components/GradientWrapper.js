import * as React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

const Wrapper = styled(LinearGradient).attrs({
  colors: props =>
    (props.error ? ['#FF0000', '#FF5959'] : props.theme.colors.gradient),
  start: { x: 0.0, y: 0.25 },
  end: { x: 0.5, y: 1.0 },
})`
  flex: 1;
  padding: 20px;
`;

type Props = {
  children: React.ReactNode,
  error: boolean,
};

const GradientWrapper = ({ children, error }: Props) => (
  <Wrapper error={error}>
    <StatusBar barStyle="light-content" />
    <SafeAreaView />
    {children}
  </Wrapper>
);

export default GradientWrapper;
