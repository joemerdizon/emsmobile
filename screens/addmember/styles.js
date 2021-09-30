import { StyleSheet, Dimensions } from 'react-native';

const {width, height} = Dimensions.get("screen");


const styles = StyleSheet.create({
    container: {
      flex: 1,    
    },
    section:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginStart: 15,
      marginEnd: 10, 
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 0.6   
    },
    sectionTitle: {
      marginTop: 8,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#696969'
    },
    formCotainer: {
      justifyContent: 'center', 
      alignItems: 'center'
    },
    toogleContainer: {
      alignSelf: 'baseline',
      marginTop: 10,
      marginStart: 16,
    },
    button: {
      marginStart: 14,
      marginEnd: 10, 
      marginTop: 10,
      marginBottom: 10,
      width: width / 1.09,
      height: 40,
      borderRadius: 5,
      backgroundColor: '#1e90ff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    errorText: {
      marginTop: 5,
      alignSelf: 'baseline',
      color: '#b22222',
      fontSize: 12,
      marginLeft: 18
    },
    inputDatePicker: {
      width: width / 1.10,
      height: 40,
      marginVertical: 4,
      fontSize: 14,
    },
    spinnerTextStyle: {
      color: '#FFF'
    },
    
});

export { styles };