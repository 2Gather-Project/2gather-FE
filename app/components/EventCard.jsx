import { Text, View, Image, StyleSheet } from "react-native"
// import { red } from "react-native-reanimated/lib/typescript/Colors";

export const EventCard = () => {

    return (
        <>
            <View style={styles.container}>

                <Image style={styles.tinyLogo} source="https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" />
                <View>
                    <Text>Event Title</Text>
                    <Text>Event Time</Text>
                    <Text>Event Date</Text>
                    <Text>Event Category</Text>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        borderBlockColor: "red",
        borderStyle: "solid",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"

    },
    tinyLogo: {
        width: 80,
        height: 80,
        margin: 10
    },
    logo: {
        width: 66,
        height: 58,
    },
});