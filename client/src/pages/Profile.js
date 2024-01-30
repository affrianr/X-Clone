import { gql, useQuery } from "@apollo/client";
import { View, Text, StyleSheet, Image } from "react-native";


const GET_USER = gql`
        query Profile($getFollowerId: ID, $getUserDetailId: ID, $getFollowingId: ID) {
                getFollower(id: $getFollowerId) {
                    followerId
                    username
                }
                getUserDetail(id: $getUserDetailId) {
                    avatar
                    email
                    name
                    username
                }
                getFollowing(id: $getFollowingId) {
                    followingId
                    username
                }
        }
`

export default function Profile({}){
    const {loading, error, data} = useQuery(GET_USER)
    console.log(loading, error, data)
    return(
        <>
            <View style={{flex: 1, backgroundColor: 'black'}}>
                <View style={styles.header}>
                <Image 
                      source={{uri: 'https://public.urbanasia.com/images/post/2022/09/20/1663640333-IU.jpg'}}
                      style={{height: '100%', width: '100%'}}
                      />
                </View>
                <View style={styles.profpic}>
                <Image 
                      source={{uri: data?.getUserDetail?.avatar ? data.getUserDetail.avatar : 'https://static.wikia.nocookie.net/iandyou/images/c/cc/IU_profile.jpeg/'}}
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
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>{data?.getUserDetail?.name}</Text>
                    <Text style={{fontSize: 15, color: 'grey'}}>@{data?.getUserDetail?.username}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10
                }}>
                <View style={styles.follow}>
                    <View>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{data?.getFollower?.length ? data.getFollower.length : 0 } </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, color: 'grey'}}>Followers</Text>
                    </View>
                </View>
                <View style={styles.follow}>
                    <View>
                        <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>{data?.getFollowing?.length ? data.getFollowing.length : 0 } </Text>
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
        backgroundColor: 'black',
    },
    profpic: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    posts: {
        flex: 1,
        backgroundColor: 'black'
    },
    name: {
        flex: 0.5,
        backgroundColor: 'black',
        paddingHorizontal: 10
    },
    follow: {
        flexDirection: 'row',
        paddingBottom: 15,
        backgroundColor: 'black',
        padding: 10
    }

})