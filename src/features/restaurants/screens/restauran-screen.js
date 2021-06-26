import React, { useContext, useState } from 'react';

// import { ActivityIndicator } from 'react-native';

import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import RestaurantInfoCard from '../components/restauran-info';
import { RestaurantList } from './restaurant-screen.styles';
import { Spacer } from '../../../components/spacer/spacer';
import { SafeArea } from '../../../components/utility/safearea';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import styled from 'styled-components';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Search from '../components/search';
import { TouchableOpacity } from 'react-native';
import FavouriteBar from '../../../components/favourite/favourite-bar';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import { FadeInView } from '../../../components/animations/fade.animation';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const RestaurantScreen = ({ navigation }) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  return (
    <>
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        )}
        <Search
          isFavouriteToggle={isToggled}
          onFavouriteToggle={() => setIsToggled(!isToggled)}
        />
        {isToggled && (
          <FavouriteBar favourites={favourites} onNavigate={navigation} />
        )}
        <RestaurantList
          data={restaurants}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant: item })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <RestaurantInfoCard restaurant={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          )}
          keyExtractor={(_, idx) => idx.toString()}
        />
      </SafeArea>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default RestaurantScreen;
