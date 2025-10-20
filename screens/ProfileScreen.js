// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // resets back to login screen
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.text}>Welcome to your profile settings.</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="home" size={24} color="#777" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Topsales')}
        >
          <FontAwesome name="bar-chart" size={24} color="#777" />
          <Text style={styles.navButtonText}>TopSales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <MaterialIcons name="chat" size={24} color="#777" />
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <MaterialIcons name="history" size={24} color="#777" />
          <Text style={styles.navButtonText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonActive}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="person" size={24} color="#B2183A" />
          <Text style={styles.navButtonTextActive}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#FBF8FB',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B2183A',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#3F1A2B',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#B2183A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
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
  navButtonText: {
    color: '#777',
    fontSize: 12,
  },
  navButtonTextActive: {
    color: '#B2183A',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProfileScreen;
