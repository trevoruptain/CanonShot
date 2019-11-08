import React from 'react';
import { Text, View, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native';

export default class PhotosScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      currentPhoto: ''
    }

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    const takenPhotos = this.props.photos.map(photo => {
      return (
        <TouchableHighlight
        key={photo}
          onPress={() => {
            this.setState({ currentPhoto: photo })
            this.setModalVisible(true);
          }}>
          <Image
            source={{
              uri: photo,
            }}
            style={{ width: 138, height: 138 }}
          />
        </TouchableHighlight>
      )
    })

    return (
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            console.log(this.state)
          }}>
          <View>
              <Image
                source={{
                  uri:
                    this.state.currentPhoto,
                }}
                style={{ width: 450, height: 800 }}
              />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Back to Album</Text>
              </TouchableHighlight>
          </View>
        </Modal>

        { takenPhotos }

        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_0007.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_0007.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_0027.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_0027.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_0056-3.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_0056-3.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_0060-3.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_0060-3.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9864.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9864.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9867.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9867.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9880.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9880.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9983.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9983.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9892.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9892.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.setState({ currentPhoto: '../assets/images/gallery/IMG_9894.jpg' })
            this.setModalVisible(true);
            console.log(this.state.currentPhoto);
          }}>
        <Image
          source={require('../assets/images/gallery/IMG_9894.jpg')}
          style={{ width: 138, height: 138 }}
        />
        </TouchableHighlight>
      </View>
    );
  }
  
}

PhotosScreen.navigationOptions = {
  title: 'Photos',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
});
