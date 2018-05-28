// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { GraphQLTaggedNode, Variables } from 'react-relay';
import styled from 'styled-components/native';
import { QueryRenderer } from 'react-relay';
import environment from '../createRelayEnvironment';

const Wrapper = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;

const Loading = styled.ActivityIndicator.attrs({
  color: 'black',
  animating: true,
})``;

const ErrorText = styled.Text`
  font-size: 18px;
  color: black;
  margin-bottom: 10;
`;

const RetryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.primaryColor};
  border-radius: 20;
  padding: 10px 20px;
`;

const RetryText = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 18;
`;

type Config = {
  query: ?GraphQLTaggedNode,
  queriesParams?: ?(props: Object) => Object,
  variables?: Variables,
};

export function createQueryRenderer(
  FragmentComponent: React.ComponentType<{}>,
  Component: React.ComponentType<{}>,
  config: Config,
): React.ComponentType<*> {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams ? queriesParams(this.props) : config.variables;

      return (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={variables}
          render={({ error, props, retry }) => {
            if (error) {
              return (
                <Wrapper>
                  <ErrorText>Please check your internet connection</ErrorText>
                  <RetryButton onPress={retry}>
                    <RetryText>Retry</RetryText>
                  </RetryButton>
                </Wrapper>
              );
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return (
              <Wrapper>
                <Loading />
              </Wrapper>
            );
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}
