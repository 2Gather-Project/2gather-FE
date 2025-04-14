import { Stack } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, Text, View } from 'react-native';
import { EventsList } from '../components/EventsList';
import { useState } from 'react';
import Dropdown from "../components/Dropdown";

// import { ScreenContent } from '~/components/ScreenContent';

export default function Explore() {

  const [category, setCategory] = useState("");
  return (
    <>
      <Stack.Screen options={{ title: 'Explore' }} />
      <View style={styles.container}>
        <Dropdown title= " Category Filter"/>
        <Dropdown title= "Sort_by"/>
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
