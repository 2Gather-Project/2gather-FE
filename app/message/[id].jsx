import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function MessageDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [newMessage, setNewMessage] = useState('');
  const [contact, setContact] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  // Mock data - would be replaced with actual data fetching
  useEffect(() => {
    // Simulate fetching contact and message data
    const mockContacts = {
      '1': { id: '1', name: 'Sarah', status: 'online' },
      '2': { id: '2', name: 'Mike', status: 'offline' },
      '3': { id: '3', name: 'Jessica', status: 'away' },
      '4': { id: '4', name: 'David', status: 'online' },
    };

    const mockMessages = {
      '1': [
        { id: 'm1', sender: 'Sarah', text: 'Hey! Are you coming to the event tomorrow?', time: '10:30 AM', isSent: false },
        { id: 'm2', sender: 'me', text: 'Yes, I\'m planning to be there around 6', time: '10:32 AM', isSent: true },
        { id: 'm3', sender: 'Sarah', text: 'Great! I\'ll save you a seat', time: '10:33 AM', isSent: false },
      ],
      '2': [
        { id: 'm1', sender: 'Mike', text: 'The meetup was great! Let\'s do it again soon', time: 'Yesterday', isSent: false },
        { id: 'm2', sender: 'me', text: 'Definitely! I had a great time', time: 'Yesterday', isSent: true },
      ],
      '3': [
        { id: 'm1', sender: 'Jessica', text: 'I\'m thinking about organizing a hiking trip next weekend', time: 'Yesterday', isSent: false },
        { id: 'm2', sender: 'me', text: 'That sounds fun! Where are you thinking?', time: 'Yesterday', isSent: true },
        { id: 'm3', sender: 'Jessica', text: 'Probably the national park, it\'s beautiful this time of year', time: 'Yesterday', isSent: false },
      ],
      '4': [
        { id: 'm1', sender: 'David', text: 'Thanks for the coffee yesterday!', time: 'Monday', isSent: false },
        { id: 'm2', sender: 'me', text: 'No problem! It was great catching up', time: 'Monday', isSent: true },
      ],
    };

    setContact(mockContacts[id]);
    setMessageHistory(mockMessages[id] || []);
  }, [id]);

  const goBackToMessages = () => {
    router.push('/messages');
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: `m${messageHistory.length + 1}`,
      sender: 'me',
      text: newMessage,
      time: 'Just now',
      isSent: true,
    };

    setMessageHistory([...messageHistory, newMsg]);
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble, 
      item.isSent ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.isSent && { color: 'white' }
      ]}>{item.text}</Text>
      <Text style={[
        styles.messageTime,
        item.isSent && { color: 'rgba(255, 255, 255, 0.7)' }
      ]}>{item.time}</Text>
    </View>
  );

  if (!contact) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={goBackToMessages}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Messages</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{contact.name}</Text>
        
        <View style={styles.headerRight}>
          <View style={[
            styles.statusIndicator, 
            contact.status === 'online' ? styles.statusOnline : 
            contact.status === 'away' ? styles.statusAway : styles.statusOffline
          ]} />
          <Text style={styles.statusText}>{contact.status}</Text>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messageHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          inverted={false}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999999"
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={newMessage.trim() === ''}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={newMessage.trim() === '' ? '#CCCCCC' : 'white'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF2F5',
    width: '100%',
  },
  header: {
    backgroundColor: '#669BBC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  keyboardAvoid: {
    flex: 1,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusOnline: {
    backgroundColor: '#4CAF50',
  },
  statusAway: {
    backgroundColor: '#FFC107',
  },
  statusOffline: {
    backgroundColor: '#9E9E9E',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
  },
  messageList: {
    padding: 16,
    width: '100%',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#669BBC',
    borderBottomRightRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '400',
  },
  messageTime: {
    fontSize: 12,
    color: '#999999',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C1121F',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
}); 