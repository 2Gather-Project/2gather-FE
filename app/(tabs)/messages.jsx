import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    // Sample data - replace with actual data fetching logic
    { id: '1', sender: 'Sarah', lastMessage: 'Hey! Are you coming to the event tomorrow?', time: '10:30 AM', unread: true },
    { id: '2', sender: 'Mike', lastMessage: 'The meetup was great! Let\'s do it again soon', time: 'Yesterday', unread: false },
    { id: '3', sender: 'Jessica', lastMessage: 'I\'m thinking about organizing a hiking trip next weekend', time: 'Yesterday', unread: true },
    { id: '4', sender: 'David', lastMessage: 'Thanks for the coffee yesterday!', time: 'Monday', unread: false },
  ]);

  const handleMessagePress = (messageId) => {
    // Navigate to individual message screen
    router.push(`/message/${messageId}`);
  };

  const renderMessage = ({ item }) => (
    <TouchableOpacity 
      style={styles.messageItem} 
      onPress={() => handleMessagePress(item.id)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.sender.charAt(0)}</Text>
        </View>
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <Text 
          style={[styles.messageText, item.unread && styles.unreadText]} 
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="chatbubble-ellipses-outline" size={80} color="#669BBC" />
      <Text style={styles.emptyText}>You have no messages</Text>
      <Text style={styles.emptySubText}>When you connect with others, your conversations will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Messages',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#003049',
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("New message")}>
              <Ionicons name="create-outline" size={24} color="#669BBC" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#669BBC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#C1121F',
    borderWidth: 2,
    borderColor: 'white',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
  },
  messageTime: {
    fontSize: 12,
    color: '#888888',
  },
  messageText: {
    color: '#555555',
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#333333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%',
  },
});