import React, { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import AccountNavigator from './accountNavigator';
import { AppNavigator } from './app.navigator';

import { NavigationContainer } from '@react-navigation/native';
const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
