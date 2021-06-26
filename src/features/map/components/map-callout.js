import React from 'react';
import { CompactRestaurantInfo } from '../../../components/restaurants/restaurants';

export const MapCallout = ({ restaurant }) => (
  <CompactRestaurantInfo isMap restaurant={restaurant} />
);
