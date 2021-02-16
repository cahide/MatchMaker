import {Dimensions, Platform} from "react-native";

global.isIphoneX = Dimensions.get("window").height == 812 || Dimensions.get("window").height == 896;
global.isNarrowWidth = Dimensions.get("window").width <= 320;
module.exports = {
    mainView: {
        flex: 1,
    },
    mainContainer: {
        flexGrow: 1,
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
};