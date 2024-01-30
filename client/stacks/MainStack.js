import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainDrawer from '../src/drawer/MainDrawer';
import Intro from '../src/pages/Intro';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import PostDetail from '../src/components/PostDetail';
import Profile from '../src/pages/Profile';
import AddComment from '../src/pages/AddComment';
import { Image} from 'react-native';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../src/context/AuthContext';
import { getValueFor } from '../src/helpers/secureStore';




function LogoTitle() {
    return (
      <>
      <Image
        style={{ width: 30, height: 30 }}
        source={{uri: "https://freelogopng.com/images/all_img/1690643777twitter-x%20logo-png-white.png"}}
      />
      </>
    );
  }

const Stack = createNativeStackNavigator();

export default function MainStack(){
  const authContext = useContext(AuthContext)

    useEffect(()=> {
        getValueFor('access_token')
        .then(result => {
          if(result){
            authContext.setIsSignedIn(true)
          }
        })
    }, [])

    return (
        <>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center', headerStyle: {
        backgroundColor: 'black'
            },
            headerTintColor: 'white'
            }}>
                {
                    authContext.isSignedIn ? <>
                    <Stack.Screen name="Main" component={MainDrawer} options={{ headerTitle: (props) => <LogoTitle {...props} />, headerShown: false }} />
                    <Stack.Screen name='Post' component={PostDetail} />
                    <Stack.Screen name='Profile' component={Profile}/>
                    <Stack.Screen name='Comment' component={AddComment} />
                    </>
                    :
                    <>
                    <Stack.Screen name="Intro" component={Intro} options={{headerShown: false}} />
                    <Stack.Screen name="Login" component={Login} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                    </>

                }
        </Stack.Navigator>
        </ NavigationContainer>
        </>
    )
}

const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };