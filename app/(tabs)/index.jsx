import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';
import UpcomingEvents from '../UpcomingEvents';

const dummyEvents = [
  { id: '1', title: 'Tech Meetup', date: '2025-04-20', location: 'Manchester' },
  { id: '2', title: 'Art Exhibition', date: '2025-04-25', location: 'York' },
  { id: '3', title: 'Cooking Class', date: '2025-05-01', location: 'Sheffield' },
];

const EventItem = ({ title, date, location }) => (
  <View style={styles.eventItem}>
    <Text style={styles.eventTitle}>{title}</Text>
    <Text>
      {date} • {location}
    </Text>
  </View>
);

export default function Home() {
  const navigation = useNavigation();
  const [isError, setIsError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // React.useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       // const res = await GET endpoint
  //       // setUpcomingEvent(res)
  //     } catch (error) {
  //       setIsError(error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchEvents()
  // }, [])

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>Welcome to 2Gather!</Text>
        <Text>Find events near you</Text>
      </View>

      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        <UpcomingEvents />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#003049',
  },
  welcomeSection: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  featuredSection: {
    padding: 16,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
  },
  seeAllLink: {
    color: '#C1121F',
  },
  eventItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#c5eaed',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#e91e63',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
});
