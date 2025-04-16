import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import CreateEvent from '../components/CreateEvent';
export default function newEvent() {
  return (
    <>
      <Stack.Screen options={{ title: 'New Event' }} />
      <View style={styles.container}>
        <CreateEvent />
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