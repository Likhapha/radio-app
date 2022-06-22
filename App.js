import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import { AntDesign, Ionicons, SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function App(setStation, Station) {
  const Radio = {
    filename: 'Harvest FM',
    uri: 'http://streema.com/radios/play/Harvest_FM',
    cover: 'https://listenonlineradio.com/wp-content/uploads/Harvest-FM.png',

    filename: 'Moafrika FM',
    uri: 'http://streema.com/radios/play/MoAfrika_FM',
    cover: 'https://listenonlineradio.com/wp-content/uploads/Moafrika-FM.jpg',

    filename: 'Radio Maria',
    uri: 'http://streema.com/radios/play/Lesotho_Catholic_Radio_FM_103.3',
    cover: 'https://web.facebook.com/radiomarialesotho/photos/a.327363121042882/327363054376222/',

    filename: "People's Choise Radio",
    uri: 'http://streema.com/radios/play/PC_FM',
    cover: 'https://liveonlineradio.net/wp-content/uploads/2017/12/PC-FM-220x108.jpg'
  };

  const [sound, setSound] = React.useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [listen, setListen] = useState('')

  function async() {
    setCurrentIndex(currentIndex + 1)
    setStation(Station - 1)
  }

  const componentDidMount = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      })

      this.loadAudio()
    } catch (e) {
      console.log(e)
    }
  }
  function harvest() {
    setListen({ uri: 'http://streema.com/radios/play/Harvest_FM' })

  }

  function Moafrika() {
    setListen({ uri: 'http://streema.com/radios/play/MoAfrika_FM' })
  }


  function Maria() {
    setListen({ uri: 'http://streema.com/radios/play/Lesotho_Catholic_Radio_FM_103.3' })
  }

  function Choise() {
    setListen({ uri: 'http://streema.com/radios/play/PC_FM' })
  }


  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);
  const handleAudioPlayPause = async () => {
    if (playbackObject !== null && playbackStatus === null) {
      const status = await playbackObject.loadAsync(
        { uri: Radio.uri },
        { shouldPlay: true }
      );
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }

    if (playbackStatus.isPlaying) {
      const status = await playbackObject.pauseAsync();
      setIsPlaying(false);
      return setPlaybackStatus(status);
    }


    if (!playbackStatus.isPlaying) {
      const status = await playbackObject.playAsync();
      setIsPlaying(true);
      return setPlaybackStatus(status);
    }
  };


  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#EEEEEE', borderRadius: '8%' }}>
        <View style={styles.Rectangle1}>
          <Text style={{ color: 'white', marginLeft: 20, marginRight: 130, fontSize: 20, fontWeight: 'bold', fontFamily: 'candara light' }}>
            FM Radio
          </Text>

          <View style={{ marginLeft: 40 }}>
            <SimpleLineIcons name="earphones" size={30} color="white" />
          </View>

          <View style={{ marginLeft: 30, marginRight: 10 }}>
            <Entypo name="menu" size={30} color="white" />
          </View>
        </View>

        <View style={styles.Rectangle2}>
          <View style={{ marginLeft: 20, marginRight: 50 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              All Stations
            </Text>
          </View>

          <View>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Favourites Stations
            </Text>
          </View>
        </View>

        <View style={styles.Rectangle3}>
          <View style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginRight: 220, marginTop: 10 }}>
                Haverst FM
              </Text>
              <TouchableOpacity onPress={harvest}>
                <View style={{ marginTop: 10 }}>
                  <AntDesign name="playcircleo" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 210, marginLeft: 20 }}>Moafrika FM
              </Text>
              <TouchableOpacity onPress={Moafrika}>
                <View>
                  <AntDesign name="playcircleo" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 190, marginLeft: 20 }}>
                Radio Maria FM
              </Text>
              <TouchableOpacity onPress={Maria}>
                <View>
                  <AntDesign name="playcircleo" size={24} color="white" />
                </View>
              </TouchableOpacity >
            </View>
          </View>

          <View style={{ marginBottom: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold', marginRight: 125, marginLeft: 20 }}>
                People's Choise Radio FM
              </Text>
              <TouchableOpacity onPress={Choise}>
                <View>
                  <AntDesign name="playcircleo" size={24} color="white" backgroundColor='red' />
                </View>
              </TouchableOpacity >
            </View>
          </View>


        </View>

        <Image style={styles.line}
          source={require('./assets/line.jpg')} />

        <View style={styles.Detail}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>


              <View style={{ marginLeft: 20 }}>
                <TouchableOpacity>
                  <AntDesign name="stepbackward" size={30} color="red" backgroundColor='yellow' />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, marginLeft: 15 }}>
                <Text style={{ color: 'white' }}>
                  Previous
                </Text>
              </View>
            </View>

            <View>
              <View>
                <Ionicons style={{ alignSelf: 'center', backgroundColor: 'yellow', padding: 10, borderRadius: 50, }} name={isPlaying ? 'pause' : 'play'} size={24} color='red' onPress={handleAudioPlayPause}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'white' }}>
                  Play
                </Text>
              </View>
            </View>


            <View>
              <View style={{ marginRight: 20 }}>
                <TouchableOpacity>
                  <AntDesign name="stepforward" size={30} color="red" />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10, marginRight: 15 }}>
                <Text style={{ color: 'white' }}>
                  Next
                </Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#BDBDBD',
    borderWidth: 10,
    borderWidth: 10

  },


  Detail: {
    width: '100%',
    height: 100,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center'
    // padding: 10
  },


  Rectangle1: {
    backgroundColor: 'black',
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'white'
  },

  Rectangle2: {
    backgroundColor: 'black',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    //marginBottom: 20,
  },

  Rectangle3: {
    backgroundColor: 'black',
    width: '100%',
    height: 170,
    flexDirection: 'column',
    //marginBottom: 20,
  },
  line: {
    height: '50%',
    width: '100%'
  }
}
);


