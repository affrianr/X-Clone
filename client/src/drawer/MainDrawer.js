
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserProfile from '../pages/UserProfile';
import MainTabs from '../tabs/MainTabs';
import Profile from '../pages/Profile';

const Drawer = createDrawerNavigator()

export default function MainDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      drawerHideStatusBarOnOpen: false,
      drawerStyle: { 
        backgroundColor: 'black', 
        paddingTop: 50,
      },
      headerShown: false,
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
    }}>
      <Drawer.Screen name="MainTabs" component={MainTabs}  />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}