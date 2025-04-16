import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import HostedEventCard from './components/HostedEventCard';

export default function HostedEvents() {
  const router = useRouter();
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Coffee and gossip',
      date: 'tue, apr 8',
      time: '6:30 PM',
      location: 'Starbucks, City Center',
      attendees: 5,
      status: 'upcoming',
      requests: [
        { id: '1', user: 'John Doe', status: 'pending' },
        { id: '2', user: 'Jane Smith', status: 'accepted' }
      ]
    },
    {
      id: '2',
      title: 'Book Club Meeting',
      date: 'wed, apr 9',
      time: '7:00 PM',
      location: 'City Library',
      attendees: 8,
      status: 'upcoming',
      requests: [
        { id: '3', user: 'Alice Johnson', status: 'pending' }
      ]
    }
  ]);

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
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/create-event')}
              style={styles.createButton}
            >
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
                onPress={() => router.push('/create-event')}
              >
                <Text style={styles.createEventText}>Create an Event</Text>
              </TouchableOpacity>
            </View>
          ) : (
            events.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => router.push(`/event/${event.id}`)}
                activeOpacity={0.7}
              >
                <HostedEventCard event={event} />
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