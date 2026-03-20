import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TextInput, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const image = require('../../assets/images/kuva.png');

export default function HomeScreen() {
  const [paino_mukaan, setPainot_mukaan] = useState();
  const [pituus_mukaan, setPituus_mukaan] = useState();
  const [maara_mukaan, setMaara_mukaan] = useState();
  const [viehella_mukaan, setViehella_mukaan] = useState();

  const getData = async () => {
    fetch('http://10.0.2.2:5000/paino')
      .then(response => response.json())
      .then(json => {
        setPainot_mukaan(json.data.join('\n').replace(/,/g, ', '));
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/pituus')
      .then(response => response.json())
      .then(json => {
        setPituus_mukaan(json.data.join('\n').replace(/,/g, ', '));
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/maara')
      .then(response => response.json())
      .then(json => {
        setMaara_mukaan(json.data.join('\n').replace(/,/g, ', '));
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/viehella')
      .then(response => response.json())
      .then(json => {
        setViehella_mukaan(json.data.join('\n').replace(/,/g, ' '));
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.text}>Kalastustieto mobile app</Text>
          {/* <View style={{ borderBottomColor: 'black', marginTop: 20, borderBottomWidth: StyleSheet.hairlineWidth }}/> */}
          <View style={{marginTop: 20, backgroundColor: '#000000c0' }}>
            <Text style={styles.Titletext}>Kalat painon mukaan:</Text>
            <Text style={styles.Thetext}>{paino_mukaan}</Text>
          </View>
          {/* <View style={{ borderBottomColor: 'black', marginTop: 20, borderBottomWidth: StyleSheet.hairlineWidth }}/> */}
          <View style={{marginTop: 20, backgroundColor: '#000000c0'}}>
            <Text style={styles.Titletext}>Kalat pituuden mukaan:</Text>
            <Text style={styles.Thetext}>{pituus_mukaan}</Text>
          </View>
          {/* <View style={{ borderBottomColor: 'black', marginTop: 20, borderBottomWidth: StyleSheet.hairlineWidth }}/> */}
          <View style={{marginTop: 20, backgroundColor: '#000000c0'}}>
            <Text style={styles.Titletext}>Kalalajien saanti määrät:</Text>
            <Text style={styles.Thetext}>{maara_mukaan}</Text>
          </View>
          {/* <View style={{ borderBottomColor: 'black', marginTop: 20, borderBottomWidth: StyleSheet.hairlineWidth }}/> */}
          <View style={{marginTop: 20, backgroundColor: '#000000c0'}}>
            <Text style={styles.Titletext}>Kalalajien saanti määrät eri vieheillä:</Text>
            <Text style={styles.Thetext}>{viehella_mukaan}</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 10,
    color: 'white', 
    backgroundColor: '#000000c0'
  },
  Titletext: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingBottom: 20,
    color: 'white'
  },
  Thetext: {
    fontSize: 24,
    paddingLeft: 22,
    color: 'white'
  },

});