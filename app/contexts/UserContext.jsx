import { createContext, useState } from 'react';
import { useRouter } from 'expo-router';
import { postLogIn } from '../api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = (email) => {
    return postLogIn(email).then(({ user }) => {
      setUser(user);
      router.push('/(tabs)');
    });
  };

  const loginCreateProfile = (email) => {
    return postLogIn(email).then(({ user }) => {
      setUser(user);
      router.push('/create-profile');
    });
  };

  const logOut = () => {
    setUser(null);
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
