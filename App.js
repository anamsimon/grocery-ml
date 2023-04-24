import React, { useState, useEffect } from 'react';
import { StyleSheet ,Text, View, Button, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { predict } from './Api';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);
    const takePicture = async () => {
      if(camera){
        const data = await camera.takePictureAsync(null)
        setImage(data.uri);
        //alert(data.uri);
        //https://5da8-199-185-120-250.ngrok-free.app/predict
        const serverurl = "https://318d-2001-56a-f93f-7100-fc46-4fbb-1fc7-904e.ngrok-free.app/predict";
          var formdata = new FormData();
          formdata.append('file', {
            uri: data.uri, // your file path string
            name: 'file',
            type: 'image/jpg'
          });

          fetch(serverurl, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
              },
              method: 'POST',
              body: formdata
            })
            .then((response) => response.json())
            .then((body) => {
              alert(body["prediction"]);
            })
            .catch((err) => {
              alert(`${err}`);
            })
            .finally(() => {
              return;
            });

    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
   <View style={{ flex: 1}}>
      <View style={styles.cameraContainer}>
            <Camera 
            ref={ref => setCamera(ref)}
            style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
      </View>  
       <Button title="Take Picture" onPress={() => takePicture()} />
        {image && <Image source={{uri: image}} style={styles.imageContainer}/>}
   </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },
  imageContainer:{
      flex: 1,
      backgroundColor: 'beige',
      borderWidth: 5,
      flexDirection: 'row'    
  }
})