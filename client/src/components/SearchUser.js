import { gql, useMutation } from "@apollo/client";
import { View, Text, StyleSheet, Image } from "react-native";

const FOLLOW_USER = gql`
    mutation Follow($followingId: ID!) {
        follow(followingId: $followingId)
    }
`

export default function SearchUser({users}){
    
    const [follow, {loading, error, data}] = useMutation(FOLLOW_USER)
    console.log(users)
    return (
        <>
            <View style={{
                marginLeft: 30,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '80%'
            }}>
                <View style={styles.avatar}>
                    <Image 
                    source={{
                        uri: users?.avatar ? users.avatar : 'https://i.pinimg.com/736x/a6/32/b2/a632b24a1ced508e96d4d0b1d9b60215.jpg'
                    }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50
                    }}
                    />
                </View>
                <View style={{
                    
                }}>
                    <View style={styles.nama}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>{users.name}</Text>
                    </View>
                    <View style={styles.username}>
                        <Text style={{color: 'grey'}}>@{users.username}</Text>
                    </View>
                </View>
                <View style={styles.follow}>
                    <Text 
                    style={{color: 'white'}}
                    onPress={ async ()=> {
                      
                            await follow({
                                variables: {
                                    followingId: users._id
                                }
                            })
                    }}
                    >Follow</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    avatar: {
    
    },
    nama: {
       
    },
    username: {

    },
    follow: {
        width: 60,
        height: 30,
        backgroundColor: 'blue',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})