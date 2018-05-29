import { commitMutation, graphql } from 'react-relay';
import Environment from '../../createRelayEnvironment';
import {
  AttendToEventMutationVariables,
  AttendToEventMutationResponse,
} from './__generated__/AttendToEventMutation.graphql';

const mutation = graphql`
  mutation AttendToEventMutation($input: AttendToEventInput!) {
    AttendToEvent(input: $input) {
      message
      error
    }
  }
`;

function commit(
  input: $PropertyType<AttendToEventMutationVariables, 'input'>,
  onCompleted: (response: AttendToEventMutationResponse) => void,
  onError: (error: Object) => void,
): AttendToEventMutationResponse {
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
