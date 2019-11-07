import { connect } from 'react-redux';
import { receivePhoto } from '../actions/photo_actions';
import CameraScreen from './CameraScreen';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    receivePhoto: photo => dispatch(receivePhoto(photo))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CameraScreen);