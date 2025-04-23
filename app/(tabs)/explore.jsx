import { Stack, useFocusEffect } from 'expo-router';
import { Button, StyleSheet, TouchableOpacity, View } from 'react-native';
import EventsList from '../components/EventsList';
import EventsModal from '../components/EventsModal';
import { getEvents } from '../services/eventsAPI';
import { UserContext } from '../contexts/UserContext';

// import React, { useState } from 'react';
import DropdownComponent from '../components/Dropdown';
import { useRoute } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Explore() {
  const { user } = useContext(UserContext);
  const [eventsData, setEventsData] = useState([]);
  const [sortByValue, setSortByValue] = useState(null);
  const [filterValueCategory, setFilterValueCategory] = useState(null);
  const [filterValueLocation, setFilterValueLocation] = useState(null);
  const [filterEvent, setFilterEvent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(filterValueLocation);

  // const route = useRoute();
  // const { location } = route.params

  // const events = [
  //   {
  //     creator_id: 1,
  //     title: 'Come and visit the Natural History Museum with me!',
  //     description: 'Visit the museum and chat about history and life.',
  //     location: 'London',
  //     time: '13:00:00',
  //     category: "football",
  //     created_at: '2025-04-14',
  //   },
  //   {
  //     creator_id: 2,
  //     title: 'Coffee and a chat',
  //     description: 'Lets gossip!',
  //     location: 'Nottingham',
  //     time: '14:00:00',
  //     category: "Meeting",
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 3,
  //     title: 'Board game cafe',
  //     description: "I'll beat you of course ;)",
  //     location: 'Lincoln',
  //     time: '15:00:00',
  //     category: "Chat",
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 4,
  //     title: 'Coffee & Coding',
  //     description: 'Pair up with another dev or hobbyist to work on your side projects at a café.',
  //     location: 'London',
  //     time: '13:00:00',
  //     category: "Movies",
  //     created_at: '2025-04-20',
  //   },
  //   {
  //     creator_id: 5,
  //     title: 'Sketch & Chill',
  //     description: 'Bring a sketchpad and hang out at a scenic spot, sketching and chatting.',
  //     location: 'Edinburgh',
  //     time: '14:00:00',
  //     category: "football",
  //     created_at: '2025-04-20',
  //   },
  //   {
  //     creator_id: 6,
  //     title: 'Street Food Lunch',
  //     description: 'Grab a bite and discover new flavors together at the city’s food market.',
  //     location: 'Manchester',
  //     time: '14:15:00',
  //     category: "Food",
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 7,
  //     title: 'Bookshop Hangout',
  //     description:
  //       'Browse books and chat about your favorite reads at a local independent bookstore.',
  //     location: 'Bristol',
  //     time: '11:00:00',
  //     category: "football",
  //     created_at: '2025-04-14',
  //   },
  // ];

  // useFocusEffect(
  //   useCallback(() => {  //tobe checked

  useEffect(() => {
    getEvents({ columnNam: 'user_id', value: `${user.user_id}`, not_equal: true })
      .then((eventsData) => {
        setEventsData(eventsData);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  }, [filterValueLocation, filterValueCategory]);

  return (
    <>
      <Stack.Screen options={{ title: 'Explore' }} />
      <View style={styles.container}>
        <View style={styles.filter}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="filter" size={30} color="#003049" />
          </TouchableOpacity>
          <EventsModal
            events={eventsData}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            setFilterValueCategory={setFilterValueCategory}
            setFilterValueLocation={setFilterValueLocation}
            setEventsData={setEventsData}
          />
          {/* <DropdownComponent
            title="Sort By"
            events={eventsData}
            sortByValue={sortByValue}
            setSortByValue={setSortByValue}
          /> */}
        </View>
        <EventsList events={eventsData} filterValueLocation={filterValueLocation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  filter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});
