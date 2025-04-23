import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getUserById } from '../api';
import { useRouter } from "expo-router";

const UserInfo = ({ user_id }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        getUserById(user_id)
            .then(user => {
                setUserInfo(user);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, [user_id]);

    if (isLoading) {
        return <Text>Loading user information...</Text>;
    }

    if (error) {
        return <Text>Error loading user information</Text>;
    }

    return (
        <View>
            <TouchableOpacity onPress={() => router.push(`/HostProfile?userId=${user_id}`)}>
                {userInfo && (
                    <Text>
                        {userInfo.first_name} {userInfo.last_name}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default UserInfo;