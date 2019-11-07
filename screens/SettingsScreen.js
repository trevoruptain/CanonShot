import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { MonoText } from '../components/StyledText';
import { View, ScrollView, StyleSheet, Platform, Text, Picker } from 'react-native';

import { Slider, ButtonGroup } from 'react-native-elements';


export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceInfo: '',
      AV: 'f4.0',
      ISO: '100',
      exposure: '+0.0',
      whiteBalance: '6000'
    }

    this.updateIndex = this.updateIndex.bind(this)
    this.handleISOChange = this.handleISOChange.bind(this);
    this.handleExposureChange = this.handleExposureChange.bind(this);
    this.handleWhiteBalanceChange = this.handleWhiteBalanceChange.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });

    const options = ['f3.4', 'f4.0', 'f4.5', 'f5.0', 'f5.6', 'f6.3', 'f7.1', 'f8.0'];
    const selectedOption = options[selectedIndex];

    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/settings/av', {
      method: 'POST',
      body: JSON.stringify({
        value: selectedOption,
        ability: options
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

  componentDidMount() {
    fetch('http://172.20.10.2:8080/ccapi/ver100/deviceinformation')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({deviceInfo: responseJson})
      })
      .catch(error => {
        console.error(error);
      });

    fetch('http://172.20.10.2:8080/ccapi/ver100/functions/registeredname/ownername')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ ownername: responseJson })
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleISOChange(itemValue) {
    this.setState({ISO: itemValue});
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/settings/iso', {
      method: 'PUT',
      body: JSON.stringify({
        value: itemValue,
      })
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  }

  handleExposureChange(itemValue) {
    this.setState({ exposure: itemValue });
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/settings/exposure', {
      method: 'PUT',
      body: JSON.stringify({
        value: itemValue,
      })
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  }

  handleWhiteBalanceChange(itemValue) {
    this.setState({ whiteBalance: itemValue });
    return fetch('http://172.20.10.2:8080/ccapi/ver100/shooting/settings/wb', {
      method: 'PUT',
      body: JSON.stringify({
        value: itemValue,
      })
    })
      .then(response => console.log(response))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const buttons = ['f3.4', 'f4.0', 'f4.5', 'f5.0', 'f5.6', 'f6.3', 'f7.1', 'f8.0'];
    const { selectedIndex } = this.state;

    return (
      <ScrollView style={styles.container}>
        <Text>Trevor's Canon</Text>
        <MonoText>Firmware Version: {this.state.deviceInfo["firmwareversion"]}</MonoText>
        <MonoText>GUID: {this.state.deviceInfo["guid"]}</MonoText>
        <MonoText>Mac Address: {this.state.deviceInfo["macaddress"]}</MonoText>
        <MonoText>Manufacturer: {this.state.deviceInfo["munufacturer"]}</MonoText>
        <MonoText>Product Name: {this.state.deviceInfo["productname"]}</MonoText>
        <MonoText>Serial Number: {this.state.deviceInfo["serialnumber"]}</MonoText>

        <View style={{ paddingTop: 100, paddingBottom: 100 }} >
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 50 }}
        />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 120}}>
          <Text>ISO</Text>

          <Picker
            selectedValue={this.state.ISO}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.handleISOChange(itemValue) }>
            <Picker.Item label="auto" value="auto" />
            <Picker.Item label="100" value="100" />
            <Picker.Item label="125" value="125" />
            <Picker.Item label="160" value="160" />
            <Picker.Item label="200" value="200" />
            <Picker.Item label="250" value="250" />
            <Picker.Item label="320" value="320" />
            <Picker.Item label="400" value="400" />
            <Picker.Item label="500" value="500" />
            <Picker.Item label="640" value="640" />
            <Picker.Item label="800" value="800" />
            <Picker.Item label="1000" value="1000" />
            <Picker.Item label="1250" value="1250" />
            <Picker.Item label="1600" value="1600" />
            <Picker.Item label="2000" value="2000" />
            <Picker.Item label="2500" value="2500" />
            <Picker.Item label="3200" value="3200" />
          </Picker>
          </View>

          <View style={{ width: 120 }}>

          <Text>Exposure</Text>

          <Picker
            selectedValue={this.state.exposure}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => this.handleExposureChange(itemValue)}>
              <Picker.Item label="-3.0" value="-3.0" />
              <Picker.Item label="-2_2/3" value="-2_2/3" />
              <Picker.Item label="-2_1/3" value="-2_1/3" />
              <Picker.Item label="-2.0" value="-2.0" />
              <Picker.Item label="-1_2/3" value="-1_2/3" />
              <Picker.Item label="-1.0" value="-1.0" />
              <Picker.Item label="-0_2/3" value="-0_2/3" />
              <Picker.Item label="-0_1/3" value="-0_1/3" />
              <Picker.Item label="+0.0" value="+0.0" />
              <Picker.Item label="+0_1/3" value="+0_1/3" />
              <Picker.Item label="+0_2/3" value="+0_2/3" />
              <Picker.Item label="+1.0" value="+1.0" />
              <Picker.Item label="+1_1/3" value="+1_1/3" />
              <Picker.Item label="+1_2/3" value="+1_2/3" />
              <Picker.Item label="+2.0" value="+2.0" />
              <Picker.Item label="+2_1/3" value="+2_1/3" />
              <Picker.Item label="+2_2/3" value="+2_2/3" />
              <Picker.Item label="+3.0" value="+3.0" />
          </Picker>
          </View>

          <View>

            <Text>White Balance</Text>

            <Picker
              selectedValue={this.state.whiteBalance}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.handleWhiteBalanceChange(itemValue)}>
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1000" value="1000" />
              <Picker.Item label="2000" value="2000" />
              <Picker.Item label="3000" value="3000" />
              <Picker.Item label="4000" value="4000" />
              <Picker.Item label="5000" value="5000" />
              <Picker.Item label="6000" value="6000" />
              <Picker.Item label="7000" value="7000" />
              <Picker.Item label="8000" value="8000" />
              <Picker.Item label="9000" value="9000" />
              <Picker.Item label="10000" value="10000" />
              <Picker.Item label="11000" value="11000" />
              <Picker.Item label="12000" value="12000" />
            </Picker>
          </View>
        </View>
      </ScrollView>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: 'Pro Settings',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
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
