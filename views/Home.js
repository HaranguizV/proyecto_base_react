import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MainTitle from '../components/MainTitle';
import ItemList from '../components/ItemList';

import Geolocation from '@react-native-community/geolocation';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


//Ir al formulario, verificando antes que la ubicación esté disponible
const goToForm = (navigation) => {

      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          navigation.navigate('Form');
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          if (error.code == 1) {
            Alert.alert(
              'Habilitar permisos','Por favor, habilita los permisos de la aplicación para acceder a la ubicación.',
            );
          } else if (error.code == 2){
            Alert.alert(
              'GPS Apagado','Por favor, enciende el GPS de tu teléfono para acceder a la ubicación.',
            );
          }
          else{
            Alert.alert(
              'Se ha detectado un error. Inténtalo de nuevo más tarde.',
            );
          }
        },
      );
};

const Item = ({title, navigation}) => (
  <View style={styles.item}>
    <Pressable
      onPress={() => {
        goToForm(navigation);
      }}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  </View>
);

const getData = async () => {
  try {
    const data = await fetch(
      'https://run.mocky.io/v3/48fe2459-b7b9-4b2f-b1d1-144bc12d1d6d',
    );
    const parsed = await data.json();
    console.warn(parsed);
  } catch (e) {
    console.warn(e);
  }
};

const Home = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState(false);
  const onChangeUsername = value => {
    setUsername(value);
  };

  const getLoginData = async () => {
    const valueRead = await AsyncStorage.getItem('Login');
    onChangeUsername(valueRead);
    console.warn(valueRead);
  };

  getLoginData();
  //getData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <MainTitle title={username.toString()} />
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item title={item.title} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  flatList: {
    flex: 0.8,
  },
  titleContainer: {
    flex: 0.2,
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    color: '#000',
  },
});

export default Home;
