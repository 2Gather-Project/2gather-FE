import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,

} from 'react-native';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';


const ProfileForm = () => {

    const [isPetOwner, setIsPetOwner] = useState(null);
    const [beveragePreference, setBeveragePreference] = useState(null);
    const [isAdult, setIsAdult] = useState(null);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create your profile</Text>
            <View style={styles.formContainer}>
                {/* Profile Picture */}


                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <AntDesign name="picture" color="#333" size={45} />
                    <Text style={styles.addPictureText}>Add profile picture</Text>
                </TouchableOpacity>


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
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                isPetOwner === 'yes' && styles.selectedOption
                            ]}
                            onPress={() => setIsPetOwner('yes')}
                        >
                            <Text style={[
                                styles.optionText,
                                isPetOwner === 'yes' && styles.selectedOptionText
                            ]}>yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                isPetOwner === 'no' && styles.selectedOption
                            ]}
                            onPress={() => setIsPetOwner('no')}
                        >
                            <Text style={[
                                styles.optionText,
                                isPetOwner === 'no' && styles.selectedOptionText
                            ]}>no</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Coffee or tea selection */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Coffee or tea?</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                beveragePreference === 'coffee' && styles.selectedOption
                            ]}
                            onPress={() => setBeveragePreference('coffee')}
                        >
                            <Text style={[
                                styles.optionText,
                                beveragePreference === 'coffee' && styles.selectedOptionText
                            ]}>team coffee</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                beveragePreference === 'tea' && styles.selectedOption
                            ]}
                            onPress={() => setBeveragePreference('tea')}
                        >
                            <Text style={[
                                styles.optionText,
                                beveragePreference === 'tea' && styles.selectedOptionText
                            ]}>team tea</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Are you 18?*/}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Are you 18 or over?</Text>
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                isAdult === 'yes' && styles.selectedOption
                            ]}
                            onPress={() => setIsAdult('yes')}
                        >
                            <Text style={[
                                styles.optionText,
                                isAdult === 'yes' && styles.selectedOptionText
                            ]}>yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.optionButton,
                                isAdult === 'no' && styles.selectedOption
                            ]}
                            onPress={() => setIsAdult('no')}
                        >
                            <Text style={[
                                styles.optionText,
                                isAdult === 'no' && styles.selectedOptionText
                            ]}>no, bye</Text>
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
    selectedOption: {
        backgroundColor: '#669BBC',
        borderColor: '#003049',
    },
    selectedOptionText: {
        color: 'white',
        fontWeight: 'bold',
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