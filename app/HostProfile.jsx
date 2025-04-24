import { useRoute } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getEventById } from './services/eventsAPI';
import { getUserById } from './api';
import HostProfileCard from './HostProfileCard';

export default function HostProfile() {

  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  // get logged in user TODO
  const route = useRoute();
  const { userId } = route.params;

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const res = await getUserById(userId);
        setUser(res);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserById();
  }, [userId]);

  return (
    <>

      <View style={styles.container}>
        <HostProfileCard user={user} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderColor: '#003049',
    borderWidth: 1,
    padding: 4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
    marginBottom: 10,
  },
  host: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  attendanceButtons: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    width: '50%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  attendButton: {
    backgroundColor: '#28A745', // Green
  },
  cancelButton: {
    backgroundColor: '#DC3545', // Red
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: '20%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'flex-start',
    backgroundColor: '#DC3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // para Android
    borderRadius: 8,
    margin: 10,
  },
});
