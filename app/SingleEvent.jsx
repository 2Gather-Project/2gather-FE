import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import { Button, Image, StyleSheet, Pressable, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserContext from './contexts/UserContext.jsx';
import { getEventById } from './services/eventsAPI';
import { EventAttendanceButtons } from './components/EventAttendanceButtons';

export default function SingleEvent() {
  const [event, setEvent] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const router = useRouter();
  const params = useLocalSearchParams();
  const event_id = params.event_id;

  useEffect(() => {
    const fetchSingleEvent = async () => {
      if (!event_id) {
        setIsError(new Error('No event ID provided'));
        setIsLoading(false);
        return;
      }
      
      try {
        const res = await getEventById(event_id);
        console.log('Event information:', res);
        setEvent(res);
      } catch (error) {
        console.error('Error fetching event:', error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleEvent();
  }, [event_id]);

  const handleBack = () => {
    router.replace('/(tabs)');
  };

  // Loading state
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#669BBC" />
      </View>
    );
  }

  // Error state
  if (isError) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error loading event: {isError.message}</Text>
        <TouchableOpacity onPress={handleBack} style={styles.errorButton}>
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // No event found state
  if (!event) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Event not found</Text>
        <TouchableOpacity onPress={handleBack} style={styles.errorButton}>
          <Text style={styles.errorButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formattedDate = new Date(event.event_date).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(`${event.event_date}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: "Event Details",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#003049',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={handleBack}
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={24} color="#003049" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => router.push('/profile')} 
              style={styles.headerButton}
            >
              {user?.image_url ? (
                <View style={styles.profileImageContainer}>
                  <Image source={{ uri: user.image_url }} style={styles.profileImage} />
                </View>
              ) : (
                <Ionicons name="person-circle-outline" color="#003049" size={24} />
              )}
            </TouchableOpacity>
          ),
        }} 
      />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={{
              uri: event?.image_url
                ? event.image_url
                : 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=',
            }}
          />
        </View>

        <View style={styles.text}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.host}>
            <Pressable
              onPress={() => router.push({
                pathname: '/HostProfile',
                params: { userId: event.host_id }
              })}
              style={{ alignSelf: 'center' }}>
              <Text style={styles.host}>
                Hosted by {event.host_first_name} {event.host_last_name}
              </Text>
            </Pressable>
          </Text>
          <Text style={styles.details}>
            <Ionicons name="calendar" color="#669BBC" size={15} />
            {formattedDate} at {formattedTime}
          </Text>
          <Text style={styles.details}>
            <Ionicons name="pin" color="#669BBC" size={15} />
            {event.location}
          </Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
        <EventAttendanceButtons event={event} event_id={event_id} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: '90%',
    height: 175,
    resizeMode: 'cover',
    borderRadius: 20,
    marginVertical: 16,
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  details: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  profileImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#003049',
    borderWidth: 1,
    padding: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#C1121F',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: '#003049',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
