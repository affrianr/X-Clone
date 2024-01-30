import { View, Text, StyleSheet, Image } from "react-native";


export default function UserProfile(){

    return(
        <>
            <View style={{flex: 1}}>
                <View style={styles.header}>
                <Image 
                      source={{uri: 'https://public.urbanasia.com/images/post/2022/09/20/1663640333-IU.jpg'}}
                      style={{height: '100%', width: '100%'}}
                      />
                </View>
                <View style={styles.profpic}>
                <Image 
                      source={{uri: 'https://static.wikia.nocookie.net/iandyou/images/c/cc/IU_profile.jpeg/'}}
                      style={{height: 85, width: 85, borderRadius: 50}}
                      />
                <Text style={{
                    backgroundColor: 'black', 
                    borderRadius: 20, 
                    height: 30, 
                    width: 100, 
                    color: 'white',
                    textAlign: 'center',
                    }}>Follow</Text>
                </View>
                <View style={styles.name}>
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>nama</Text>
                    <Text style={{fontSize: 15, color: 'grey'}}>@Username</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                <View style={styles.follow}>
                    <View>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>500 </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, color: 'grey'}}>Followers</Text>
                    </View>
                </View>
                <View style={styles.follow}>
                    <View>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>500 </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, color: 'grey'}}>Followers</Text>
                    </View>
                </View>
                </View>
                
            </View>
            <View style={styles.posts}>
                <Text>Bagian POST</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header:{
        flex: 1,
        
    },
    profpic: {

        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
        paddingHorizontal: 10
    },
    posts: {
        flex: 1,
        backgroundColor: 'black'
    },
    name: {
        flex: 0.5,
        backgroundColor: 'blue',
        paddingHorizontal: 10
    },
    follow: {
        flexDirection: 'row',
        backgroundColor: 'red',
        paddingBottom: 15
    }

})