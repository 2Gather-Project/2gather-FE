import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Image, Dimensions, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useContext, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from './contexts/UserContext';
import { patchUser } from './api';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const editButtonScale = useRef(new Animated.Value(1)).current;
  const editIconRotate = useRef(new Animated.Value(0)).current;
  const closeButtonScale = useRef(new Animated.Value(1)).current;
  const closeIconRotate = useRef(new Animated.Value(0)).current;
  const [profile, setProfile] = useState({
    address: user?.address || '',
    bio: user?.bio || '',
    coffee_tea: user?.coffee_tea || 'coffee',
    date_of_birth: user?.date_of_birth || '',
    email: user?.email || '',
    fav_food: user?.fav_food || '',
    first_name: user?.first_name || '',
    gender: user?.gender || '',
    image_url: user?.image_url || '',
    job_title: user?.job_title || '',
    personality: user?.personality || '',
    reason: user?.reason || '',
    last_name: user?.last_name || '',
    phone_number: user?.phone_number || '',
    user_id: user?.user_id || 0
  });

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to change your profile picture!');
      }
    })
  }, [])

  const pickImage = async () => {
    // Only allow picking an image when in edit mode
    if (!isEditing) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,  // Lowered quality to reduce size
      base64: true,  // Always request base64 data
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
      setProfile({
        ...profile,
        image_url: imageSource
      });
    }
  };

  const handleToggleEdit = () => {
    // Animation for button press
    Animated.sequence([
      Animated.timing(editButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(editButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation for icon rotation
    Animated.timing(editIconRotate, {
      toValue: isEditing ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Toggle edit mode
    setIsEditing(!isEditing);
  };

  const iconRotation = editIconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSave = () => {
    // Add save logic here
    setIsEditing(false);
    // Reset icon rotation
    Animated.timing(editIconRotate, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return patchUser(profile).then(user => {
      setUser(user);
    })
  };

  const handleLogout = () => {
    // Add logout logic here
    router.replace('/');
  };

  const handleBackToMenu = () => {
    // Animation for button press
    Animated.sequence([
      Animated.timing(closeButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(closeButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation for icon rotation
    Animated.timing(closeIconRotate, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Toggle edit mode
      setIsEditing(!isEditing);
      // router.push('/(tabs)');
    });
  };

  const closeIconRotation = closeIconRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        {isEditing &&
          <Animated.View style={{ transform: [{ scale: closeButtonScale }] }}>
            <TouchableOpacity
              onPress={handleBackToMenu}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <Animated.View style={{ transform: [{ rotate: closeIconRotation }] }}>
                <Ionicons name="close" size={22} color="white" />
              </Animated.View>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        }
        <Animated.View style={{ transform: [{ scale: editButtonScale }] }}>
          <TouchableOpacity
            onPress={isEditing ? handleSave : handleToggleEdit}
            style={[styles.editButton, isEditing && styles.saveEditButton]}
            activeOpacity={0.7}
          >
            <Animated.View style={{ transform: [{ rotate: iconRotation }] }}>
              <Ionicons
                name={isEditing ? "checkmark-outline" : "pencil-outline"}
                size={22}
                color="white"
              />
            </Animated.View>
            <Text style={styles.buttonText}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Cover Photo Section */}
        <View style={styles.coverPhotoContainer}>
          <View style={styles.coverPhoto} />
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity
              style={styles.imageContainer}
              disabled={!isEditing}
              onPress={pickImage}
            >
              {profile.image_url ? (
                <Image
                  source={{ uri: profile.image_url }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.profileImage}>
                  <Ionicons name={isEditing ? "add" : "person"} size={40} color="white" />
                </View>
              )}
              {isEditing && (
                <View style={styles.editImageBadge}>
                  <Ionicons name="camera" size={14} color="white" />
                </View>
              )}
            </TouchableOpacity>
            <Text style={styles.profileName}>{profile.first_name + ' ' + profile.last_name || "Username"}</Text>
            <Text style={styles.profileTagline}>@{profile.email || "user"} </Text>
          </View>
        </View>

        <View style={styles.profileContainer}>
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-circle-outline" size={22} color="#003049" />
              <Text style={styles.sectionTitle}>About Me</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="document-text-outline" size={18} color="#C1121F" style={styles.fieldIcon} />
                  <Text style={styles.label}>Bio</Text>
                </View>
                <TextInput
                  style={[styles.bioInput, !isEditing && styles.inactiveInput]}
                  multiline
                  editable={isEditing}
                  value={profile.bio}
                  onChangeText={(text) => setProfile({ ...profile, bio: text })}
                  placeholder="Write something about yourself..."
                  placeholderTextColor="#AAAAAA"
                  focusable={isEditing}
                />
              </View>

              {[
                { label: 'First Name', key: 'first_name', icon: 'person-outline', placeholder: '...' },
                { label: 'Last Name', key: 'last_name', icon: 'person-outline', placeholder: '...' },
                { label: 'Date of birth', key: 'date_of_birth', icon: 'calendar-outline', placeholder: 'YYYY-MM-DD' },
                { label: 'Email', key: 'email', icon: 'mail-outline', placeholder: 'your@email.com' },
                { label: 'Gender', key: 'gender', icon: 'person-outline', placeholder: 'Male, Female, Non-binary...' },
                { label: 'Address', key: 'address', icon: 'location-outline', placeholder: 'City, Country' },
                { label: 'Personality', key: 'personality', icon: 'sparkles-outline', placeholder: 'Outgoing, Introvert, Creative...' },
                { label: 'Favourite food', key: 'fav_food', icon: 'restaurant-outline', placeholder: 'Italian, Sushi, Burgers...' },
                { label: "I'm using this app for...", key: 'reason', icon: 'help-circle-outline', placeholder: 'Meeting new people, finding events...' },
                { label: 'Job Title', key: 'job_title', icon: 'briefcase-outline', placeholder: 'Software Engineer, Designer...' },
                { label: 'Coffee or Tea?', key: 'coffee_tea', icon: 'heart-outline', placeholder: 'Tea or Coffee' },
              ].map((field) => (
                <View key={field.key} style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <Ionicons name={field.icon} size={18} color="#C1121F" style={styles.fieldIcon} />
                    <Text style={styles.label}>{field.label}</Text>
                  </View>
                  <TextInput
                    style={[styles.input, !isEditing && styles.inactiveInput]}
                    editable={isEditing}
                    value={profile[field.key]}
                    onChangeText={(text) => setProfile({ ...profile, [field.key]: text })}
                    placeholder={field.placeholder}
                    placeholderTextColor="#AAAAAA"
                    focusable={isEditing}
                  />
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isEditing && (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Ionicons name="save-outline" size={22} color="white" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF2F5',
  },
  header: {
    backgroundColor: '#669BBC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
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
  imageContainer: {
    alignItems: 'center',
    position: 'relative',
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
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003049',
    marginTop: 8,
  },
  profileTagline: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  profileContainer: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003049',
    marginLeft: 8,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 18,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  fieldIcon: {
    marginRight: 8,
  },
  label: {
    color: '#003049',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    fontSize: 15,
  },
  inactiveInput: {
    backgroundColor: '#F8F8F8',
    color: '#555555',
    outlineStyle: 'none',
  },
  bioInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    height: 100,
    textAlignVertical: 'top',
    fontSize: 15,
    outlineStyle: 'none',
  },
  logoutButton: {
    backgroundColor: '#780000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#C1121F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#003049',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  saveEditButton: {
    backgroundColor: '#C1121F',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 6,
  },
  closeButton: {
    backgroundColor: '#780000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
});