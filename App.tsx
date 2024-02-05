import { StyleSheet, Text, View,  PermissionsAndroid,Platform ,Button, Alert, SafeAreaView} from 'react-native'
import React, {useEffect,useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";

const App = () => {
  const watchIdRef = useRef(null);
  if (Platform.OS === 'android') {
    // Use PermissionsAndroid here
  }
  useEffect(() => {
    requestLocationPermission()
    updateforeground();
    Notification()
    startTracking();
  }, []);
  const requestLocationPermission = async () => {
    Geolocation.requestAuthorization('always')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('1Location permission granted');
      } else {
        console.log('Location permission denied');
      }
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ); 
    } catch (err) {
      console.warn(err);
    }
  }
  const updateforeground =()=>{
    ReactNativeForegroundService.add_task(() => startTracking(), {
      delay: 100,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }
  const Notification =()=>{

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Location Tracking',
      message: 'Location Tracking',
      icon: 'ic_launcher',
      button: false,
      button2: false,
      // buttonText: "Button",
      // button2Text: "Anther Button",
      // buttonOnPress: "cray",
      setOnlyAlertOnce: true,
      color: '#000000',
    });
    startTracking()
  }

  const startTracking = async () => {
   let s= Geolocation.requestAuthorization('always');

    Geolocation.watchPosition(
      position => {
        let coordinates: any = [];
        coordinates[0] = position.coords.longitude;
        coordinates[1] = position.coords.latitude;
        console.warn(Platform.OS,"App Position tracking",coordinates)
      },
      error => {
        console.log('maperror in getting location', error.code, error.message);

      },

      
      { enableHighAccuracy: true, distanceFilter: 0 },
    );
  };
  
  return (



    <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
      <Text style={{color:'red',fontWeight:'600',fontSize:20,margin:30}}>Location Tracking</Text>
     {Platform.OS==="android" && <Button onPress={Notification} title='Start Tracking'/>}
     
    </View>

  )
}
export default App

const styles = StyleSheet.create({})