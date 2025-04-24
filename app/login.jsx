import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import ErrorMessage from './components/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(UserContext);
  const [error, setError] = useState(false);

  const handleLogIn = () => {
    if (email.length !== 0) {
      return login(email).catch((err) => {
        setError(err);
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoImageContainer}>
        <Image style={styles.logoImage} source={require('../assets/image.png')} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(false);
          }}
          placeholder="Email"
          keyboardType="email-address"
        />
        {error && <ErrorMessage error={error} />}
        <TouchableOpacity disabled={error} style={styles.button} onPress={handleLogIn}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Link
          href="(tabs)"
          style={[
            styles.button,
            styles.buttonText,
            { backgroundColor: '#669BBC', color: 'white' },
          ]}>
          Google
        </Link>
      </View>

      <View style={styles.footer}>
        <Text>Don't have an account? </Text>
        <Link href="/register" style={styles.link}>
          Create Account
        </Link>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImageContainer: {
    width: 210,
    height: 210,
    borderRadius: 100,
    marginBottom: 100,
    borderColor: '#003049',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
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
