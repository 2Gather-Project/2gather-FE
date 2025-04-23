import { Link, useRoute } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';

import { useState, useEffect, useContext } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Explore from './(tabs)/explore';
import { Ionicons } from '@expo/vector-icons';
import { Background } from '@react-navigation/elements';
import {
  getEventById,
  getUserActivityForEvent,
  patchUserActivityForEvent,
  postEventUserActivity,
} from './services/eventsAPI';
import UserContext from './contexts/UserContext';

export default function SingleEvent() {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState({});
  const [activity, setActivity] = useState({});
  const [requested, setRequested] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  //const [allActivities,]
  console.log(requested);

  const navigation = useNavigation();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const route = useRoute();
  const { event_id } = route.params;

  useEffect(() => {
    console.log('inside use effect');
    const fetchSingleEvent = async () => {
      try {
        const res = await getEventById(event_id);
        setEvent(res);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSingleEvent();
    setRequested(false);
    const fetchingUserActivityforEvent = async () => {
      try {
        console.log('inside fetchingUserActivityforEvent');
        const res = await getUserActivityForEvent(event_id);
        console.log('user activity:', res);
        res.filter((act) => {
          if (act.attendee_id === user.user_id && act.user_status === 'REQUESTED') {
            console.log('requested:', requested);
            setRequested(true);
          }
        });
      } catch (error) {
        console.log('error is', error);
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchingUserActivityforEvent();
  }, [event_id]);

  const handleAttendance = async () => {
    // const res = await PATCH( event_id, host_id, user_id, user_status="request", user_approved = "false")
    console.log('Holla attendance');
    const activity = {
      host_id: `${event.host_id}`,
      attendee_id: `${user.user_id}`,
      event_id: `${event.event_id}`,
      user_status: 'REQUESTED',
      user_approved: false,
    };

    setActivity(activity);
    console.log(event.host_id);
    console.log('activity:', activity);
    try {
      const res = await postEventUserActivity(activity);

      console.log(res);
      setCancelled(false);
      //set(res);
    } catch (error) {
      setIsError(error);
    } finally {
      setIsLoading(false);
      // fetchingUserActivityforEvent();
    }
  };

  const handleCancelation = async () => {
    // const res = await PATCH
    // if(res.user_status!== "cancel" ) {
    //   res.user_status = "cancel"
    //   res.user_approved = "false"
    // }
    setActivity({
      host_id: `${event.host_id}`,
      attendee_id: `${user.user_id}`,
      event_id: `${event.event_id}`,
      user_status: 'CANCELLED',
      user_approved: false,
    });
    console.log('Holla cancel');
    try {
      const res = await patchUserActivityForEvent(activity);
      setCancelled(true);
      setRequested(false);
      console.log(res);
      //set(res);
    } catch (error) {
      setIsError(error);
      setCancelled(false);
    } finally {
      setIsLoading(false);
    }
  };

  const formattedTime = new Date(`${event.event_date}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

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
    <>
      <Header />
      {/* <View > */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/explore')}>
        <Text>Back</Text>
      </TouchableOpacity>
      {/* </View> */}
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.logo}
            source={
              event.image_url
                ? event.image_url
                : {
                    uri: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=',
                  }
            }
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.host}>
            <Pressable
              onPress={() => navigation.navigate('HostProfile', { userId: event.host_id })}
              style={styles.seeAllLink}>
              <Text>
                Host by {event.host_first_name} {event.host_last_name}
              </Text>
            </Pressable>
          </Text>
          <Text style={styles.details}>
            <Ionicons name="calendar" color="#669BBC" size={15} />
            Event Date{'  |  '}
            <Ionicons name="time" color="#669BBC" size={15} />
            {formattedTime}
          </Text>
          <Text style={styles.details}>
            <Ionicons name="pin" color="#669BBC" size={15} />
            {event.location}
          </Text>
          <Text style={styles.description}>{event.description}</Text>
        </View>
        <View style={styles.attendanceButtons}>
          <TouchableOpacity
            onPress={handleAttendance}
            style={[styles.button, styles.attendButton]}
            disabled={requested}>
            <Text style={styles.buttonText}>{requested ? 'Requested' : 'Attend'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancelation}
            style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>{cancelled ? 'Cancelled' : 'Cancel Attendance'}</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 10,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  },
  details: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  attendanceButtons: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    width: '50%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  attendButton: {
    backgroundColor: '#28A745', // Green
  },
  cancelButton: {
    backgroundColor: '#DC3545', // Red
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    width: '20%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'flex-start',
    backgroundColor: '#DC3545',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // para Android
    borderRadius: 8,
    margin: 10,
  },
  seeAllLink: {
    color: '#C1121F',
  },
});
