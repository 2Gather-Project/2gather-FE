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
import { patchEventImage, postNewEvent } from '../services/eventsAPI';
import { Button, Image } from 'react-native-web';
import * as ImagePicker from 'expo-image-picker';

export default function CreateEvent() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true);
  const router = useRouter();
  const [error, setIsError] = useState({});
  const [photo, setPhoto] = useState(null);
  const [tags, setTags] = useState([]);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedTags, setSelectedTags] = useState([]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [addEvent, setAddEvent] = useState({
    user_id: `${user.user_id}`,
    category: 'OTHER',
    event_date: `${currentDate.toJSON()}`,
    image_url: user?.image_url || '',
  });

  useEffect(() => {
    const callTags = async () => {
      try {
        const res = await getTags();
        setTags(res);
      } catch (error) {
        setIsError(error);
      }
    };
    callTags();
  }, []);

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to change your profile picture!');
      }
    });
  }, []);

  const compressImage = async () => {
    const file = await ImageManipulator.manipulateAsync(addEvent.image_url, [], { compress: 0.5 });

    addEvent.image_url = file.uri;
  };

  const pickImage = async () => {
    // Only allow picking an image when in edit mode
    if (!isEditing) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5, // Lowered quality to reduce size
      base64: true, // Always request base64 data
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      // Make sure we have base64 data
      if (!selectedAsset.base64) {
        alert('Unable to process image. Please try another one.');
        return;
      }

      // Create a data URI from the base64 string
      const imageSource = `data:image/jpeg;base64,${selectedAsset.base64}`;

      // Update the profile state with the base64 data URI
      setAddEvent({
        ...addEvent,
        image_url: imageSource,
      });
    }
  };

  // Formatted date and time for display
  const formattedDate = date.toLocaleDateString();

  console.log('User is:', user);
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  function handleChange(event) {
    event.preventDefault();
    setAddEvent((addEvent) => {
      return { ...addEvent, [event.target.id]: `${event.target.value}` };
    });
  }

  // const handleUploadPhoto = () => {
  //   const data = createFormData(photo, { event_id: `${addEvent.event_id}` || '' });
  //   console.log(data);
  //   patchEventImage(addEvent)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log('response', response);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // };

  // const handleChoosePhoto = () => {
  //   console.log('handleChoosePhoto');
  //   launchImageLibrary({ noData: true }, (response) => {
  //     console.log(response);
  //     if (response) {
  //       setPhoto(response);
  //     }
  //   });
  // };

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
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
      setAddEvent((addEvent) => {
        return { ...addEvent, category: `${selectedTags}` };
      });
    }
  };

  const handlePost = () => {
    console.log('pressed post');
    compressImage();
    const addEventForUser = async () => {
      try {
        const res = await postNewEvent(addEvent);
        console.log(res);
      } catch (error) {
        setIsError(error);
      }
    };
    addEventForUser();
    router.back();
  };

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
                <View style={styles.profileImage}>
                  <Ionicons name={isEditing ? 'add' : 'person'} size={40} color="white" />
                </View>
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
              onChange={handleChange}
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
        <TextInput
          style={styles.input}
          id="location"
          onChange={handleChange}
          value={addEvent.location || ''}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={addEvent.description || ''}
          id="description"
          onChange={handleChange}
          multiline
        />

        {/* <Text style={styles.label}>Add a link</Text>
        <TextInput
          style={styles.input}
          id="link"
          value={addEvent.link || ''}
          onChange={handleChange}
          placeholder="https://..."
        /> */}

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
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
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
  editImageBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#C1121F',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
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
    height: 180,
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
