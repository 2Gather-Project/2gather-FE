import { StyleSheet, View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState({
    bio: '',
    interests: '',
    gender: '',
    location: '',
    personality: '',
    favoriteFood: '',
    usingAppFor: '',
    jobTitle: '',
    petOwner: 'no',
    beveragePreference: 'coffee'
  });

  const handleLogout = () => {
    // Add logout logic here
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#003049',
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Ionicons 
                name={isEditing ? "checkmark-outline" : "pencil-outline"} 
                size={24} 
                color="#669BBC" 
              />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <TouchableOpacity 
            style={styles.floatingEditButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Ionicons 
              name={isEditing ? "checkmark-outline" : "pencil-outline"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          <View style={styles.card}>
            <TouchableOpacity style={styles.imageContainer}>
              <View style={styles.profileImage}>
                <Ionicons name="add" size={40} color="white" />
              </View>
              <Text style={styles.addPictureText}>Add picture</Text>
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="document-text-outline" size={18} color="#C1121F" style={styles.fieldIcon} />
                  <Text style={styles.label}>Bio</Text>
                </View>
                <TextInput
                  style={styles.bioInput}
                  multiline
                  editable={isEditing}
                  value={profile.bio}
                  onChangeText={(text) => setProfile({...profile, bio: text})}
                  placeholder="Write something about yourself..."
                  placeholderTextColor="#AAAAAA"
                />
              </View>

              {[
                { label: 'Interests', key: 'interests', icon: 'heart-outline' },
                { label: 'Gender', key: 'gender', icon: 'person-outline' },
                { label: 'Location', key: 'location', icon: 'location-outline' },
                { label: 'Personality', key: 'personality', icon: 'sparkles-outline' },
                { label: 'Favourite food', key: 'favoriteFood', icon: 'restaurant-outline' },
                { label: "I'm using this app for...", key: 'usingAppFor', icon: 'help-circle-outline' },
                { label: 'Job Title', key: 'jobTitle', icon: 'briefcase-outline' },
              ].map((field) => (
                <View key={field.key} style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <Ionicons name={field.icon} size={18} color="#C1121F" style={styles.fieldIcon} />
                    <Text style={styles.label}>{field.label}</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    editable={isEditing}
                    value={profile[field.key]}
                    onChangeText={(text) => setProfile({...profile, [field.key]: text})}
                    placeholderTextColor="#AAAAAA"
                  />
                </View>
              ))}

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="paw-outline" size={18} color="#C1121F" style={styles.fieldIcon} />
                  <Text style={styles.label}>Pet owner?</Text>
                </View>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      profile.petOwner === 'yes' && styles.toggleButtonActive
                    ]}
                    onPress={() => isEditing && setProfile({...profile, petOwner: 'yes'})}
                  >
                    <Text style={profile.petOwner === 'yes' ? styles.toggleTextActive : styles.toggleText}>yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      profile.petOwner === 'no' && styles.toggleButtonActive
                    ]}
                    onPress={() => isEditing && setProfile({...profile, petOwner: 'no'})}
                  >
                    <Text style={profile.petOwner === 'no' ? styles.toggleTextActive : styles.toggleText}>no</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Ionicons name="cafe-outline" size={18} color="#C1121F" style={styles.fieldIcon} />
                  <Text style={styles.label}>Coffee or tea?</Text>
                </View>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      profile.beveragePreference === 'coffee' && styles.toggleButtonActive
                    ]}
                    onPress={() => isEditing && setProfile({...profile, beveragePreference: 'coffee'})}
                  >
                    <Text style={profile.beveragePreference === 'coffee' ? styles.toggleTextActive : styles.toggleText}>coffee</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      profile.beveragePreference === 'tea' && styles.toggleButtonActive
                    ]}
                    onPress={() => isEditing && setProfile({...profile, beveragePreference: 'tea'})}
                  >
                    <Text style={profile.beveragePreference === 'tea' ? styles.toggleTextActive : styles.toggleText}>tea</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  floatingEditButton: {
    position: 'absolute',
    top: 10,
    right: 30,
    backgroundColor: '#C1121F',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#669BBC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FDF0D5',
  },
  addPictureText: {
    color: '#003049',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldIcon: {
    marginRight: 8,
  },
  label: {
    color: '#003049',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  bioInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    height: 100,
    textAlignVertical: 'top',
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  toggleButtonActive: {
    backgroundColor: '#669BBC',
    borderColor: '#669BBC',
  },
  toggleText: {
    color: '#333333',
  },
  toggleTextActive: {
    color: 'white',
  },
  errorText: {
    color: '#C1121F',
  },
  logoutButton: {
    backgroundColor: '#780000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    marginTop: 10,
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
