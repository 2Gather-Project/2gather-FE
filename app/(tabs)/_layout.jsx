import { Link, Tabs, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
// import { HeaderButton } from '../../components/HeaderButton';
// import { TabBarIcon } from '../../components/TabBarIcon';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
          headerRight: () => (
            <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" color="#333" size={36} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="calendar" color={color} size={24} />,
          headerRight: () => (
            <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" color="#333" size={36} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color }) => <Ionicons name="people-outline" color={color} size={24} />,
          headerRight: () => (
            <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" color="#333" size={36} />
            </TouchableOpacity>
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
          tabBarIcon: ({ color }) => <AntDesign name="message1" color={color} size={24} />,
          headerRight: () => (
            <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" color="#333" size={36} />
            </TouchableOpacity>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
    </Tabs>
  );
}
