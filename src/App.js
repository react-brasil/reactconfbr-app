import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import UserCreate from './UserCreate';
import UserList from './UserList';
import UserDetail from './UserDetail';

const InnerAppRouter = StackNavigator(
  {
    UserCreate: { screen: UserCreate },
    UserList: { screen: UserList },
    UserDetail: { screen: UserDetail },
  },
  {
    initialRouteName: 'UserList',
  },
);

const RelayApp = StackNavigator(
  {
    InnerAppRouter: {
      screen: DrawerNavigator(
        {
          MainApp: {
            screen: InnerAppRouter,
          },
        },
      ),
    },
  },
  {
    headerMode: 'none',
  },
);

export default () => <RelayApp />;
