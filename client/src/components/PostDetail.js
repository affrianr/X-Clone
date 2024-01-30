import { StyleSheet, Text, View, Dimensions, Button, Image, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_POST_DETAIL = gql`
query GetPostDetail($getPostDetailId: ID!) {
  getPostDetail(id: $getPostDetailId) {
    content
    _id
    tags
    imgUrl
    authorId
    author {
      username
      name
      avatar
    }
    comments {
      content
      username
      createdAt
      updateAt
    }
    likes {
      username
      createdAt
      updateAt
    }
    createdAt
    updateAt
  }
}
`

export default function PostDetail({ route }){
    const { postId } = route.params
    console.log(postId, 'post detail ==================')
    const navigation = useNavigation()
    const {loading, error, data} = useQuery(GET_POST_DETAIL,  {
        variables: {
            getPostDetailId: postId
        }
    })
    console.log(data.getPostDetail)

    return (
        <>
            <View style={styles.postContainer} >
                  <View style={styles.postHead}>
                    <View style={styles.postAvatar}>
                      <Image 

                    //   source={{uri: data.getPostsDetail.author.avatar ? data.getPostsDetail.author.avatar : 'https://i.pinimg.com/736x/a6/32/b2/a632b24a1ced508e96d4d0b1d9b60215.jpg'}}
                      style={{height: 50, width: 50, borderRadius: 50}}
                      />
                    </View>
                     <View style={styles.postName}>
                      <Text style={{color: 'white', fontSize: 16}}>{data.getPostDetail.author.name}</Text>
                     </View>
                    <View style={styles.postUsername}>
                      <Text style={{color: 'grey', fontWeight: 'bold', fontSizrrre: 14, flexWrap: 'wrap'}}>@{data.getPostDetail.author.username}</Text>
                    </View>
                  </View>
                  <View style={styles.postBody} >
                    <View style={styles.postBodyText} >
                      <Text style={{color: 'white', fontSize: 14}} onPress={()=> navigation.navigate('Post')} >{data.getPostDetail.content}</Text>
                    </View>
                    <View style={styles.postBodyImage}>
                    <Image 
                    source={{uri: data.getPostDetail.imgUrl}}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        resizeMode: 'cover'
                    }}
                    />
                    </View>
                  </View>
                  <View style={styles.postFooter}>
                    <View>
                    <MaterialCommunityIcons name="comment-outline" size={20} color="grey" onPress={()=> navigation.navigate('Comment', {
                      postId: data.getPostDetail._id
                    })} />
                    </View>
                    <View>
                    <MaterialCommunityIcons name="repeat-variant" size={26} color="grey" onPress={()=> alert('Retweet')} />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="cards-heart-outline" size={20} color="grey" onPress={async ()=> 
                    { 
                      if(!loading){
                        await like({
                          variables: {
                            newLike: {
                              postId: data.getPostDetail._id
                            }
                          }
                        })
                      }
                    }
                    } /><Text></Text>
                    </View>
                  </View>
            </View>
        </>
    )
}

const screenSize = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  }

const styles = StyleSheet.create({
    postContainer: {
      marginTop: 20,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.4,
      borderColor: '#202121',
      height: screenSize.height/3,
      borderRadius: 5
    },
    postHead: {
      flex: 1,
      flexDirection: 'row-reverse',
      width: '100%',
      backgroundColor: 'black',
      flexDirection: 'row',
      gap: 15,
      padding: 2
    },
    postBody: {
      flex: 5,
      width: '77%',
      backgroundColor: 'black',
      marginLeft: 60,
      justifyContent: 'center'
    },
    postFooter: {
      flex: 0.6,
      flexDirection: 'row',
      justifyContent : 'space-evenly',
      alignContent: 'center',
      alignItems: 'center',
      width: '95%',
      backgroundColor: 'black'
    },
    postAvatar:{
      backgroundColor: 'black',
      marginLeft: 5,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 15,
    },
    postName: {
      flexShrink: 1,
      backgroundColor: 'black',
    },
    postUsername: {
      backgroundColor: 'black',
      textAlignVertical: 'center',
      marginRight: 5,
    },
    postBodyText: {
      flex: 1,
      backgroundColor: 'black'
    },
    postBodyImage: {
      flex: 3,
      height: screenSize.height/1.5,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',

    },
    footer: {
      flex: 0.2,
      flexDirection: 'row',
      padding: 10,
      backgroundColor: 'black',
      justifyContent: 'start',
    }
  });