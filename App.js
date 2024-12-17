/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Suspense, useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  ActivityIndicator, Pressable
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './views/Login';
import Home from './views/Home';
import Form from './views/Form';
import Geolocation from '@react-native-community/geolocation';

//Geolocation.setRNConfiguration(config);


function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    
    <SafeAreaView style={backgroundStyle}>
      <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do nexto:
           <Text>{""}</Text>
          </Section>
          <LearnMoreLinks />
        </View>
        <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      
    </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AsyncStorage React Native</Text>
      </View>
      <View style={styles.panel}>
        <Text style={styles.label}>Enter your input here:</Text>
        <TextInput
          style={styles.inputField}
          value={input}
          placeholder="Enter"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Text style={styles.text}>Your input is {input}</Text>
        <Pressable onPress={clearStorage} style={styles.button}>
          <Text style={styles.buttonText}>Clear Storage</Text>
        </Pressable>
        <Pressable onPress={() => setCount(count + 1)}>
        <Text>Click me</Text>
      </Pressable>
      </View>
    </View>
      </ScrollView>
      </Suspense>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}


function Section({children, title}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('my-key', value);
    console.warn(value)
  } catch (e) {
    console.warn(e)
    // saving error
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      console.warn(value)
      // value previously stored
    }
  } catch (e) {
    console.warn(e)
    // error reading value
  }
};

const Stack = createNativeStackNavigator();




function App(){
  const isDarkMode = useColorScheme() === 'dark';
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);

  let STORAGE_KEY = '@user_input';


  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, input)
      alert('Data successfully saved')
      readData();
    } catch (e) {
      console.warn(e)
      alert('Failed to save the data to the storage')
    }
  }
  
  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
  
      if (value !== null) {
        setInput(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert('Storage successfully cleared!');
    } catch (e) {
      alert('Failed to clear the async storage.');
    }
  };
  
  const onChangeText = value => setInput(value);
  
  const onSubmitEditing = () => {
    if (!input) return;
  
    saveData(input);
    setInput('');
  };
  //storeData("tu vieja");
  getData();

  useEffect(() => {
    readData();
  }, []); 
  
  

  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' headerMode='none'>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Overview',headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Form" component={Form} options={{ title: 'Formualrio',headerShown: true, gestureEnabled: false, headerStyle: {
            backgroundColor: '#3498db',
          }, headerTintColor: '#fff' }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
