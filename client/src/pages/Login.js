import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, SafeAreaView, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useMutation, gql } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { save, getValueFor } from '../helpers/secureStore';

const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
  }
}
`
export default function Login({navigation}){
    const [login, {loading, error, data}] = useMutation(LOGIN_USER)
    const authContext = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const onChangeText = (text, input) => {
        setLoginForm(loginForm => ({...loginForm, [input]: text}));
    };


    useEffect(()=> {
      if(data){
        save('access_token', data.login.access_token)
          .then(()=> {
            authContext.setIsSignedIn(true)
          })
      }
    },[data])

    return(
        <>
            <View style={{
                ...styles.container, 
                }}>
                <View style={styles.form}>
                    <Text style={styles.formLabel}>To get started, input your email and password</Text>
                    <TextInput
                            mode="outlined"
                            label="Email"
                            autoCapitalize="none"
                            value={loginForm.email}
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
                        autoCapitalize="none"
                        label="Password"
                        value={loginForm.password}
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
                    <Text 
                    style={styles.forgotPill}>Forgot Password?</Text>
                    <Text 
                    style={styles.loginPill} 
                    onPress={ async ()=> {
                      // console.log('masuk', authContext)
                      // authContext.setIsSignedIn(true)
                      if(!loading){
                        await login({
                          variables: {
                            email: loginForm.email,
                            password: loginForm.password
                          }
                        })
                      }
                      }}>Login</Text>
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
    formLabel: {
        fontSize: 25,
        color: 'white',
        paddingBottom: 10
    },
    form: {
        flex: 4,
        backgroundColor: 'black',
        paddingTop: 10
    },
    text: {
      flex: 6,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    loginPill: {
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
      justifyContent: 'space-between',     
    }
  });