import { Link } from 'expo-router';
import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <View style={styles.logoImageContainer}>
        <Image style={styles.logoImage} source={require('../assets/image.png')} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImageContainer: {
    width: 210,
    height: 210,
    borderRadius: 100,
    marginBottom: 200,
    borderColor: '#003049',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
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
