import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './utils/design/theme';
import { RelayApp } from './navigation/Router';

const ThemedApp = () => (
  <ThemeProvider theme={theme}><RelayApp /></ThemeProvider>
);

export default () => <ThemedApp />;
