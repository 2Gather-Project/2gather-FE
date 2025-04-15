import { useNavigation } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function HostedEventCard({ title, location, time, id }) {
  const navigation = useNavigation();
  return (
    <>
      <View style={[styles.container, styles.eventItem]}>
        <View>
          <AntDesign name="picture" color="#333" size={45} style={{ marginRight: 20 }} />
        </View>
        <View style={styles.text}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HostedEventPage', {
                event_id: id,
              })
            }>
            <Text style={styles.title}>{title}</Text>

          </TouchableOpacity>
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
  eventItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#c5eaed',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#e91e63',
  }
});
