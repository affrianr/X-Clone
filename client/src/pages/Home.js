import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import Post from '../components/Post';
import Header from '../components/Header';
import { useQuery, gql } from '@apollo/client';

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

export default function Home(){
    const { loading, error, data } = useQuery(GET_POST)
    
    return(
        <>
           <SafeAreaView style={styles.droidSafeArea}>
            <View style={{
                ...styles.container, 
                }}>
                    
                <Header />
                {
                    loading && <ActivityIndicator size="small" color="#0000ff" />
                }{
                    !loading && <FlatList
                    data={data.getPosts}
                    renderItem={({item, index}) => <Post key={index} posts={item} />}
                    />
                }
                
                <StatusBar style="inverted" />
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
})


  
 