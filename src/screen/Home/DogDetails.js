import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {getDogBreedImages, getDogSubBreedImages} from '../../api/dog';

const DogDetails = ({route}) => {
  const [breedImages, setBreedImages] = useState([]);
  const [imagesSubSet, setImagesSubSet] = useState([]);
  const [count, setCount] = useState(10);

  const handleGetBreedImages = async () => {
    try {
      const images = route?.params?.subBreed
        ? await getDogSubBreedImages(
            route?.params?.breed,
            route?.params?.subBreed,
          )
        : await getDogBreedImages(route?.params?.breed);

      setBreedImages(images);
      setImagesSubSet(images.slice(0, count));
      setCount(count + 10);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetBreedImages();
  }, [route?.params?.breed]);

  return (
    <FlatList
      data={imagesSubSet}
      onEndReached={() => {
        setImagesSubSet(breedImages.slice(0, count));
        setCount(count + 10);
      }}
      renderItem={({item}) => (
        <View style={styles.imageContainer}>
          <Image source={{uri: item}} style={styles.image} />
          <Text style={styles.breedName}>
            {route?.params?.subBreed ?? route?.params?.breed}
          </Text>
        </View>
      )}
    />
  );
};

export default DogDetails;

const styles = StyleSheet.create({
  imageContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {width: '100%', height: 400, resizeMode: 'cover'},
  breedName: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 34,
    textTransform: 'capitalize',
  },
});
