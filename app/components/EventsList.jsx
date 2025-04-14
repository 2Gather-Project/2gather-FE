// import { FlatList, View } from "react-native"
import React from 'react';
import { EventCard } from "./EventCard";
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 22,
    width: "100%"
  },
  item: {
    flex: 1,
    // padding: 10,
    fontSize: 18,
    // height: 110,
    // width: 100,
    // margin: 4,
  },
});

export const EventsList = () => {

    return (
        <>
            <View style={styles.container}>
                <FlatList style={{width: "100%"}}  data={[
                    {key: <EventCard/>},
                    {key: <EventCard/>},
                    {key: <EventCard/>},
                    {key: <EventCard/>},
                    {key: <EventCard/>},
                ]} 
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                />           
            </View>

        </>

    )
}