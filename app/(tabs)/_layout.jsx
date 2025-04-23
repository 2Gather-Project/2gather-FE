import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, Tabs, useRouter } from 'expo-router';
import { useContext } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
// import { HeaderButton } from '../../components/HeaderButton';
// import { TabBarIcon } from '../../components/TabBarIcon';

import UserContext from '../contexts/UserContext';

export default function TabLayout() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const goToProfile = () => {
    router.push('/profile');
  };

  const goToHostedEvents = () => {
    router.push('/HostedEvents');
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
          headerTitleAlign: 'left',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', padding: '20px', alignItems: 'center' }}>
              <TouchableOpacity onPress={goToHostedEvents} style={styles.createButton}>
                <Text style={styles.createButtonText}>Hosted Events</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15, marginLeft: 15 }}>
                {user?.image_url ? (
                  <Image source={{ uri: user.image_url }} style={styles.profileImageIcon} />
                ) : (
                  <Ionicons name="person-circle-outline" color="#333" size={36} />
                )}
              </TouchableOpacity>
            </View>
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
          ),
        }}
      />
      <Tabs.Screen
        name="create-event"
        options={{
          title: 'New Event',
          tabBarIcon: ({ color }) => <Ionicons name="create-outline" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  createButton: {
    backgroundColor: '#C1121F',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,

    textAlign: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  profileImageIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});
