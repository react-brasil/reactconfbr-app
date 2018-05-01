import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import UserCreate from './UserCreate';
import UserList from './UserList';
import UserDetail from './UserDetail';

const RelayApp = StackNavigator(
  {
    InnerAppRouter: {
      screen: DrawerNavigator(
        {
          UserCreate: { screen: UserCreate },
          UserList: { screen: UserList },
        },
      ),
    },
    UserDetail: { screen: UserDetail },
  },
);

export default () => <RelayApp />;
