import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { UserContext } from './contexts/UserContext';
import { fetchApprovedEvents } from './api'
import UpcomingEventCard from './UpcomingEventCard';

export default function UpcomingEvents() {
    const { user } = useContext(UserContext);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (user && user.user_id) {
            fetchApprovedEvents(user.user_id)
                .then((events) => {
                    setError(null)
                    setIsLoading(false)
                    setUpcomingEvents(events);

                }).catch(err => {
                    setIsLoading(false)
                    setError(err)
                })
        }
    }, [user]);


    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error loading events: {error.message}</Text>
            </View>
        );
    }


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading your upcoming events...</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            {upcomingEvents.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>You don't have any upcoming events.</Text>
                    <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={() => router.push('/(tabs)/explore')}
                    >
                        <Text style={styles.exploreButtonText}>Find Events</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={upcomingEvents}
                    keyExtractor={(item) => item.event_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => router.push(`/event/${item.event_id}`)}>
                            <UpcomingEventCard event={item} />
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#003049',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    exploreButton: {
        marginTop: 16,
        backgroundColor: '#003049',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    exploreButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
});


