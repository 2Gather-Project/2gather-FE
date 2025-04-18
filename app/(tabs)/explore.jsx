import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import EventsList from '../components/EventsList';
import { useState } from 'react';
import DropdownComponent from '../components/Dropdown';

export default function Explore() {
  const [category, setCategory] = useState('');
  return (
    <>
      <Stack.Screen options={{ title: 'Explore' }} />
      <View style={styles.container}>
        <DropdownComponent title="Category Filter" />
        <DropdownComponent title="Sort By" />
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
