/**
 * @flow
 * @relayHash 12bb476b5bdc941bae04120569f8a0c5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RegisterEmailMutationVariables = {|
  input: {
    name: string;
    email: string;
    password: string;
    clientMutationId?: ?string;
  };
|};
export type RegisterEmailMutationResponse = {|
  +RegisterEmail: ?{|
    +error: ?string;
    +token: ?string;
  |};
|};
*/


/*
mutation RegisterEmailMutation(
  $input: RegisterEmailInput!
) {
  RegisterEmail(input: $input) {
    error
    token
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RegisterEmailInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterEmailMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RegisterEmailInput!"
          }
        ],
        "concreteType": "RegisterEmailPayload",
        "name": "RegisterEmail",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "error",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "RegisterEmailMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RegisterEmailInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "RegisterEmailMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RegisterEmailInput!"
          }
        ],
        "concreteType": "RegisterEmailPayload",
        "name": "RegisterEmail",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "error",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "token",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation RegisterEmailMutation(\n  $input: RegisterEmailInput!\n) {\n  RegisterEmail(input: $input) {\n    error\n    token\n  }\n}\n"
};

module.exports = batch;
