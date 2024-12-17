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
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      data: props.data,
      navigation: props.navigation,
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    console.warn("DATA:", this.state.data)
    return (
        <FlatList
        data={this.state.data}
        renderItem={({item}) => {<View style={styles.item}>
        <Pressable onPress={() => {this.state.navigation.navigate('Form');}}>
        <Text style={styles.title}>{"nada"}</Text>
        </Pressable>
      </View>}}
        keyExtractor={item => item.id}
      />
    );
  }
  
}
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
      alignItems:'center',
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
      color:'#000'
    },
  });