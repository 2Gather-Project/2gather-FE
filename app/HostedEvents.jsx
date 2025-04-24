import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HostedEventCard from './components/HostedEventCard';
import { getHostedEvents } from './api';
import { UserContext } from './contexts/UserContext';

export default function HostedEvents() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletedEvent, setDeletedEvent] = useState(false);

  useEffect(() => {
    const fetchHostedEvents = async () => {
      setDeletedEvent(false);
      if (!user || !user.user_id) {
        setIsLoading(false);
        return;
      }

      try {
        const hostedEvents = await getHostedEvents(user.user_id);
        setEvents(hostedEvents);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHostedEvents();
    console.log('getting hosted event', deletedEvent);
  }, [deletedEvent, user]);

  const handleBack = () => {
    // Navigate to the home tab
    router.replace('/(tabs)');
  };

  // Show loading state while user data is being loaded from AsyncStorage
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // Only show login message if we're sure there's no user
  if (!isLoading && !user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Please log in to view hosted events</Text>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading events...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading events: {error.message}</Text>
      </SafeAreaView>
    );
  }
  console.log(events);
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Hosted Events',
          headerStyle: {
            backgroundColor: '#669BBC',
          },
          headerTintColor: 'white',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/create-event')}
              style={styles.createButton}>
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {events.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#666" />
              <Text style={styles.emptyText}>No hosted events yet</Text>
              <TouchableOpacity
                style={styles.createEventButton}
                onPress={() => router.push('/create-event')}>
                <Text style={styles.createEventText}>Create an Event</Text>
              </TouchableOpacity>
            </View>
          ) : (
            events.map((event) => (
              <TouchableOpacity
                key={event.event_id}
                onPress={() => router.push(`/event/${event.event_id}`)}
                activeOpacity={0.7}>
                <HostedEventCard event={event} setDeletedEvent={setDeletedEvent} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF2F5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  backButton: {
    marginLeft: 8,
    padding: 8,
  },
  createButton: {
    marginRight: 8,
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
  },
  createEventButton: {
    backgroundColor: '#669BBC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createEventText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
