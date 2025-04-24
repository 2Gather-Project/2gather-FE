import { useContext, useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { UserContext } from './contexts/UserContext';
import { fetchApprovedEvents } from './api';
import UpcomingEventCard from './UpcomingEventCard';
import EventCard from './components/EventCard';

export default function UpcomingEvents() {
    const { user } = useContext(UserContext);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            // Only fetch if we have a user
            if (user && user.user_id) {
                setIsLoading(true);
                fetchApprovedEvents(user.user_id)
                    .then((events) => {
                        setError(null);
                        setUpcomingEvents(events);
                    })
                    .catch((err) => {
                        setError(err);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }, [user])
    );

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

    const handleEventPress = (event) => {
        if (event.user_id === user.user_id) {
            router.push(`/event/${event.event_id}`);
        } else {
            // Pass setStatus function through URL params
            router.push(`/SingleEvent?event_id=${event.event_id}`);
        }
    };

    return (
        <View style={styles.container}>
            {upcomingEvents.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>You don't have any upcoming events.</Text>
                    <TouchableOpacity
                        style={styles.exploreButton}
                        onPress={() => router.push('/(tabs)/explore')}>
                        <Text style={styles.exploreButtonText}>Find Events</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={upcomingEvents}
                    keyExtractor={(item) => item.event_id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleEventPress(item)}>
                            <UpcomingEventCard event={item} />
                            {/* <EventCard
                                title={item.title}
                                location={item.location}
                                date={item.event_date}
                                time={item.time}
                                id={item.user_id}
                                key={item.event_id}
                                event_id={item.event_id}
                                image_url={item.image_url}
                                description={item.description}
                            /> */}

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
    },
});
