import React, { useState, createContext, useEffect, useContext } from 'react';
import { LocationContext } from '../locations/location.context';

import {
  restaurantsRequest,
  restaurantsTransform,
} from './resturants.services';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);
  const retrieveRestaurants = (loc) => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(async () => {
      try {
        const data = await restaurantsRequest(loc);
        const results = await restaurantsTransform(data);
        setRestaurants(results);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };
  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
