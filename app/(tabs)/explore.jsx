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
  const [status, setStatus] = useState(false);

  console.log(filterValueLocation);

  useEffect(() => {
    getEvents({
      columnNam: 'user_id',
      value: `${user.user_id}`,
      not_equal: true,
      status: 'active',
    })
      .then((eventsData) => {
        console.log('hello', eventsData);
        setEventsData(eventsData);
      })
      .catch((error) => {
        console.error('Failed to fetch events:', error);
      });
  }, [filterValueLocation, filterValueCategory, status]);

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
        </View>
        <EventsList
          events={eventsData}
          filterValueLocation={filterValueLocation}
          setStatus={setStatus}
        />
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
