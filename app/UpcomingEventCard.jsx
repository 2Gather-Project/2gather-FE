import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfo from './components/UserInfo';

export default function UpcomingEventCard({ event }) {
  const { title, event_date, location, user_id } = event;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{title}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={14} color="#555" />
        <Text style={styles.infoText}>{formatDate(event_date)}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={14} color="#555" />
        <Text style={styles.infoText}>{location}</Text>
      </View>
      {user_id && (
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={14} color="#555" />
          <View style={styles.infoText}>
            <UserInfo user_id={user_id} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  eventItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#c5eaed',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#003049',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
});
