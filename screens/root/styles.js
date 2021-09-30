import { StyleSheet, Dimensions } from "react-native";
import { ColorPalettes } from "../../constants/colorpalettes";

const {height, width} = Dimensions.get("screen");
const height_logo = height * 0.15;
const { MainBgColor, ButtonBgColor } = ColorPalettes;


 

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#94c34c',
        borderBottomRightRadius: 40
        
    },
    footer: {
        flex: 1.8,
        //borderTopWidth: 0.50,
        //paddingHorizontal: 15
        alignItems: 'center',
    },
    logo:{
        marginTop: 30,
        width: height_logo,
        height: height_logo,
    },
    inputsContainer: {
        marginVertical: 5,
    },
    inputs: {
        //borderWidth: 1,
        height: 45,
        width: width / 1.1,
        borderRadius: 3,
        //padding: 10,
        borderColor: '#696969'
    },
    label: {
        marginBottom: 5,
        color: '#696969',
        fontSize: 14
    },
    button: {
        marginTop: 15,
        width: width / 1.1,
        height: height * 0.06,
        borderRadius: 5,
        backgroundColor: '#0078fb',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signIn: {
        alignSelf: 'baseline', 
        fontSize: 20, 
        marginBottom: 30,
        marginTop: 25,
        color: '#696969',
        fontWeight: 'bold',
        marginLeft: 18
    },
    
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: '#f5fffa',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },   
    text_footer: {
        marginTop: 15,
        color: '#fffaf0',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },      
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },    
    brand: {
        marginTop: 10,
        marginLeft: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 28,
        color: '#1e90ff'
    }
    
});

export { styles };