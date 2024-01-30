import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Home from '../pages/Home';
import Search from '../pages/Search';
import AddPost from '../pages/AddPost';


const HomeStack = createNativeStackNavigator()

function HomeStackScreen(){
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name='HomeStack' component={Home} options={{headerShown: false}} />
        </HomeStack.Navigator>
    )
}

const SearchStack = createNativeStackNavigator()

function SearchStackScreen(){
    return(
        <SearchStack.Navigator>
            <SearchStack.Screen name='SearchStack' component={Search} options={{headerShown: false}} />
        </SearchStack.Navigator>
    )
}

const AddPostStack = createNativeStackNavigator()

function AddPostStackScreen(){
    return(
        <AddPostStack.Navigator>
            <AddPostStack.Screen name='AddPostStack' component={AddPost} options={{headerShown: false}} />
        </AddPostStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default function MainTabs(){
    
    return(
        <>

                <Tab.Navigator screenOptions={{ 
                    headerShown : false,
                    tabBarStyle: {
                        backgroundColor: 'black'
                    },
                    tabBarShowLabel: false
                    }}>
                    <Tab.Screen name="Home" component={HomeStackScreen} options={{
                        tabBarIcon: ()=> <MaterialIcons name="home-filled" size={30} color="white" />
                    }} />
                    <Tab.Screen name="Add Post" component={AddPostStackScreen} options={{
                        tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color="white" />
                    }} />
                    <Tab.Screen name="Search" component={SearchStackScreen} options={{
                        tabBarIcon: ()=> <MaterialIcons name="search" size={30} color="white" />
                    }} />
                    
                </Tab.Navigator>

        </>
    )
}