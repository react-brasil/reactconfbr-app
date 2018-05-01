import { commitMutation, graphql } from 'react-relay';
import Environment from '../../createRelayEnvironment';
import {
  RegisterEmailMutationVariables,
  RegisterEmailMutationResponse,
} from './__generated__/RegisterEmailMutation.graphql';

const mutation = graphql`
  mutation RegisterEmailMutation($input: RegisterEmailInput!) {
    RegisterEmail(input: $input) {
      error
      token
    }
  }
`;

function commit(
  input: $PropertyType<RegisterEmailMutationVariables, 'input'>,
  onCompleted: (response: RegisterEmailMutationResponse) => void,
  onError: (error: Object) => void
): RegisterEmailMutationResponse {
  return commitMutation(Environment, {
    mutation,
    variables: {
      input,
    },
    onCompleted,
    onError,
  });
}

export default { commit };
