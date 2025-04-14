import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';


const Register = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Your age"

                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry
                />

                <TouchableOpacity>
                    <Link href="/create-profile" style={[styles.button, styles.buttonText]}>Create Account</Link>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text>Already have an account? </Text>
                <Link href="/login" style={styles.link}>Log In</Link>

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