import React, { useContext, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../../services/locations/location.context';
import { SearchContainer } from '../screens/restaurant-screen.styles';

const Search = ({ isFavouriteToggle, onFavouriteToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouriteToggle ? 'heart' : 'heart-outline'}
        onIconPress={onFavouriteToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={(text) => setSearchKeyword(text)}
      />
    </SearchContainer>
  );
};

export default Search;
