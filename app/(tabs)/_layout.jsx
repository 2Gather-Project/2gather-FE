import { Link, Tabs, useRouter } from 'expo-router';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
// import { HeaderButton } from '../../components/HeaderButton';
// import { TabBarIcon } from '../../components/TabBarIcon';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const router = useRouter();

  const goToProfile = () => {
    router.push('/profile');
  };


  const goToCreateEvent = () => {
    router.push('/createEvent');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{

          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', padding: '20px', alignItems: 'center' }}>

              <TouchableOpacity onPress={goToCreateEvent} style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Event</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToProfile} style={{ marginRight: 15, marginLeft: 15 }}>
                <Ionicons name="person-circle-outline" color="#333" size={36} />
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
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({

  createButton: {
    backgroundColor: '#C1121F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingRight: 30,

  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',

  }

})