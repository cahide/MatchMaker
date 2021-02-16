import {
    Platform,
    PermissionsAndroid,
} from 'react-native';
import Permissions from "react-native-permissions";

export const askPermissions = async () => {
    return new Promise(resolve => {
        const result = {camera_permission: false, microphone_permission: false};
        if (Platform.OS === "android") {
            let permissions = [];
            permissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            permissions.push(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
            PermissionsAndroid.requestMultiple(permissions).then((result) => {
                for (let key in result) {
                    if (result[key] === 'granted') {
                        if (key === PermissionsAndroid.PERMISSIONS.CAMERA)
                            result['camera_permission'] = true;
                        else if (key === PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
                            result['microphone_permission'] = true;
                    }
                }
                resolve(result);
            });
        } else {
            Permissions.request('camera').then(response => {
                if (response === 'authorized') {
                    result['camera_permission'] = true;
                }
                Permissions.request('microphone').then(response2 => {
                    if (response2 === 'authorized') {
                        result['microphone_permission'] = true;
                    }
                    resolve(result);
                });
            });
        }
    });
};

export const checkPermissions = async () => {
    return new Promise(resolve => {
        const result = {camera_permission: false, microphone_permission: false};
        if (Platform.OS === 'android') {
            result['camera_permission'] = false;
            result['microphone_permission'] = false;
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then((response) => {
                if (response === 'granted') {
                    result['camera_permission'] = true;
                }
                PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then((response2) => {
                    if (response2 === 'granted') {
                        result['microphone_permission'] = true;
                    }
                    resolve(result);
                });
            });
        } else {
            result['camera_permission'] = false;
            result['microphone_permission'] = false;
            Permissions.check('camera').then((response) => {
                if (response === 'authorized') {
                    result['camera_permission'] = true;
                }
                Permissions.check('microphone').then((response2) => {
                    if (response2 === 'authorized') {
                        result['microphone_permission'] = true;
                    }
                    resolve(result);
                })
            })
        }
    });
};
