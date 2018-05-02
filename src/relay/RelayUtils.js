// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';

import type { GraphQLTaggedNode, Variables } from 'react-relay';

import { QueryRenderer } from 'react-relay';

import environment from './environment';

type Config = {
  query: ?GraphQLTaggedNode,
  queriesParams?: ?(props: Object) => Object,
  variables?: Variables,
};

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<*>,
  Component: React.ComponentType<*>,
  config: Config,
  LoadingView: React.ComponentType<*>,
  ErrorView: React.ComponentType<*>
): React.ComponentType<*> {
  const { query, queriesParams } = config;

  class QueryRendererWrapper extends React.Component<{}> {
    render() {
      const variables = queriesParams
        ? queriesParams(this.props)
        : config.variables;

      return (
        <QueryRenderer
          environment={environment}
          query={query}
          variables={variables}
          render={({ error, props, retry }) => {
            if (error) {
              return <ErrorView error={error} retry={retry} />;
            }

            if (props) {
              return <FragmentComponent {...this.props} query={props} />;
            }

            return <LoadingView />;
          }}
        />
      );
    }
  }

  return hoistStatics(QueryRendererWrapper, Component);
}
