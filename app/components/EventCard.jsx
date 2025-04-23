import { Link } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function EventCard({ title, location, time, event_id, image_url }) {
  console.log('Inside event card:', title, event_id);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.tinyLogo}
            source={
              image_url
                ? image_url
                : {
                    uri: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=',
                  }
            }
          />
        </View>
        <View style={styles.textContainer}>
          <Pressable onPress={() => navigation.navigate('SingleEvent', { event_id: event_id })}>
            <Text style={styles.title}>{title}</Text>
          </Pressable>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
});
