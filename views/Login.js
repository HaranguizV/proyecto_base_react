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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  //varaibles de estado que guardan los datos de inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  //mètodos que guardan cada cambio del input
  const onChangeUsername = value => setUsername(value);
  const onChangePassword = value => setPassword(value);

  //metodo para validar e iniciar sesion
  const logIn = () => {
    setShowLoader(true);
    if (username != 'galleta') {
      Alert.alert('Error!', 'Todo malo');
      setShowLoader(false);
    } else {
      getData();
      Alert.alert(
        'Login Successfuly!',
        'see you in my instagram if you have questions : must_ait6',
      );
      setShowLoader(false);
      
    }
  };

  setLogin = async value => {
    try {
      await AsyncStorage.setItem('Login', value);
      const valueRead = await AsyncStorage.getItem('Login');
      alert('Data successfully saved!', valueRead);
      navigation.navigate('Home');
      console.warn('data', valueRead);
    } catch (e) {
      console.warn(e);
      alert('Failed to save the data to the storage');
    }
  };

  const getData = async () => {
    try {
      const data = await fetch(
        'https://run.mocky.io/v3/0b3fb654-d8a8-47bd-84f3-1fa175c9f19f',
      );
      const parsed = await data.json();
      setLogin(parsed['login']);
      
      console.warn(parsed);
    } catch (e) {
      console.warn(e);
    }
  };

  //elemento que termina de recargar un componente
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    ); // this prevent android back button

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Pantalla login</Text>
        </View>
        <Text style={styles.inputLabel}>Nombre de usuario</Text>
        <View style={styles.textView}>
          <TextInput
            placeholder="Nombre de usuario"
            style={styles.textInput}
            value={username}
            placeholderTextColor={'#C0C0C0'}
            onChangeText={onChangeUsername}></TextInput>
        </View>
        <Text style={styles.inputLabel}>Contraseña</Text>
        <View style={styles.textView}>
          <TextInput
            placeholder="Contraseña"
            value={password}
            style={styles.textInput}
            placeholderTextColor={'#C0C0C0'}
            onChangeText={onChangePassword}
            secureTextEntry={true}></TextInput>
        </View>

        {!showLoader ? <Pressable style={styles.button} onPress={() => logIn()}>
          <Text style={styles.text}>Iniciar Sesión</Text>
        </Pressable> : <ActivityIndicator size="large" />}
      </View>
    </SafeAreaView>
  );
};

//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2874a6',
    alignItems: 'center',
    paddingTop: 130,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
    color: '#FFF',
  },
  inputLabel: {
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 5,
    fontWeight: '400',
    color: '#fff',
    alignSelf: 'flex-start',
  },
  textView: {
    width: 200,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#000',
    height: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop:20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3498db',
  },
});

export default Login;
