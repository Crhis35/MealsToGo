import React from 'react';
import { SvgXml } from 'react-native-svg';

import Star from '../../../../assets/start';
import Open from '../../../../assets/open';
import { Spacer } from '../../../components/spacer/spacer';
import { Text } from '../../../components/typography/typography';
import {
  Address,
  Info,
  Rating,
  RestaurantCard,
  RestaurantCardCover,
  SectionEnd,
  Section,
  Icon,
} from './restauran-info.styles';
import Favourite from '../../../components/favourite/favourite';

const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon,
    photos = [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg',
    ],
    placedId,
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, idx) => (
              <SvgXml
                key={`start-${placedId}-${idx}`}
                xml={Star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large" />
            {isOpenNow && <SvgXml xml={Open} width={20} height={20} />}
            <Spacer position="left" size="large" />
            <Icon source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};

export default RestaurantInfoCard;
