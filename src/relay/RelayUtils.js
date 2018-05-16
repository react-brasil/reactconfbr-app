// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { View, Text } from 'react-native';
import type { GraphQLTaggedNode, Variables } from 'react-relay';

import { QueryRenderer } from 'react-relay';

import environment from '../createRelayEnvironment';

type Config = {
  query: ?GraphQLTaggedNode,
  queriesParams?: ?(props: Object) => Object,
  variables?: Variables,
};


export default function createQueryRenderer(
  FragmentComponent,
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
            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            if (error) {
              return (
                <View>
                  <Text>{error}</Text>
                </View>
              );
            }
            return (
              <View>
                <Text>Loading...</Text>
              </View>
            );
          }}
        />
      );
    }
  }

  return QueryRendererWrapper;
}
