import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

export default function Intro({navigation}){

    return(
        <>
            <View style={{
                ...styles.container, 
                
                }}>
                <View style={styles.text}>
                <Text style={{color: 'white', fontSize: 40}}>See what's happening in the world right now.</Text>
                </View>
                <View style={styles.createAccount}>
                <Text style={styles.pill} onPress={()=> navigation.navigate('Register')}>Create Account</Text>
                </View>
                <View style={styles.footer}>
                <Text style={{color: 'grey'}}>Have an account already? </Text>
                <Text style={{color: '#d7abe6'}} onPress={()=> navigation.navigate('Login')}>Log in</Text>
                </View>
                <StatusBar style="inverted" />
            </View>
        </>
    )
}

const screenSize = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 10
    },
    text: {
      flex: 6,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    createAccount: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    },
    pill: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20,
      textAlign: 'center',
      width: screenSize.width / 1.5,
      fontSize: screenSize.height / 45
    },
    footer: {
      flex: 0.2,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'black',
      justifyContent: 'start',
    }
  });