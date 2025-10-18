import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
const API_URL = 'https://300c34011010.ngrok-free.app/api/messages';

const { width } = Dimensions.get('window');
// Memoized Message Item Component
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

const ChatScreen = ({ navigation, route }) => {
  const userId = route.params?.userId || 1;
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const flatListRef = useRef(null);

  // Fetch messages with optimized notification logic
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      const newMessages = response.data;

      // Count unread admin messages
      const currentUnread = newMessages.filter(
        msg => msg.sender_id === 0 && msg.read === false
      ).length;

      // Show notification only if new unread messages arrived
      if (currentUnread > unreadCount) {
        setShowNotification(true);
        
        // Hide notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
        
        // Mark as read after showing notification
        setTimeout(() => {
          axios.post(`${API_URL}/mark-as-read/${userId}`).catch(console.error);
        }, 5000);
      }

      setUnreadCount(currentUnread);
      setMessages(newMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, unreadCount]);

  // Notification timeout effect
  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  // Initial fetch and polling setup
  useEffect(() => {
    // Initial fetch
    fetchMessages();
    
    // Set up polling every 2 seconds
    const interval = setInterval(fetchMessages, 2000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      // Mark messages as read when leaving the screen
      axios.post(`${API_URL}/mark-as-read/${userId}`).catch(console.error);
    };
  }, [fetchMessages, userId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!messageText.trim()) return;
    
    try {
      setIsLoading(true);
      await axios.post(API_URL, {
        sender_id: userId,
        receiver_id: 0,
        message: messageText,
        is_admin: false,
      });
      setMessageText('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
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
        <Text style={styles.title}>Customer Support</Text>
        
        {showNotification && (
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationText}>New message from Admin</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MessageItem item={item} userId={userId} />}
          contentContainerStyle={styles.chatList}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={21}
          removeClippedSubviews={true}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No messages yet</Text>
            </View>
          }
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
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <MaterialIcons name="send" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButtonActive}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="home" size={24} color="#777" />
            </View>
            <Text style={styles.navButtonText}>Home</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Topsales')}
          >
            <View style={styles.navIconContainer}>
              <FontAwesome name="bar-chart" size={24} color="#777" />
            </View>
            <Text style={styles.navButtonText}>TopSales</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="chat" size={24} color="#B2183A" />
            </View>
            <Text style={styles.navButtonTextActive}>Chat</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="history" size={24} color="#777" />
            </View>
            <Text style={styles.navButtonText}>Orders</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.navIconContainer}>
              <MaterialIcons name="person" size={24} color="#777" />
            </View>
            <Text style={styles.navButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF8FB',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B2183A',
    textAlign: 'center',
    marginVertical: 10,
  },
  chatList: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  messageWrapper: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  messageRight: {
    alignSelf: 'flex-end',
  },
  messageLeft: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    padding: 10,
  },
  userBubble: {
    backgroundColor: '#ED4A69',
  },
  adminBubble: {
    backgroundColor: '#ED4A69',
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  messageText: {
    color: '#FBF8FB',
    fontSize: 17,
  },
  timestamp: {
    fontSize: 8,
    color: '#FBF8FB',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#B2183A',
    borderRadius: 30,
    padding: 10,
    marginLeft: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
   addButton: {
    backgroundColor: '#B2183A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 5,
    width: width / 5,
  },
  navButtonActive: {
    alignItems: 'center',
    paddingVertical: 5,
    width: width / 5,
  },
  navIconContainer: {
    marginBottom: 3,
  },
  navButtonText: {
    fontSize: 12,
    color: '#777',
  },
  navButtonTextActive: {
    fontSize: 12,
    color: '#B2183A',
    fontWeight: 'bold',
  },
  
  notificationBanner: {
    backgroundColor: '#B2183A',
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 70,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;