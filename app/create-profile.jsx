import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { patchUser } from './api';
import ImageViewer from './components/ImageViewer';
import UserContext from './contexts/UserContext';

const ProfileForm = () => {
  const { user, setUser } = useContext(UserContext);

  const [beveragePreference, setBeveragePreference] = useState(null);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const [profileData, setProfileData] = useState({});
  const router = useRouter();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setSelectedImage(base64Image);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  function handleInputChange(field, value) {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }
  useEffect(() => {
    if (user?.user_id) {
      setProfileData((prevData) => ({
        ...prevData,
        user_id: user.user_id,
        address: user.address,
      }));
    }
  }, [user]);

  async function handleSubmit() {
    try {
      const dataWithUserId = {
        ...profileData,
        user_id: user.user_id,
        image_url: selectedImage || null, // Optional: Just store the URI for now
      };
      console.log(dataWithUserId);
      const updatedUser = await patchUser(dataWithUserId);
      console.log('User updated:', updatedUser);
      setUser(updatedUser);
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('There was an error updating your profile.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create your profile</Text>
      <View style={styles.formContainer}>
        {/* Profile Picture */}

        <TouchableOpacity
          style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}
          onPress={pickImageAsync}>
          {selectedImage ? (
            <>
              <ImageViewer selectedImage={selectedImage} size={45} />
              <Text style={styles.addPictureText}>Change profile picture</Text>
            </>
          ) : (
            <>
              <AntDesign name="picture" color="#333" size={45} />
              <Text style={styles.addPictureText}>Add profile picture</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Bio */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            multiline
            placeholder="Write a short bio about yourself..."
            onChangeText={(text) => handleInputChange('bio', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Interests</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`interests`, text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`gender`, text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Personality</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`personality`, text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Favourite food</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`fav_food`, text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>I'm using this app for...</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`reason`, text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(`job_title`, text)}
          />
        </View>

        {/* Coffee or tea selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Coffee or tea?</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                beveragePreference === 'coffee' && styles.selectedOption,
              ]}
              onPress={() => {
                handleInputChange(`coffee_tea`, 'coffee');
                setBeveragePreference('coffee');
              }}>
              <Text
                style={[
                  styles.optionText,
                  beveragePreference === 'coffee' && styles.selectedOptionText,
                ]}>
                team coffee
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, beveragePreference === 'tea' && styles.selectedOption]}
              onPress={() => {
                handleInputChange(`coffee_tea`, 'tea');
                setBeveragePreference('tea');
              }}>
              <Text
                style={[
                  styles.optionText,
                  beveragePreference === 'tea' && styles.selectedOptionText,
                ]}>
                team tea
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity>
          <Link href="(tabs)" style={styles.safeButton} onPress={handleSubmit}>
            Save
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: '003049',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addPictureText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    alignContent: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#669BBC',
    borderColor: '#003049',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  safeButton: {
    backgroundColor: '#003049',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
    textAlign: 'center',
    color: 'white',
  },
});
