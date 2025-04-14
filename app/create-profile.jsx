import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';
import { Link } from 'expo-router';

import addImage from '../assets/add-image.jpg'

const ProfileForm = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create your profile</Text>
            <View style={styles.formContainer}>
                {/* Profile Picture */}
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Image source={addImage} style={styles.img} />

                        <Text style={styles.addPictureText}>Add profile picture</Text>
                    </TouchableOpacity>

                </View>
                {/* Bio */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Bio</Text>
                    <TextInput
                        style={styles.bioInput}
                        multiline
                        placeholder="Write a short bio about yourself..."
                    />
                </View>

                {['Interests', 'Gender', 'Location', 'Personality', 'Favourite food', "I'm using this app for...", 'Job Title'].map((label) => (
                    <View key={label} style={styles.inputGroup}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput style={styles.input} />
                    </View>
                ))}

                {/* Pet owner selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Are you a pet owner?</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>no</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Coffee or tea selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Coffee or tea?</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>team coffee</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Text style={styles.optionText}>team tea</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <TouchableOpacity >
                    <Link href="(tabs)" style={styles.safeButton}>Save</Link>
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
        backgroundColor: 'white'
    },
    img: {

        height: '100px',
        width: '100px',


    },
    title: {
        fontSize: 24,
        color: '003049',
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    imagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#BDFFC2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#88C28D',
    },
    addImageIcon: {
        fontSize: 32,
        color: '#333',
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
    safeButton: {
        backgroundColor: '#003049',
        padding: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 8,
        textAlign: 'center',
        color: 'white'
    },
});