import React, {memo} from 'react';
import {FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {navigate} from '../../navigators/utils';

const SubBreed = ({breed, subBreed}) => {
  return (
    <FlatList
      keyExtractor={item => item.toString()}
      data={subBreed}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={'unique_key_' + index}
          onPress={() => navigate('DogDetails', {breed, subBreed: item})}>
          <Text style={styles.subBreedText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default memo(SubBreed);

const styles = StyleSheet.create({
  subBreedText: {textAlign: 'center', color: 'blue'},
});
