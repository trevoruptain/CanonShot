import { connect } from 'react-redux';
import PhotosScreen from './PhotosScreen';

const mapStateToProps = state => ({
    photos: state.entities.photos
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotosScreen);