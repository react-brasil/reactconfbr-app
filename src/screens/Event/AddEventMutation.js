import { commitMutation, graphql } from 'react-relay';
import Environment from '../../createRelayEnvironment';
import {
  AddEventMutationVariables,
  AddEventMutationResponse,
} from './__generated__/AddEventMutation.graphql';

const mutation = graphql`
  mutation AddEventMutation($input: RegisterEmailInput!) {
    AddEvent(input: $input) {
      error
      token
    }
  }
`;

function commit(
  input: $PropertyType<AddEventMutationVariables, 'input'>,
  onCompleted: (response: AddEventMutationResponse) => void,
  onError: (error: Object) => void
): AddEventMutationResponse {
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
