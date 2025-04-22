import { createContext, useState } from "react";
import { useRouter } from "expo-router";
import { postLogIn } from '../api'

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

    return <UserContext.Provider value={{ user, setUser, login }}>{children}</UserContext.Provider>

}

export { UserContext, UserProvider }
export default UserContext;
