import { commitMutation, graphql } from 'react-relay';
import Environment from '../../createRelayEnvironment';
import {
  EventAddMutationVariables,
  EventAddMutationResponse,
} from './__generated__/EventAddMutation.graphql';

const mutation = graphql`
  mutation EventAddMutation($input: EventAddInput!) {
    EventAdd(input: $input) {
      event {
        title
      }
    }
  }
`;

function commit(
  input: $PropertyType<EventAddMutationVariables, 'input'>,
  onCompleted: (response: EventAddMutationResponse) => void,
  onError: (error: Object) => void
): EventAddMutationResponse {
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
