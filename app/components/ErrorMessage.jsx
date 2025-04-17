import { View, Text } from "react-native-web"
import { StyleSheet } from "react-native"

const ErrorMessage = ({ error }) => {
    return (
        <View style={styles.error}>
            <Text style={{ color: "white" }}>
                Sorry, an error occured: {error.message}

            </Text>

        </View>
    )
}


const styles = StyleSheet.create({

    error: {

        backgroundColor: '#e03a24',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        textAlign: 'center',



    }

})
export default ErrorMessage