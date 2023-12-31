import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopNav = createStackNavigator();

const CustomNavigationBar = ({ navigation }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 16, paddingTop: 30 }}>
    <Ionicons name="menu" size={30} color="#C12267" onPress={() => navigation.openDrawer()} />
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Ionicons name="file-tray" size={30} color="#C12267" />
      <Ionicons name="location-outline" size={30} color="#C12267" />
      <Ionicons name="notifications-outline" size={30} color="#C12267" />
    </View>
  </View>
);



const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        header: () => <CustomNavigationBar navigation={navigation} />,
        title: '', 
      }}
    />
  </Stack.Navigator>
);

const InfoStack = () => {
  return (
    <View>
      <Text>Info Screen</Text>
    </View>
  );
};

const SettingsStack = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

const CartStack = () => {
  return (
    <View>
      <Text>cart Screen</Text>
    </View>
  );
};

const ProfileStack = () => {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
};



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Info') {
              iconName = 'information-circle';
            } else if (route.name === 'Cart') {
              iconName = 'cart';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },   
            headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: '#C12267',
          inactiveTintColor: 'gray',
          headerShown: false,
        }}
        
      >
        <Tab.Screen name="Home" component={HomeStack}  />
        <Tab.Screen name="Info" component={InfoStack} />
        <Tab.Screen name="Cart" component={CartStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
