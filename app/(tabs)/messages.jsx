import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Messages() {
  return (
    <>
      <Stack.Screen options={{ title: 'Messages' }} />
      <View style={styles.container}>
        {/* <ScreenContent path="app/(tabs)/two.tsx" title="Tab Two" /> */}
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