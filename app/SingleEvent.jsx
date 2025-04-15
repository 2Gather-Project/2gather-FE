import { useRoute } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-web';
import Explore from './(tabs)/explore';
import { Ionicons } from '@expo/vector-icons';

export default SingleEvent = () => {
  const event = {
    creator_id: 1,
    title: 'Come and visit the Natural History Museum with me!',
    description: 'Visit the museum and chat about history and life.',
    location: 'London',
    time: '13:00:00',
    created_at: '2025-04-14',
  };
  const navigation = useNavigation();
  const route = useRoute();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { event_id } = route.params;
  //   const [event, setEvent] = useState({});

  const goToProfile = () => {
    router.push('/profile');
  };

  //   React.useEffect(() => {
  //     const fetchSingleEvent = async () => {
  //       try {
  //         const res = await getSingleEvent(event_id);
  //         setEvent(res);
  //       } catch (error) {
  //         setIsError(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  // fetchSingleEvent();
  //   }, [event_id])

  return (
    <>
      {/* <Stack.Screen options={{ title: 'Event' }} /> */}
      <View>
        <View>
          <Image
            style={styles.tinyLogo}
            source="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{event.title}</Text>
          <Text>Host by</Text>
          <Text>Event Date</Text>
          <Text>{event.time}</Text>
          <Text>{event.description}</Text>
          <Text>{event.location}</Text>
        </View>
        <Button onPress={() => navigation.goBack()}>Go back</Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopColor: '003049',
    borderTopStyle: 'solid',
    borderTopWidth: 2,
    padding: 16,
    marginTop: 10,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    margin: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
  text: {
    flexWrap: 'wrap',
    flex: 2,
    flexDirection: 'column',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'left',
    overflow: 'visible',
  },
  title: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
