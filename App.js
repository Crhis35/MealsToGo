import React from 'react';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { RestaurantsContextProvider } from './src/services/restaurants/restaurants.context';
import { LocationContextProvider } from './src/services/locations/location.context';
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context';
import Navigation from './src/infrastructure/navigation';

const firebaseConfig = {
  apiKey: 'AIzaSyB-srCyMXlqFIgNgo6x_pdmi-sXbnW2cWs',
  authDomain: 'mealstogo-55b3e.firebaseapp.com',
  projectId: 'mealstogo-55b3e',
  storageBucket: 'mealstogo-55b3e.appspot.com',
  messagingSenderId: '703018481411',
  appId: '1:703018481411:web:ab8de42f8edda1089b9b36',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const App = () => {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
                <ExpoStatusBar style="auto" />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};
export default App;
