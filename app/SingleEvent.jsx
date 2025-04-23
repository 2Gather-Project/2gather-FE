import { useRoute } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import { Button, Image, StyleSheet, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserContext from './contexts/UserContext.jsx';
import { getEventById } from './services/eventsAPI';
import { EventAttendanceButtons } from './components/EventAttendanceButtons';

export default function SingleEvent() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState({});
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const { user } = useContext(UserContext);

  const navigation = useNavigation();
  const route = useRoute();
  const { user_id, event_id, setStatus } = route.params;

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const res = await getEventById(event_id);
        console.log(res, 'event information');
        setEvent(res);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleEvent();
  }, [event_id]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://twogather-backend.onrender.com/api/events/${event_id}`
        );
        const data = await response.json();
        console.log('Fetched user data:', data);
        setUser(data.events ? data.events[0] : {});
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsUserLoading(false);
      }
    };
    if (user_id) {
      fetchEvent();
    }
  }, [user_id]);

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

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => router.push('(tabs)')} style={styles.iconButton}>
          <Ionicons name="home" size={30} color="#003049" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/explore')}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => router.push('/profile')} style={{ marginHorizontal: 15 }}>
          {user?.image_url ? (
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: user.image_url }} style={styles.profileImage} />
            </View>
          ) : (
            <Ionicons name="person-circle-outline" color="#333" size={36} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header />
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
              onPress={() => navigation.navigate('HostProfile', { userId: event.host_id })}
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
        <EventAttendanceButtons event={event} event_id={event_id} setStatus={setStatus} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  backButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileImageContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderColor: '#003049',
    borderWidth: 1,
    padding: 4,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 4,
  },
});
