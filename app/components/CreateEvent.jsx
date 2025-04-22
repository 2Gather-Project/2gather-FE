import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { postNewEvent } from '../services/eventsAPI';

export default function CreateEvent() {
  const router = useRouter();
  const [error, setIsError] = useState({});
  const [eventTitle, setEventTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Formatted date and time for display
  const formattedDate = date.toLocaleDateString();

  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }

    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(selectedTime);
    }

    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  const tags = [
    'cooking',
    'dog walking',
    'coffee date',
    'lunch',
    'dinner',
    'theatre',
    'cinema',
    'movies',
    'festivals',
    'concerts',
    'food',
    'market',
    'shopping',
    'pets',
    'fitness',
    'gym',
    'hiking',
    'bird watching',
    'fishing',
    'casual walk',
  ];

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePost = () => {
    console.log('pressed post');
    const addEvent = async () => {
      try {
        const res = await postNewEvent();
      } catch (error) {
        setIsError(error);
        //   } finally {
        //     setIsLoading(false);
        //   }
      }
    };
    addEvent();
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Create your new event</Text>
      </View>

      <ScrollView style={styles.form}>
        <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
          <AntDesign name="picture" color="#333" size={45} />
          <Text style={styles.addPictureText}>Add event picture</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Event Title</Text>
        <TextInput style={styles.input} value={eventTitle} onChangeText={setEventTitle} />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
          <Text>{formattedDate}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              {...(Platform.OS === 'ios' && {
                style: { width: '100%', backgroundColor: 'white' },
              })}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowDatePicker(false)}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
          <Text>{formattedTime}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <View>
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              {...(Platform.OS === 'ios' && {
                style: { width: '100%', backgroundColor: 'white' },
              })}
            />
            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowTimePicker(false)}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Add a link</Text>
        <TextInput
          style={styles.input}
          value={link}
          onChangeText={setLink}
          placeholder="https://..."
        />

        <Text style={styles.label}>Tag</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagButton, selectedTags.includes(tag) && styles.tagButtonSelected]}
              onPress={() => toggleTag(tag)}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#003049',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    width: '100%',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003049',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagButton: {
    backgroundColor: '#caf6fa',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  tagButtonSelected: {
    backgroundColor: '#669BBC',
    borderWidth: 1,
    borderColor: '#60C080',
  },
  tagText: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: '#003049',
    borderRadius: 5,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: '#003049',
    borderRadius: 5,
    padding: 15,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '500',
    color: 'white',
  },
  dateTimeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  addPictureText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    alignContent: 'center',
  },
});
