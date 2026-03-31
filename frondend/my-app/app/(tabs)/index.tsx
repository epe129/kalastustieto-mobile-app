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
  
  const fishImages: {[key: string]: any} = {
    hauki: require('../../assets/images/hauki.jpg'),
    siika: require('../../assets/images/siika.jpg'),
    harjus: require('../../assets/images/harjus.jpg'),
    jokirapu: require('../../assets/images/jokirapu.jpg'),
    kiiski: require('../../assets/images/kiiski.jpg'),
    kirjolohi: require('../../assets/images/kirjolohi.jpg'),
    kolmipiikki: require('../../assets/images/kolmipiikki.jpg'),
    kuha: require('../../assets/images/kuha.jpg'),
    kuore: require('../../assets/images/kuore.jpg'),
    lahna: require('../../assets/images/lahna.jpg'),
    lohi: require('../../assets/images/lohi.jpg'),
    made: require('../../assets/images/made.jpg'),
    muikku: require('../../assets/images/muikku.jpg'),
    pasuri: require('../../assets/images/pasuri.jpg'),
    rautu: require('../../assets/images/rautu.jpg'),
    ruutana: require('../../assets/images/ruutana.jpg'),
    salakka: require('../../assets/images/salakka.jpg'),
    särki: require('../../assets/images/särki.jpg'),
    säyne: require('../../assets/images/säyne.jpg'),
    silakka: require('../../assets/images/silakka.jpg'),
    sorva: require('../../assets/images/sorva.jpg'),
    suutari: require('../../assets/images/suutari.jpg'),
    taimen: require('../../assets/images/taimen.jpg'),
    täplärapu: require('../../assets/images/täplärapu.jpg'),
  };
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          
          <View style={styles.main}>
            <View style={{marginTop: 50, backgroundColor: '#000000c0', padding: 20, borderRadius: 0}}>
              {visible_paino ? <View>
                <Text style={styles.Titletext}>Kalat painon mukaan:</Text>
                {paino_mukaan.map((item, index) => {
                  const fishName = item[0].toLowerCase();
                  return (
                    <View key={index}>
                      <Text style={styles.text}>{item}</Text>
                      {fishImages[fishName] ? (
                        <Image source={fishImages[fishName]} style={styles.imageFish} />
                      ) : (
                        <Text style={styles.text}>Kuva ei näy</Text>
                      )}
                    </View>
                  );
                })}
              </View>  : null}
              
              {visible_pituus ? <View>
                <Text style={styles.Titletext}>Kalat pituuden mukaan:</Text>
                {pituus_mukaan.map((item, index) => {
                  const fishName = item[0].toLowerCase();
                  return (
                    <View key={index}>
                      <Text style={styles.text}>{item}</Text>
                      {fishImages[fishName] ? (
                        <Image source={fishImages[fishName]} style={styles.imageFish} />
                      ) : (
                        <Text style={styles.text}>Kuva ei näy</Text>
                      )}
                    </View>
                  );
                })}
              </View>  : null}
              
              {visible_maara ? <View>
                <Text style={styles.Titletext}>Kalalajien saanti määrät:</Text>
                {maara_mukaan.map((item, index) => {
                  const fishName = item[0].toLowerCase();
                  return (
                    <View key={index}>
                      <Text style={styles.text}>{item}</Text>
                      {fishImages[fishName] ? (
                        <Image source={fishImages[fishName]} style={styles.imageFish} />
                      ) : (
                        <Text style={styles.text}>Kuva ei näy</Text>
                      )}
                    </View>
                  );
                })}
              </View>  : null}
              
              {visible_viehella ? <View>
                <Text style={styles.Titletext}>Kalalajien saanti määrät eri vieheillä:</Text>
                {viehella_mukaan.map((item, index) => {
                  const fishName = item[0].toLowerCase();
                  return (
                    <View key={index}>
                      <Text style={styles.text}>{item}</Text>
                      {fishImages[fishName] ? (
                        <Image source={fishImages[fishName]} style={styles.imageFish} />
                      ) : (
                        <Text style={styles.text}>Kuva ei näy</Text>
                      )}
                    </View>
                  );
                })}
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