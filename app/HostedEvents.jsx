import { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import HostedEventCard from './components/HostedEventCard';

export default function HostedEvents() {
    const router = useRouter();

    // Dummy data, would need to be replaced
    const [hostedEvents, setHostedEvents] = useState([
        {
            creator_id: 1,
            title: 'Come and visit the Natural History Museum with me!',
            description: 'Visit the museum and chat about history and life.',
            location: 'London',
            time: '13:00:00',
            created_at: '2025-04-14',
            requests: [
                { id: '101', name: 'George', status: 'pending' },
                { id: '102', name: 'Sarah', status: 'accepted' }
            ]
        },
        {
            creator_id: 2,
            title: 'Science Museum?',
            description: 'Visit the museum and chat about science.',
            location: 'London',
            time: '13:00:00',
            created_at: '2025-04-14',
            requests: [
                { id: '103', name: 'Mike', status: 'pending' },
                { id: '104', name: 'Emma', status: 'pending' }
            ]
        },
        {
            creator_id: 3,
            title: 'Cinema maybe?',
            description: 'The new Batman movie looks interesting...',
            location: 'London',
            time: '13:00:00',
            created_at: '2025-04-14',
            requests: []
        }
    ]);

    const Header = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('(tabs)')}>
                <Ionicons name="home" size={30} color="#003049" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <Ionicons name="person-circle-outline" size={36} color="#003049" />
            </TouchableOpacity>
        </View>

    );

    return (
        <View style={styles.container}>
            <Header />

            <FlatList
                style={{ width: '100%' }}
                data={hostedEvents}
                renderItem={({ item }) => (

                    <HostedEventCard style={styles.eventItem}
                        title={item.title}
                        location={item.location}
                        time={item.time}
                        id={item.creator_id}
                    />
                )}
                keyExtractor={(item) => item.creator_id}
            />

        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: '#669BBC',
        padding: 15,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    eventsList: {
        padding: 10,
    }
});