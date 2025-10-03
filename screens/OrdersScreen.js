import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OrdersScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <Text style={styles.title}>Orders</Text>
      <Text style={styles.text}>View your recent printing orders here.</Text>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
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
            <MaterialIcons name="chat" size={24} color="#777" />
          </View>
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
          style={styles.navButtonActive}
          onPress={() => navigation.navigate('Orders')}
        >
          <View style={styles.navIconContainer}>
            <MaterialIcons name="history" size={24} color="#B2183A" />
          </View>
          <Text style={styles.navButtonTextActive}>Orders</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#B2183A',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#3F1A2B',
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
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  navButtonTextActive: {
    fontSize: 12,
    color: '#B2183A',
    marginTop: 3,
    fontWeight: 'bold',
  },
  navIconContainer: {
    marginBottom: 2,
  },
});

export default OrdersScreen;
