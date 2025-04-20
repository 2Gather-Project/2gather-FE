import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { UserContext } from './contexts/UserContext';
import { postLogIn } from './api'
import ErrorMessage from './components/ErrorMessage'

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState(false)

    const handleLogIn = () => {

        if (email.length !== 0) {
            postLogIn(email).then((data) => {
                setUser(data)
                setError(false)
                setTimeout(() => {
                    router.push('/(tabs)');
                }, 50);


            }).catch((err) => {
                setError(err)
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={text => {
                        setEmail(text)
                        setError(false)
                    }}
                    placeholder="Email"
                    keyboardType="email-address"

                />
                <TextInput
                    style={styles.input}

                    placeholder="Password"

                />
                {error && <ErrorMessage error={error} />}
                <TouchableOpacity
                    disabled={error}
                    style={styles.button}
                    onPress={handleLogIn}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
                <Link href="(tabs)" style={[styles.button, styles.buttonText, { backgroundColor: '#669BBC', color: 'white' }]}>Google</Link>

            </View>

            <View style={styles.footer}>
                <Text>Don't have an account? </Text>
                <Link href="/register" style={styles.link}>Create Account</Link>
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
        textAlign: 'center'
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