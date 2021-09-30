import { StyleSheet, Dimensions } from "react-native"

const {width, height} = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        marginVertical: 10
    },
    input: {
        borderColor: "darkgrey",
        borderWidth: 1,
        width: width / 1.3,
        padding: 5,
        borderRadius: 5
    },
    label:{
        fontFamily: "sans-serif",
        fontSize: 14,
        color: "black",
        marginVertical: 5
    }
});

export { styles };