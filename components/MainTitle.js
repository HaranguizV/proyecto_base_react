import React from 'react';
import {View, Text, StyleSheet,} from 'react-native';

export default class CustomText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hola, {this.props.title}</Text>
        <Text style={styles.subTitle}>Estas son tus tareas de hoy:</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    //marginTop: StatusBar.currentHeight || 0,
  },
  flatList: {
    flex: 0.8,
  },
  titleContainer: {
    flex: 0.2,
    color: '#000',
    
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#000',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 20,
    color: '#000',
    alignItems: 'center',
  },
});