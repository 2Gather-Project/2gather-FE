import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"

                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"

                />


                <Link href="(tabs)" style={[styles.button, styles.buttonText]}>Log In</Link>

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
        backgroundColor: '#e91e63',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    footer: {
        flexDirection: 'row',
        marginTop: 32,
    },
    link: {
        color: '#e91e63',
        fontWeight: 'bold',
    },
});