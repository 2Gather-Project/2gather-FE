import EventCard from './EventCard';
import { FlatList, StyleSheet, View } from 'react-native';

export default function EventsList({ events }) {
  // const events = [
  //   {
  //     creator_id: 1,
  //     title: 'Come and visit the Natural History Museum with me!',
  //     description: 'Visit the museum and chat about history and life.',
  //     location: 'London',
  //     time: '13:00:00',
  //     created_at: '2025-04-14',
  //   },
  //   {
  //     creator_id: 2,
  //     title: 'Coffee and a chat',
  //     description: 'Lets gossip!',
  //     location: 'Nottingham',
  //     time: '14:00:00',
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 3,
  //     title: 'Board game cafe',
  //     description: "I'll beat you of course ;)",
  //     location: 'Lincoln',
  //     time: '15:00:00',
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 4,
  //     title: 'Coffee & Coding',
  //     description: 'Pair up with another dev or hobbyist to work on your side projects at a café.',
  //     location: 'London',
  // //     time: '13:00:00',
  //     created_at: '2025-04-20',
  //   },
  //   {
  //     creator_id: 5,
  //     title: 'Sketch & Chill',
  //     description: 'Bring a sketchpad and hang out at a scenic spot, sketching and chatting.',
  //     location: 'Edinburgh',
  //     time: '14:00:00',
  //     created_at: '2025-04-20',
  //   },
  //   {
  //     creator_id: 6,
  //     title: 'Street Food Lunch',
  //     description: 'Grab a bite and discover new flavors together at the city’s food market.',
  //     location: 'Manchester',
  //     time: '14:15:00',
  //     created_at: '2025-04-26',
  //   },
  //   {
  //     creator_id: 7,
  //     title: 'Bookshop Hangout',
  //     description:
  //       'Browse books and chat about your favorite reads at a local independent bookstore.',
  //     location: 'Bristol',
  //     time: '11:00:00',
  //     created_at: '2025-04-14',
  //   },
  // ];

  // console.log(events)

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={events}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              location={item.location}
              date={item.event_date}
              time={item.time}
              id={item.user_id}
              key={item.event_id}
              event_id={item.event_id}
              image_url={item.image_url}
            />
          )}
          keyExtractor={(item) => item.event_id.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 22,
    width: '100%',
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
  },
});
