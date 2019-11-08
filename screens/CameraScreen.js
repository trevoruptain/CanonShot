import * as WebBrowser from 'expo-web-browser';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  CameraRoll
} from 'react-native';

import { Slider, ButtonGroup } from 'react-native-elements';

import { Switch } from 'react-native-paper';

import { MonoText } from '../components/StyledText';
import { file } from '@babel/types';

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImage: undefined,
      zoom: 0,
      selectedIndex: 1,
      isSwitchOn: false,
    }

    this.poll = this.poll.bind(this);
    this.onPress = this.onPress.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
    this.handleZoom = this.handleZoom.bind(this);
    this.useLibraryHandler = this.useLibraryHandler.bind(this);
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
        af: !this.state.isSwitchOn
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        setTimeout(() => {
          return fetch('http://172.20.10.2:8080/ccapi/ver100/contents/sd/100CANON?type=jpeg')
            .then(response => response.json())
            .then(responseJson => {
              const last = responseJson.url[responseJson.url.length - 1];
              this.props.receivePhoto(last);
              this.useLibraryHandler(last);
              console.log(last);
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

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });

    const options = ['near1', 'near2', 'near3', 'far1', 'far2', 'far3'];
    const selectedOption = options[selectedIndex];

    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/control/drivefocus', {
      method: 'POST',
      body: JSON.stringify({
        value: selectedOption
      }),
    })
      .then(response => response.blob())
      .then(blob => {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.readAsText(blob);
        fileReaderInstance.onload = () => {
          base64data = fileReaderInstance.result;
          console.log(base64data);
        }
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleZoom(value) {
    this.setState({zoom: Math.floor(value * 100)});

    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/control/zoom', {
      method: 'POST',
      body: JSON.stringify({
        value: Math.floor(value * 100)
      })
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async (fileUrl) => {
    // await this.askPermissionsAsync();
    setTimeout(() => {
      console.log('about to save')
      CameraRoll.saveToCameraRoll(fileUrl, 'photo');
    }, 5000)
    
  };

  render() {
    const { isSwitchOn } = this.state;

    const buttons = ['Near 1', 'Near 2', 'Near 3', 'Far 1', 'Far 2', 'Far 3'];
    const { selectedIndex } = this.state;

    const switchText = this.state.isSwitchOn === true ? 'Manual' : 'Auto'
    const switchMargin = this.state.isSwitchOn === true ? 180 : 190

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

            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
              { currentImage }

              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 50 }}
              />

              <View style={{paddingLeft: 30, paddingRight: 30}}>

              <Slider
                value={this.state.value}
                onValueChange={value => this.handleZoom(value)}
              />
              <Text>Zoom: {this.state.zoom}</Text>

            </View>

            <Switch
              value={isSwitchOn}
              style={{marginTop: 20, marginLeft: 180}}
              onValueChange={() => { this.setState({ isSwitchOn: !isSwitchOn }); }
              }
            />
            <Text style={{ marginLeft: switchMargin }}>{ switchText }</Text>
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
