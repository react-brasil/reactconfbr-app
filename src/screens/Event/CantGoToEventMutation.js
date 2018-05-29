import { commitMutation, graphql } from 'react-relay';
import Environment from '../../createRelayEnvironment';
import {
  CantGoToEventMutationVariables,
  CantGoToEventMutationResponse,
} from './__generated__/CantGoToEventMutation.graphql';

const mutation = graphql`
  mutation CantGoToEventMutation($input: CantGoToEventInput!) {
    CantGoToEvent(input: $input) {
      message
      error
    }
  }
`;

function commit(
  input: $PropertyType<CantGoToEventMutationVariables, 'input'>,
  onCompleted: (response: CantGoToEventMutationResponse) => void,
  onError: (error: Object) => void,
): CantGoToEventMutationResponse {
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
