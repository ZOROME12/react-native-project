import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const BASE_URL = 'https://6835b6e16815.ngrok-free.app';
const API_URL = `${BASE_URL}/api/mobile/messages`;
const { width } = Dimensions.get('window');

const MessageItem = React.memo(({ item, userId }) => {
  const isUser = item.sender_id === userId;
  const timestamp = new Date(item.created_at).toLocaleString();

  return (
    <View style={[
      styles.messageWrapper,
      isUser ? styles.messageRight : styles.messageLeft,
    ]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.adminBubble]}>
        <Text style={styles.senderName}>{isUser ? 'You' : 'EasePrint'}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </View>
  );
});

const ChatScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('user_id');
      console.log('📱 Chat loaded user ID:', id);
      setUserId(id ? parseInt(id) : null);
    };
    loadUserId();
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_URL}?user_id=${userId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [fetchMessages, userId]);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!messageText.trim() || !userId) return;
    try {
      setIsLoading(true);
      await axios.post(`${API_URL}`, {
        sender_id: userId,
        receiver_id: 0,
        message: messageText,
        is_admin: false,
      });
      setMessageText('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && messages.length === 0) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B2183A" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        {/* HEADER WITH BACK BUTTON */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="#B2183A" />
          </TouchableOpacity>
          <Text style={styles.title}>Customer Support</Text>
          <View style={{ width: 28 }} />{/* Spacer to center title */}
        </View>
        {/* END HEADER */}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageItem item={item} userId={userId} />}
          contentContainerStyle={styles.chatList}
          ListEmptyComponent={<Text style={styles.emptyText}>No messages yet</Text>}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            onSubmitEditing={sendMessage}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage}
            disabled={isLoading || !messageText.trim()}
          >
            {isLoading
              ? <ActivityIndicator color="#fff" />
              : <MaterialIcons name="send" size={24} color="#fff" />}
          </TouchableOpacity>
        </View>

        {/* The bottom navigation section is removed from here */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// 🧱 STYLES
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBF8FB' },
  container: { flex: 1, paddingHorizontal: 12 },
  
  // NEW HEADER STYLES
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#B2183A', 
    textAlign: 'center', 
    // marginVertical: 10, // Removed margin to be controlled by header padding
  },
  
  chatList: { flexGrow: 1, paddingBottom: 10 },
  messageWrapper: { marginVertical: 4, maxWidth: '80%' },
  messageRight: { alignSelf: 'flex-end' },
  messageLeft: { alignSelf: 'flex-start' },
  bubble: { borderRadius: 18, padding: 10 },
  userBubble: { backgroundColor: '#ED4A69' },
  adminBubble: { backgroundColor: '#B2183A' },
  senderName: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  messageText: { color: '#fff', fontSize: 16 },
  timestamp: { fontSize: 8, color: '#eee', marginTop: 4, textAlign: 'right' },
  inputContainer: {
    flexDirection: 'row', backgroundColor: '#fff', borderRadius: 30,
    paddingHorizontal: 15, paddingVertical: 10, margin: 10, alignItems: 'center',
  },
  input: { flex: 1, fontSize: 16 },
  sendButton: { backgroundColor: '#B2183A', borderRadius: 30, padding: 10, marginLeft: 8 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', color: '#777', marginTop: 20 },
  
  // bottomNav and its associated text styles are removed.
});

export default ChatScreen;