import { View, Text, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';

export default function Header(){
const authContext = useContext(AuthContext)

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: '100%'
                }}
            >
                <View>
                    <Image source={{ uri: 'https://static.wikia.nocookie.net/iandyou/images/c/cc/IU_profile.jpeg/', width: 30, height: 30 }}
                    style={{borderRadius: 50}}
                    />
                </View>
                <View>
                <Image
                    style={{ width: 30, height: 30 }}
                    source={{uri: "https://freelogopng.com/images/all_img/1690643777twitter-x%20logo-png-white.png"}}
                    />
                </View>
                <View>
                <MaterialCommunityIcons name="cog-outline" size={30} color="white" onPress={
                     async ()=> {
                        await SecureStore.deleteItemAsync('access_token')
                        authContext.setIsSignedIn(false)
                    }
                    } />
                </View>
            </View>
        </>
    )
}