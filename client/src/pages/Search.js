import { View, Text, StyleSheet, SafeAreaView, Image, FlatList } from "react-native";
// import Header from "../components/Header";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import SearchUser from "../components/SearchUser";


const GET_USERS = gql`
    query GetUsers($search: String) {
        getUsers(search: $search) {
            _id
            email
            name
            username
            avatar
        }
}
`

function HeaderSearch(){
    const { loading, error, data, refetch } = useQuery(GET_USERS, {
        variables: {
            search
        }
    })

    // console.log(loading, error, data)

    const [search, setSearch] = useState('')

    const onSubmitted = () => {
        console.log(search, 'ter klik')
        refetch({
            search,
          })
          console.log(data)
    }

    useEffect(()=> {
        if(data){
            // console.log(data)
        }
    }, [data])

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
                <View >
                    <Image source={{ uri: 'https://static.wikia.nocookie.net/iandyou/images/c/cc/IU_profile.jpeg/', width: 30, height: 30 }}
                    style={{borderRadius: 50}}
                    />
                </View>
                <View style={{ width: '50%',}}>
                <Searchbar
                        placeholder="Search"
                          onChangeText={setSearch}
                          onSubmitEditing={onSubmitted}
                        style={{
                            alignItems: 'center',
                            textAlignVertical: 'center'
                        }}
                        />
                </View>
                <View >
                <MaterialCommunityIcons name="cog-outline" size={30} color="black" />
                </View>
                
            </View>
            <View>
                {
                    !loading && <FlatList
                    data={data.getUsers}
                    renderItem={({item, index}) => <SearchUser key={index} users={item} />}
                    />
                }
            </View>
        </>
    )
}


export default function Search(){

    return (
        <>
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.container}>
                <HeaderSearch />
                <View style={styles.searchResult}>
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
      searchResult: {
        
        backgroundColor: 'white'
      }
})