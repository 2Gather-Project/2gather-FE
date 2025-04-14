
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';


export default function LandingPage() {

    return (

        <View style={styles.container}>

            <View style={styles.actionsSection}>

                <Link href="/login" style={[styles.actionButton, styles.actionLinkText]}>Log In</Link>
                <Link href="/register" style={[styles.actionButton, styles.actionLinkText]}>Register</Link>


            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center'
    },
    actionLinkText: {
        color: 'white',
        fontWeight: 'bold',
    },
    actionButton: {
        backgroundColor: '#003049',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 8,
        textAlign: 'center'

    },
    actionsSection: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
