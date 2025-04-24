import { StyleSheet, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserInfo from './components/UserInfo';

export default function UpcomingEventCard({ event }) {
    const { title, event_date, location, user_id, image_url } = event;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <View style={styles.eventItem}>
            <View style={styles.eventContent}>

                <View style={styles.imageContainer}>
                    <Image
                        style={styles.eventImage}
                        source={
                            image_url
                                ? { uri: image_url }
                                : { uri: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=' }
                        }
                    />
                </View>

                <View style={styles.textContent}>
                    <Text style={styles.eventTitle}>{title}</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={14} color="#555" />
                        <Text style={styles.infoText}>{formatDate(event_date)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={14} color="#555" />
                        <Text style={styles.infoText}>{location}</Text>
                    </View>
                    {user_id && (
                        <View style={styles.infoRow}>
                            <Ionicons name="person-outline" size={14} color="#555" />
                            <View style={styles.infoText}>
                                <UserInfo user_id={user_id} />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    eventItem: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#c5eaed',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    eventContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 12,
    },
    eventImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    textContent: {
        flex: 1,
    },
    eventTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
        color: '#003049',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    infoText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#555',
    },
});