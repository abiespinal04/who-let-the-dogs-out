export const fetchAllDogs = async () => {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all', {
      method: 'GET',
    });

    if (res.status !== 200) {
      throw 'Sorry, something went wrong!';
    }

    const jRes = await res.json();
    return jRes?.message;
  } catch (error) {
    throw error;
  }
};

export const getDogBreedImages = async breed => {
  try {
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`, {
      method: 'GET',
    });

    if (res.status !== 200) {
      throw 'Sorry, something went wrong!';
    }

    const jRes = await res.json();
    return jRes?.message;
  } catch (error) {
    throw error;
  }
};

export const getDogSubBreedImages = async (breed, subBreed) => {
  try {
    const res = await fetch(
      `https://dog.ceo/api/breed/${breed}/${subBreed}/images`,
      {
        method: 'GET',
      },
    );

    if (res.status !== 200) {
      throw 'Sorry, something went wrong!';
    }

    const jRes = await res.json();
    return jRes?.message;
  } catch (error) {
    throw error;
  }
};
