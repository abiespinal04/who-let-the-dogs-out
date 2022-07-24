import axios from 'axios';

export const fetchAllDogs = async () => {
  try {
    const {data} = await axios.get('https://dog.ceo/api/breeds/list/all');

    return data?.message;
  } catch (error) {
    throw error;
  }
};

export const getDogBreedImages = async breed => {
  try {
    const {data} = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);

    return data?.message;
  } catch (error) {
    throw error;
  }
};

export const getDogSubBreedImages = async (breed, subBreed) => {
  try {
    const {data} = await axios.get(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images`,
    );

    return data?.message;
  } catch (error) {
    throw error;
  }
};
