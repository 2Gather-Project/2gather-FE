import { Link } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function EventCard({ title, location, time, id }) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.tinyLogo}
            source="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
          />
        </View>
        <View style={styles.text}>
          <Pressable
            onPress={() =>
              navigation.navigate('SingleEvent', {
                event_id: id,
              })
            }>
            <Text style={styles.title}>{title}</Text>
          </Pressable>
          <Text>{time}</Text>
          <Text>{location}</Text>
        </View>
      </View>
    </>
  );
}

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
