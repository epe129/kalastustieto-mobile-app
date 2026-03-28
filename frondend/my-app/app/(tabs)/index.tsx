import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TextInput, StyleSheet, FlatList, ImageBackground} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Image } from 'expo-image';

const image = require('../../assets/images/tausta.jpg');

export default function HomeScreen() {
  const [paino_mukaan, setPainot_mukaan] = useState<string[]>([]);
  const [pituus_mukaan, setPituus_mukaan] = useState<string[]>([]);
  const [maara_mukaan, setMaara_mukaan] = useState<string[]>([]);
  const [viehella_mukaan, setViehella_mukaan] = useState<string[]>([]);
  
  const [visible_paino, setVisible_paino] = useState(false); 
  const [visible_pituus, setVisible_pituus] = useState(false); 
  const [visible_maara, setVisible_maara] = useState(false); 
  const [visible_viehella, setVisible_viehella] = useState(false); 

  const getData = async () => {
    fetch('http://10.0.2.2:5000/paino')
      .then(response => response.json())
      .then(json => {
        setPainot_mukaan(Array.isArray(json.data) ? json.data : []);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/pituus')
      .then(response => response.json())
      .then(json => {
        setPituus_mukaan(Array.isArray(json.data) ? json.data : []);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/maara')
      .then(response => response.json())
      .then(json => {
        setMaara_mukaan(Array.isArray(json.data) ? json.data : []);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://10.0.2.2:5000/viehella')
      .then(response => response.json())
      .then(json => {
        setViehella_mukaan(Array.isArray(json.data) ? json.data : []);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const startSlideshow = () => {
    setTimeout(() => {
      setVisible_paino(true)

      setVisible_viehella(false)
      setVisible_pituus(false)
      setVisible_maara(false)
    }, 0);

    setTimeout(() => {
      setVisible_pituus(true)
      
      setVisible_viehella(false)
      setVisible_paino(false)
      setVisible_maara(false)
    }, 5000);

    setTimeout(() => {
      setVisible_maara(true)

      setVisible_viehella(false)
      setVisible_paino(false)
      setVisible_pituus(false)
    }, 10000);

    setTimeout(() => {
      setVisible_viehella(true)

      setVisible_paino(false)
      setVisible_pituus(false)
      setVisible_maara(false)
    }, 15000);

    
    setTimeout(() => {
      setVisible_viehella(false)
      setVisible_paino(false)
      setVisible_pituus(false)
      setVisible_maara(false)
      startSlideshow();
    }, 20000);

  };


  useEffect(() => {
    getData();
    startSlideshow();
  }, []);
  
  console.log(paino_mukaan[0]);

  const fishImages: {[key: string]: any} = {
    hauki: require('../../assets/images/hauki.jpg'),
    // ahven: require('../../assets/images/ahven.jpg'),
    siika: require('../../assets/images/siika.jpg'),
    // add all your fish here
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.main}>
            <Text style={styles.text}>Kalastustieto mobile app</Text>
            <View style={{marginTop: 50, backgroundColor: '#000000c0' }}>
              {visible_paino ? <View><Text style={styles.Titletext}>Kalat painon mukaan: {"\n" + paino_mukaan.map((item: string) => item).join('\n')}</Text>
                {paino_mukaan.length > 0 && fishImages[paino_mukaan[0][0] ] ? (
                  <Image source={fishImages[paino_mukaan[0][0]]} style={styles.imageFish} />
                ) : (
                  <Text style={styles.text}>Kuva ei näy</Text>
                )} 
              
              </View>  : null}
              
              {visible_pituus ? <View><Text style={styles.Titletext}>Kalat pituuden mukaan: {"\n" + pituus_mukaan.map((item: string) => item).join('\n')}</Text>
                  {paino_mukaan.length > 0 && fishImages[paino_mukaan[0][0] ] ? (
                    <Image source={fishImages[paino_mukaan[0][0]]} style={styles.imageFish} />
                  ) : (
                    <Text style={styles.text}>Kuva ei näy</Text>
                  )}
              
              </View>  : null}
              
              {visible_maara ? <View><Text style={styles.Titletext}>Kalalajien saanti määrät: {"\n" + maara_mukaan.map((item: string) => item).join('\n')}</Text>
                          {maara_mukaan.length > 0 && fishImages[maara_mukaan[0][0]] ? (
                <Image source={fishImages[maara_mukaan[0][0]]} style={styles.imageFish} />
              ) : (
                <Text style={styles.text}>Kuva ei näy</Text>
              )} 
              
              </View>  : null}
              
              {visible_viehella ? <View><Text style={styles.Titletext}>Kalalajien saanti määrät eri vieheillä: {"\n" + viehella_mukaan.map((item: string) => item).join('\n')}</Text>
                          {viehella_mukaan.length > 0 && fishImages[viehella_mukaan[0][0]] ? (
                <Image source={fishImages[viehella_mukaan[0][0]]} style={styles.imageFish} />
              ) : (
                <Text style={styles.text}>Kuva ei näy</Text>
              )} 
              
              </View>  : null}
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  main: {
    marginTop: 0,
    marginBottom: 200,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageFish: {
    borderRadius: 10,
    marginLeft: 20,
    width: 150,
    height: 40, 
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