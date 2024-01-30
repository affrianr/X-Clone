import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { getValueFor } from "../helpers/secureStore";
import { useNavigation } from "@react-navigation/native";


const ADD_POST = gql`
    mutation Mutation($newPost: newPost) {
    addPost(newPost: $newPost) {
        content
        _id
        tags
        imgUrl
        createdAt
        updateAt
        authorId
    }
    }
`
const GET_POST = gql`
    query GetPost {
        getPosts {
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

export default function AddPost() {
    const navigation = useNavigation()
    const [post, {loading, error, data}] = useMutation(ADD_POST, {
        refetchQueries: [
            GET_POST
        ]
    })

    const [postForm, setPostForm] = useState({
        content: '',
        imgUrl: '',
        tags: '',
    })

    const onChangeText = (text, input) => {
        setPostForm(postForm => ({...postForm, [input]: text}));
    };

    useEffect(() => {
        if(!error && !loading && data){
            navigation.goBack()
        }
    }, [data, loading, error])
    
    console.log(postForm)
    return (
        <>
            <SafeAreaView style={styles.droidSafeArea}>
                <View style={styles.container}>
                    <Header />
                    <View >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, margin: 10}}>Add Post</Text>
                    </View>
                    <View style={styles.containerPost}>
                        <TextInput 
                        label='Content'
                        placeholder="Write something..."
                        onChangeText={text => onChangeText(text, 'content')}
                        style={{
                            color: 'white',
                        }}
                        />
                    </View>
                    <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, backgroundColor: 'black', margin:10}}>Image Url</Text>
                    </View>
                    <View style={styles.containerTags}>
                        <TextInput 
                            label='ImageUrl'
                            placeholder="Your Image Link"
                            onChangeText={text => onChangeText(text, 'imgUrl')}
                            style={{
                                color: 'white',
                            }}
                            />
                    </View>
                    <View>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, backgroundColor: 'black', margin:10}}>Tags</Text>
                    </View>
                    <View style={styles.containerTags}>
                        <TextInput 
                            label='Tags'
                            onChangeText={text => onChangeText(text, 'tags')}
                            style={{
                                color: 'white'
                            }}
                            />
                    </View>
                    <View>
                        <Text 
                        style={styles.postPill}
                        onPress={ async ()=> {
                            if(!loading){
                                await post({
                                    variables: {
                                     newPost: {
                                        content: postForm.content,
                                        imgUrl: postForm.imgUrl,
                                        tags: postForm.tags
                                     }
                                    }
                                  })
                            }
                        }}
                        >Post</Text>
                    </View>
                </View>
            </SafeAreaView>
            
        </>
    )
}

const styles = StyleSheet.create({
    droidSafeArea: {
      flex: 1,
      backgroundColor: 'black',
      paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 10,
    },
    containerPost: {
        flex: 5,
        backgroundColor: '#202121',
        padding: 10,
        borderRadius: 5
    },
    containerTags: {
        flex: 1,
        backgroundColor: '#202121',
        tintColor: 'white',
        borderRadius: 5
    },
    postPill: {
        textAlignVertical: 'center',
        textAlign: 'center',
        height: 40,
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: 5,
        marginTop: 10
    }
  })