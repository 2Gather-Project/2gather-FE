import { useRoute } from '@react-navigation/native';
import { router, Stack, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text } from 'react-native';
import { View } from 'react-native-web';
import Explore from './(tabs)/explore';
import { Ionicons } from '@expo/vector-icons';
import { Background } from '@react-navigation/elements';

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

  const handleAttendance = async () => {
    // const res = await PATCH( event_id, host_id, user_id, user_status="request", user_approved = "false")
    console.log("Holla attendance")
  }

  const handleCancelation = async () => {
    // const res = await PATCH
    // if(res.user_status!== "cancel" ) {
    //   res.user_status = "cancel"
    //   res.user_approved = "false"
    // }
    console.log("Holla cancel")

  }


  return (
    <>
      <View style={styles.button}>
        <Button onPress={() => router.push("/explore")} title={<Ionicons name="arrow-back" color="white" size={15} /> }/>
      </View>
      <View style={styles.container}>
        <View style={styles.imageContainer} >
          <Image

            style={styles.logo}
            source="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="

          />
        </View>
        <View style={styles.text}>

          <Text style={styles.title}>{event.title}</Text>
          <Text style={{ textAlign: "center" }}>Host by Carlos</Text>
          <Text style={{ textAlign: "center", display:"flex", alignItems:"center", alignContent:"center", justifyContent:"center"}}>
            <Ionicons name="calendar" color="#669BBC" size={15} />
            Event Date{"  |  "}
             <Ionicons name="time" color="#669BBC" size={15} />
            {event.time}
          </Text>
          <Text style={{ textAlign: "center" }}>
            <Ionicons name="pin" color="#669BBC" size={15} />
            {event.location}
          </Text>
          <Text>{event.description}</Text>
        </View>
        <View style={styles.attendanceButtons}>
          <Button onPress={handleAttendance} color="green" title="Attend"></Button>
          <Button onPress={handleCancelation} color="#C1121F" title='Cancel attendance'></Button>
        </View>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    width: "80%",
    height: "50%",
    marginBottom: 20,

  },
  logo: {
    width: "100%",
    height: "100%",
  },
  text: {
    // flexWrap: 'wrap',
    // flex: 2,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // display: 'flex',
    justifyContent: "flex-start",
    // alignItems: 'center',
    // overflow: 'visible',
  },
  title: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    alignContent: "flex-end",
    padding: 20,
    width: 90
  },
  attendanceButtons: {
    display: "flex",
    gap: 20,
    margin: 30,
  },

});
