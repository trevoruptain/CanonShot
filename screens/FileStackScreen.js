import React from 'react'
import { WebView } from 'react-native-webview';

export default class FileStackScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <WebView
                source={{ uri: 'https://trevoruptain.com/filestack/index.html' }}
                style={{ marginTop: 0, width: 450, height: 500 }}
            />
        );
    }
}