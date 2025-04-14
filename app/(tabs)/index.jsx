// import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

// import { useRouter } from 'expo-router';
// import { useState } from 'react';

export default function Home() {
  // const [isLoggedIn, setisLoggedIn] = useState(false);
  // const router = useRouter();
  // const handleLogIn = () => {
  //   setisLoggedIn(true);
  //   router.replace('/(tabs)');

  // }
  return (

    <View style={styles.container}>
      <Text>Placeholder for events</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  actionLinkText: {
    color: '#d7fc03',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#e91e63',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',

  },
  actionsSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
