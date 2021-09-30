import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';   

const Stack = createStackNavigator();

export function StackNavigation({title, name, navigation, component}) {
    return(
        <Stack.Navigator screenOptions={{
            headerStyle:{
              backgroundColor: '#94c34c'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            }
          }}>
            <Stack.Screen name={name} component={component} options={{
              title: title,
              headerTitleAlign: 'center',
              headerLeft: () => (
                <MaterialIcons name='menu' size={25} onPress={() => navigation.openDrawer() } style={styles.icon} />
              )
            }} />       
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({  
    icon: {
      left: 16,
      color: '#fff'
    }
});

export default StackNavigation;