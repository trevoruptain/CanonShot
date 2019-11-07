import * as WebBrowser from 'expo-web-browser';

import filestack from '../assets/scripts/filestack';

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import ReactFilestack from 'filestack-react';

import { MonoText } from '../components/StyledText';
import { file } from '@babel/types';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: '',
      currentImage: undefined
    }

    this.poll = this.poll.bind(this);
    this.onPress = this.onPress.bind(this);
  }
  
  componentDidMount() {
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/liveview', {
      method: 'POST',
      body: JSON.stringify({
        liveviewsize: 'small',
        cameradisplay: 'on',
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // this.setState({status: JSON.stringify(responseJson)});
        const fileReaderInstance = new FileReader();
        this.poll(fileReaderInstance);
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPress() {
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/control/shutterbutton', {
      method: 'POST',
      body: JSON.stringify({
        af: true
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        // this.setState({status: JSON.stringify(responseJson)});
        setTimeout(() => {
          return fetch('http://172.20.10.2:8080/ccapi/ver100/contents/sd/100CANON?type=jpeg')
            .then(response => response.json())
            .then(responseJson => {
              const last = responseJson.url[responseJson.url.length - 1];
              
              return fetch('https://canonshot.free.beeceptor.com', {
                method: 'POST',
                body: JSON.stringify({
                  af: true
                }),
              })
            })
            .catch(error => {
              console.error(error);
            });
        }, 2000)
      })
      .catch(error => {
        console.error(error);
      });
  }

  poll(fileReaderInstance) {
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/liveview/flip', {
      method: 'GET'
    })
      .then(response => response.blob())
      .then(blob => {
        fileReaderInstance.readAsDataURL(blob);
        fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;
          this.setState({ currentImage: base64data });
          setTimeout(() => {
              this.poll(fileReaderInstance);
            }, 100);
        }
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    // const slides = {
    //   image: require(this.props.currentImage),
    // }

    const currentImage = this.state.currentImage === undefined ? <Text>No image</Text> : <Image
      style={{ width: 420, height: 350 }}
      source={{
        uri:
          this.state.currentImage,
      }}
    />

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 30}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={{width: 400, height: 50}}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>{this.state.status}</Text>

            { currentImage }
  
            <View
              style={[styles.codeHighlightContainer, styles.CameraScreenFilename]}>
              <MonoText>screens/CameraScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Settings will go here
          </Text>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <TouchableHighlight
            onPress={this.onPress}
          >
            <Image 
              source={require('../assets/images/button.png')}
              style={{ width: 80, height: 80 }}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

CameraScreen.navigationOptions = {
  header: null,
};

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  CameraScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
