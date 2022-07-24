import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddPhoto = ({handleCameraAccess}) => {
  return (
    <TouchableOpacity onPress={handleCameraAccess} style={styles.addButton}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

export default AddPhoto;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  addButtonText: {fontSize: 40, color: 'white', alignSelf: 'center'},
});
