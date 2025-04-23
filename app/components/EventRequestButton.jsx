import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { postEventUserActivity } from '../api';

export default function EventRequestButton({ event, currentUserId }) {
  const handleRequest = async () => {
    try {
      await postEventUserActivity(event.event_id, event.user_id, currentUserId);
      // You might want to show a success message or update the UI here
    } catch (err) {
      console.error('Error requesting to attend event:', err);
      // You might want to show an error message here
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={handleRequest}
    >
      <Text style={styles.buttonText}>Request to Attend</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#669BBC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 