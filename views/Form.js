import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  BackHandler,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  launchCamera as _launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

let launchCamera = _launchCamera;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

handleCameraLaunch = (setSelectedImage, selectedImage) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
      console.warn(selectedImage);
    }
  });
};

const Form = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textView}>
          <Text style={styles.inputLabel}>Texto</Text>
          <TextInput
            placeholder="Rellene el texto"
            style={styles.textInput}
            editable
            value={''}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={'#C0C0C0'}
            onChangeText={() => {}}></TextInput>
        </View>
        <View style={styles.textView}>
          <Text style={styles.inputLabel}>Dropdown</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Seleccione un item"
            style={{width: windowWidth - 20}}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.inputLabel}>TextArea</Text>
          <TextInput
            placeholder="Rellene el textarea"
            style={styles.textArea}
            editable
            value={''}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={'#C0C0C0'}
            onChangeText={() => {}}></TextInput>
        </View>
        <View style={styles.textView}>
          <Text style={styles.inputLabel}>Fotos</Text>
          <Pressable
            style={styles.button}
            onPress={() => handleCameraLaunch(setSelectedImage, selectedImage)}>
            <Text style={styles.text}>Tomar una foto</Text>
          </Pressable>
          {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{
            width: 107,
            height: 100,
            padding: 10
          }}
          //resizeMode="contain"
        />
      )}
        </View>
      </View>
    </SafeAreaView>
  );
};

//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'flex-start',
    verticalAlign: 'top',
    paddingTop: 0,
  },
  contentContainer: {
    marginLeft:10
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FD0139',
  },
  inputLabel: {
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: '400',
    color: '#fff',
    alignSelf: 'flex-start',
    width: 500,
  },
  textView: {
    width: 200,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
    borderColor: '#000',
    borderRadius: 3,
    borderWidth: 1,
    width: windowWidth - 20,
  },
  textArea: {
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
    borderColor: '#000',
    borderRadius: 3,
    borderWidth: 1,
    height: 150,
    textAlignVertical: 'top',
    width: windowWidth - 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  inputLabel: {
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: '400',
    color: '#000',
    alignSelf: 'flex-start',
  },
});

export default Form;
