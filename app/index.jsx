import { Link } from 'expo-router';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingleEvent } from './SingleEvent';

function LandingPage() {
  return (
    <View style={styles.container}>
      <View style={styles.actionsSection}>
        <Link href="/login" style={[styles.actionButton, styles.actionLinkText]}>
          Log In
        </Link>
        <Link href="/register" style={[styles.actionButton, styles.actionLinkText]}>
          Register
        </Link>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LandingPage} />
          {/* <Stack.Screen name="Event" component={SingleEvent} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  actionLinkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#003049',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  actionsSection: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
