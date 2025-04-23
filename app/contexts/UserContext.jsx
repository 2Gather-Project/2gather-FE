import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { postLogIn } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Load user data from AsyncStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUser();
  }, []);

  const login = (email) => {
    return postLogIn(email).then(({ user }) => {
      setUser(user);
      // Save user data to AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(user));
      router.push('/(tabs)');
    });
  };

  const loginCreateProfile = (email) => {
    return postLogIn(email).then(({ user }) => {
      setUser(user);
      // Save user data to AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(user));
      router.push('/create-profile');
    });
  };

  const logOut = async () => {
    setUser(null);
    // Remove user data from AsyncStorage
    await AsyncStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, loginCreateProfile, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
export default UserContext;
