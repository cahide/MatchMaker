import React, {Component} from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ActionSheetIOS,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import styles from "../Styles/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Strings} from "frankly/src/Utils/Strings";
import DialogAndroid from 'react-native-dialogs';

var ImagePicker = NativeModules.ImageCropPicker;


var options = {
    title: '',
    cameraType: 'front',
    mediaType: 'photo',
    takePhotoButtonTitle: Strings.takePhoto,
    chooseFromLibraryButtonTitle: Strings.chooseFromGallery,
    cancelButtonTitle: Strings.cancel
};

export default class PhotoUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: props.source,
            isProfileEdit: props.isProfileEdit,
            isProfile: props.isProfile,
            isRegister: props.isRegister
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({avatarSource: nextProps.source})
    }


    openMenu() {
        if (Platform.OS == "ios") {
            ActionSheetIOS.showActionSheetWithOptions({
                    options: [Strings.takePhoto, Strings.chooseFromGallery, Strings.cancel],
                    /*
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                    */
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        this.openImagePicker('takePhoto');
                    } else if (buttonIndex === 1) {
                        this.openImagePicker('chooseFromGallery');
                    }
                });
        } else {
            this.openAndroidMenu()
        }
    }

    async openAndroidMenu() {
        const {selectedItem} = await DialogAndroid.showPicker('', null, {
            positiveText: '',
            items: [
                {label: Strings.takePhoto, id: 'takePhoto'},
                {label: Strings.chooseFromGallery, id: 'chooseFromGallery'},
            ],
            contentColor: "#222222"
        });
        if (selectedItem) {
            if (selectedItem.id == "takePhoto") {
                this.openImagePicker("takePhoto");
            } else {
                this.openImagePicker("chooseFromGallery");
            }
        }
    }

    openImagePicker(pickerType) {
        if (pickerType == 'takePhoto') {
            ImagePicker.openCamera({
                width: 1000,
                height: 1000,
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
                compressImageQuality: 0.6,
                cropping: true,
                cropperCircleOverlay: true,
                mediaType: 'photo',
                showCropGuidelines: false,
                hideBottomControls: true,
                cropperToolbarColor: "#EE3B52",
                cropperStatusBarColor: "#EE3B52",
                cropRect: (1000, 1000, 0, 0)
            }).then(image => {
                let pickedImage = {uri: image.path};
                this.props.updatePhoto(pickedImage);
            });
        } else {
            ImagePicker.openPicker({
                width: 1000,
                height: 1000,
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
                compressImageQuality: 0.6,
                cropping: true,
                cropperCircleOverlay: true,
                mediaType: 'photo',
                showCropGuidelines: false,
                cropperToolbarColor: "#EE3B52",
                cropperStatusBarColor: "#EE3B52",
                hideBottomControls: true,
                cropRect: (1000, 1000, 0, 0)
            }).then(image => {
                let pickedImage = {uri: image.path};
                this.props.updatePhoto(pickedImage);
            });
        }
    }

    render() {
        return (
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => this.openMenu()}>
                    {
                        !this.state.isProfileEdit ?
                            <View
                                style={[photoUploadStyle.photoContainer, this.state.isProfile ? photoUploadStyle.shadow : "", {
                                    marginTop: this.state.isProfile ? 0 : 0,
                                    marginBottom: this.state.isProfile ? 10 : 0
                                }]}>

                                <Image source={this.state.avatarSource}
                                       onError={() => this.setState({avatarSource: require('frankly/assets/dummy_user.png')})}
                                       style={[{
                                           width: "100%",
                                           height: "100%",
                                           resizeMode: "cover",
                                           borderRadius: 50
                                       }, this.state.isProfile ? photoUploadStyle.profileImage : ""]}/>
                            </View>
                            :
                            <View style={[photoUploadStyle.photoContainer, photoUploadStyle.profilePhotoContainer]}>
                                <View style={photoUploadStyle.uploadedPhoto}>
                                    <View style={photoUploadStyle.overlay}>
                                        <Icon name="camera" size={24} style={styles.headerRedIcon}/>
                                        <Text style={styles.addPhotoText}>{Strings.changePhoto}</Text>
                                    </View>
                                    <Image source={this.state.avatarSource}
                                           onError={() => this.setState({avatarSource: require('frankly/assets/dummy_user.png')})}
                                           style={{
                                               width: "100%",
                                               height: "100%",
                                               resizeMode: "cover",
                                               borderRadius: 50
                                           }}/>
                                </View>
                            </View>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}

const photoUploadStyle = StyleSheet.create({
    photoContainer: {
        width: 110,
        height: 110,
        borderWidth: 2,
        borderColor: "#ffffff",
        borderRadius: 50,
        backgroundColor: "rgba(255,255,255,0.2)"
    },

    profilePhotoContainer: {
        width: 104,
        height: 104,
        borderRadius: 52
    },
    shadow: {
        borderWidth: 0,
        width: 100,
        height: 100,
    },
    profileImage: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    uploadedPhoto: {
        overflow: "hidden",
        borderRadius: 60,
        width: 100,
        height: 100
    },
    overlay: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    registerImageContainer: {
        width: 170,
        height: 170,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#ffffff",
        position: "relative",
        zIndex: 2,
        elevation: 6,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.3,
        marginTop: 20,
        marginBottom: 30,
        backgroundColor: "#ffffff"
    },
    registerImage: {
        width: 166,
        height: 166,
        borderRadius: 18,
    },
    registerContainer: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#ffffff",
        borderStyle: "dashed",
        width: 170,
        height: 170,
        backgroundColor: "#EE3B52",
        zIndex: 2,
        position: "relative",
        marginTop: 20,
        marginBottom: 30,
        elevation: 6,
        shadowColor: "#000000",
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.3,
    },
    dummyPhoto1: {
        borderRadius: 20,
        backgroundColor: "#ffffff",
        width: 100,
        height: 100,
        right: -15,
        top: 20,
        position: "absolute",
        transform: [{rotate: "15deg"}],
        zIndex: 1
    },
    dummyPhoto2: {
        borderRadius: 20,
        backgroundColor: "#ffffff",
        width: 130,
        height: 130,
        left: -10,
        top: 40,
        position: "absolute",
        transform: [{rotate: "-20deg"}],
        zIndex: 1
    }
});
