/**
 * @flow
 * @relayHash 6b0632a81665766ad7303f80583aba0c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UserDetailQueryResponse = {| |};
*/


/*
query UserDetailQuery(
  $id: ID!
) {
  ...UserDetail_query
}

fragment UserDetail_query on Query {
  user(id: $id) {
    id
    name
    email
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserDetailQuery",
    "selections": [
      {
        "kind": "FragmentSpread",
        "name": "UserDetail_query",
        "args": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UserDetailQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "id",
        "type": "ID!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UserDetailQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id",
            "type": "ID!"
          }
        ],
        "concreteType": "User",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "name",
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "args": null,
            "name": "email",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "query UserDetailQuery(\n  $id: ID!\n) {\n  ...UserDetail_query\n}\n\nfragment UserDetail_query on Query {\n  user(id: $id) {\n    id\n    name\n    email\n  }\n}\n"
};

module.exports = batch;
