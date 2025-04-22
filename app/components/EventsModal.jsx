import { Button, Modal, StyleSheet, Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { ScrollView } from "react-native";



function EventsModal({ visible, onClose, events, setFilterValueCategory, setFilterValueLocation, setEventsData}) {

    const uniqueLocations = [...new Set(events.map((event) => (event.location)))]
    const uniqueCategories = [...new Set(events.map((event) => (event.category)))]

    const handleReset = () => {
       setEventsData(events)
        onClose()
    }

    return (
        < Modal animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}  >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                <TouchableOpacity style={styles.applyButton} onPress={handleReset}>
                            <Text style={styles.applyButtonText}>Reset</Text>
                </TouchableOpacity>
                    <Text style={styles.title}>Filter by Location</Text>
                    <ScrollView style={styles.scrollView}>
                        {uniqueLocations.map((location) => (
                            <TouchableOpacity
                                key={location}
                                onPress={() => {
                                    setFilterValueLocation(location)
                                    onClose()
                                }}
                            >
                                <Text style={styles.text} >{location}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={styles.title}>
                        Filter by Category
                    </Text>
                    <ScrollView style={styles.scrollView}>
                        {uniqueCategories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                onPress={() => {
                                    setFilterValueCategory(category)
                                    onClose()
                                }}
                            >
                                <Text style={styles.text} >{category}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.applyButton} onPress={onClose}>
                            <Text style={styles.applyButtonText}>Apply Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    scrollView: {
        marginBottom: 15,
        maxHeight: 120,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 5,
    },
   text: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});


export default EventsModal;