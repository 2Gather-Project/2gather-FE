import { Link, Tabs } from 'expo-router';

// import { HeaderButton } from '../../components/HeaderButton';
// import { TabBarIcon } from '../../components/TabBarIcon';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color}  size={24}/>,
          headerRight: () => (
            <Ionicons name="person-circle-outline" color="#333"  size={36}/>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" color={color} size={24}/>,
          headerRight: () => (
            <Ionicons name="person-circle-outline" color="#333"  size={36}/>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" color={color} size={24}/>,
          headerRight: () => (
            <Ionicons name="person-circle-outline" color="#333"  size={36}/>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <AntDesign name="message1" color={color} size={24}/>,
          headerRight: () => (
            <Ionicons name="person-circle-outline" color="#333"  size={36}/>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
    </Tabs>
  );
}
