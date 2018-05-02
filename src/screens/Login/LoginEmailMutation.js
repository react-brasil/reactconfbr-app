import { commitMutation, graphql } from 'react-relay';
import env from '../../createRelayEnvironment';
import {
  LoginEmailMutationVariables,
  LoginEmailMutationResponse,
} from './__generated__/LoginEmailMutation.graphql';

const mutation = graphql`
  mutation LoginEmailMutation($input: LoginEmailInput!) {
    LoginEmail(input: $input) {
      error
      token
    }
  }
`;

function commit(
  input: $PropertyType<LoginEmailMutationVariables, 'input'>,
  onCompleted: (response: LoginEmailMutationResponse) => void,
  onError: (error: Object) => void
): LoginEmailMutationResponse {
  return commitMutation(env, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default { commit };
