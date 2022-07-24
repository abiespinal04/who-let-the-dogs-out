import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {fetchAllDogs} from '../../api/dog';
import {navigate} from '../../navigators/utils';
import SubBreed from './SubBreed';

const {StatusBarManager} = NativeModules;

const STATUS_BAR_HEIGHT = StatusBarManager.HEIGHT;
const HEIGHT = Dimensions.get('window').height - STATUS_BAR_HEIGHT * 2;

const searchBreed = (dogs, value) => {
  return dogs.filter(
    i =>
      i[0]?.toLowerCase() === value?.toLowerCase() ||
      searchSubBreed(i[1], value)?.length,
  );
};

const searchSubBreed = (dogs, value) => {
  return dogs.filter(i => i?.toLowerCase() === value?.toLowerCase());
};

const Home = () => {
  const [dogs, setDogs] = useState([]);
  const [searchedDogs, setSearchDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchDogs = async () => {
    try {
      setIsLoading(true);
      const allDogs = await fetchAllDogs();
      setDogs(Object.entries(allDogs));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleSearch = value => {
    if (!dogs) return;

    const breeds = searchBreed(dogs, value);

    if (!breeds?.length) {
      setSearchDogs([]);
      return;
    }

    setSearchDogs(breeds);
  };

  return (
    <View>
      <TextInput
        onChangeText={handleSearch}
        placeholder="Search breed"
        style={styles.searchBox}
      />
      <FlatList
        style={styles.container}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            {isLoading ? (
              <ActivityIndicator color={'black'} />
            ) : (
              <TouchableOpacity
                onPress={handleFetchDogs}
                style={styles.fetchDogsButton}>
                <Text style={styles.fetchDogsButtonText}>
                  Who Let the Dogs Out?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
        keyExtractor={item => item.toString()}
        data={searchedDogs?.length ? searchedDogs : dogs}
        renderItem={({item, index}) => {
          return (
            <View key={'unique_key_' + index} style={styles.breedContainer}>
              <TouchableOpacity
                onPress={() => navigate('DogDetails', {breed: item[0]})}
                style={styles.mainBreedButton}>
                <Text style={styles.breedText}>{item[0]}</Text>
              </TouchableOpacity>
              <SubBreed breed={item[0]} subBreed={item[1]} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
  mainBreedButton: {
    alignItems: 'center',
    marginVertical: 2.5,
  },
  breedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  breedText: {fontWeight: '400', fontSize: 20},
  listEmptyContainer: {
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fetchDogsButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
  },
  fetchDogsButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  searchBox: {height: 40, paddingLeft: 20},
});
