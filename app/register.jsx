import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useContext } from 'react';
import { createUser, getUsers } from './api';
import UserContext from './contexts/UserContext';

const Register = () => {
  const [newUser, setNewUser] = useState({});
  const { user, loginCreateProfile } = useContext(UserContext);

  const router = useRouter();

  function handleInputChange(field, value) {
    setNewUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }
  function handleSubmit() {
    const { date_of_birth, email } = newUser;
    console.log(newUser);
    if (!isOver18(date_of_birth)) {
      alert('You must be at least 18 years old to register.');
      return;
    }

    getUsers().then((users) => {
      const emailExists = users.some((user) => user.email === email);

      if (emailExists) {
        alert('Email has been used. Please try another one');
      } else {
        createUser(newUser)
          .then(() => {
            loginCreateProfile(email);
          })
          .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
          });
      }
    });
  }
  function isOver18(dateString) {
    const dob = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))) {
      return true;
    }

    return false;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          id="first_name"
          autoCapitalize="words"
          onChangeText={(text) => handleInputChange('first_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          id="last_name"
          autoCapitalize="words"
          onChangeText={(text) => handleInputChange('last_name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          id="address"
          onChangeText={(text) => handleInputChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (YYYY-MM-DD)"
          id="date_of_birth"
          onChangeText={(text) => handleInputChange('date_of_birth', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          id="email"
          onChangeText={(text) => handleInputChange('email', text)}
        />

        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <Link href="/login" style={styles.link}>
          Log In
        </Link>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#003049',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 32,
  },
  link: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
});
