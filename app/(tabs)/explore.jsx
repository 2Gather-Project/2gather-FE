import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { EventsList } from '../components/EventsList';

// import { ScreenContent } from '~/components/ScreenContent';

export default function Explore() {


  return (
    <>
      <Stack.Screen options={{ title: 'Explore' }} />
      <View style={styles.container}>
        <EventsList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
