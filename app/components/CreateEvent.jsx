import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

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
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getTags, postNewEvent } from '../services/eventsAPI';
import ErrorMessage from './ErrorMessage';

export default function CreateEvent() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTags, setSelectedTags] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [addEvent, setAddEvent] = useState({
    user_id: user?.user_id || '',
    category: 'OTHER',
    event_date: `${currentDate.toJSON()}`,
    // image_url: user?.image_url || '',
  });

  useEffect(() => {
    console.log('inside tags');
    const callTags = async () => {
      try {
        const res = await getTags();
        const interestArray = res.map((data) => {
          return data.unnest;
        });

        setTags(interestArray);
        console.log(res);
      } catch (error) {
        setError(error);
      }
    };
    callTags();
  }, []);

  // Formatted date and time for display
  const formattedDate = date.toLocaleDateString();
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  function handleChange(event) {
    event.preventDefault();
    setError(false);
    setAddEvent((addEvent) => {
      return { ...addEvent, [event.target.id]: `${event.target.value}` };
    });
  }

  console.log(addEvent);
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

  const toggleTag = (tag) => {
    setSelectedTags(tag);
    setAddEvent({ ...addEvent, category: `${tag}` });
  };

  const handlePost = () => {
    console.log('pressed post');
    setError(false);
    addEvent.image_url ? compressImage() : null;
    const addEventForUser = async () => {
      try {
        const res = await postNewEvent(addEvent);
        console.log(res);
      } catch (error) {
        setError(error);
      }
    };
    addEventForUser();
    if (!error) {
      router.back();
    }
  };

  const handleCancle = () => {
    setAddEvent({
      user_id: user?.user_id || '',
      category: 'OTHER',
      event_date: `${currentDate.toJSON()}`,
    });
    setError(false);
    router.back();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Please log in to create an event</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Create your new event</Text>
      </View>

      <ScrollView style={styles.form}>
        <View style={styles.coverPhotoContainer}>
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity
              style={styles.imageContainer}
              disabled={!isEditing}
              onPress={pickImage}>
              {addEvent.image_url ? (
                <Image
                  source={{ uri: addEvent.image_url }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../assets/eventsimage.png')}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              )}
              {isEditing && (
                <View style={styles.editImageBadge}>
                  <Ionicons name="camera" size={14} color="white" />
                </View>
              )}
            </TouchableOpacity>
            {/* <Text style={styles.profileName}>
              {profile.first_name + ' ' + profile.last_name || 'Username'}
            </Text>
            <Text style={styles.profileTagline}>@{profile.email || 'user'} </Text> */}
          </View>
        </View>

        <Text style={styles.label}>Event Title</Text>

        <TextInput
          style={styles.input}
          id="title"
          onChange={handleChange}
          value={addEvent.title || ''}
        />

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          style={styles.dateTimeButton}
          id="event_date"
          onPress={() => setShowDatePicker(true)}>
          <Text>{formattedDate}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
          <Text>{formattedTime}</Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker value={time} mode="time" display="default" onChange={onTimeChange} />
        )}

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          id="location"
          onChange={handleChange}
          value={addEvent.location || ''}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          id="description"
          onChange={handleChange}
          value={addEvent.description || ''}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Category</Text>
        <View style={styles.tagsContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagButton, selectedTags === tag && styles.tagButtonSelected]}
              onPress={() => toggleTag(tag)}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancle}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton} onPress={handlePost}>
            <Text style={styles.buttonText}>Create Event</Text>
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  coverPhotoContainer: {
    position: 'relative',
    height: 80,
    marginBottom: 80,
  },
  coverPhoto: {
    height: 140,
    width: '100%',
    backgroundColor: '#669BBC',
    overflow: 'hidden',
  },
  profileImageWrapper: {
    position: 'absolute',
    bottom: -60,
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#669BBC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
});
