import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Register({navigation}){
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })

    const onChangeText = (text, input) => {
        setRegisterForm(registerForm => ({...registerForm, [input]: text}));
      };
    console.log(registerForm)
    return(
        <>
            <View style={{
                ...styles.container, 
                }}>
                <View style={styles.form}>
                <Text style={styles.formLabel}>Create your account</Text>
                    <TextInput
                            mode="outlined"
                            label="Name"
                            // value={email}
                            style={{
                                backgroundColor: 'black',
                                borderColor: 'white',
                            }}
                            onChangeText={text => onChangeText(text, 'name')}
                            textColor='white'
                            outlineColor='#d7abe6'
                            activeOutlineColor='#d7abe6'
                        />
                    <TextInput
                            mode="outlined"
                            label="Email"
                            // value={email}
                            style={{
                                backgroundColor: 'black',
                                borderColor: 'white',
                            }}
                            onChangeText={text => onChangeText(text, 'email')}
                            textColor='white'
                            outlineColor='#d7abe6'
                            activeOutlineColor='#d7abe6'
                        />
                    <TextInput
                            mode="outlined"
                            label="Username"
                            // value={email}
                            style={{
                                backgroundColor: 'black',
                                borderColor: 'white',
                            }}
                            onChangeText={text => onChangeText(text, 'username')}
                            textColor='white'
                            outlineColor='#d7abe6'
                            activeOutlineColor='#d7abe6'
                        />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        style={{
                            backgroundColor: 'black',
                            borderColor: 'white'
                        }}
                        onChangeText={text => onChangeText(text, 'password')}
                        textColor='white'
                        outlineColor='#d7abe6'
                        activeOutlineColor='#d7abe6'
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.registerPill} onPress={()=> navigation.navigate('Login')}>Register</Text>
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
      padding: 20
    },
    formLabel: {
        fontSize: 25,
        color: 'white',
        paddingBottom: 10
    },
    form: {
        flex: 4,
        backgroundColor: 'black',
        justifyContent: 'center',
        paddingTop: 10
    },
    text: {
      flex: 6,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    registerPill: {
      backgroundColor: 'white',
      padding: 7,
      borderRadius: 20,
      textAlign: 'center',
      width: screenSize.width /5,
      height: screenSize.height/20,
      fontSize: screenSize.height / 50
    },
    forgotPill: {
        backgroundColor: 'black',
        padding: 7,
        color: 'white',
        borderRadius: 20,
        textAlign: 'center',
        width: screenSize.width / 2.4,
        height: screenSize.height/20,
        fontSize: screenSize.height / 50
      },
    footer: {
      flex: 0.2,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'black',
      justifyContent: 'flex-end',     
    }
  });