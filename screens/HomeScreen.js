import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://94d406038ac1.ngrok-free.app/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#B2183A" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require('../assets/easeP.jpg')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>EasePrint</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <Text style={styles.welcomeTitle}>Welcome to EasePrint 🖨️</Text>
          <Text style={styles.welcomeSubtitle}>Quality prints made easy</Text>
        </View>
        
        {/* Products Section */}
        <Text style={styles.sectionTitle}>Available Services</Text>
        
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              activeOpacity={0.9}
            >
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: `https://94d406038ac1.ngrok-free.app/storage/${product.image}` }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>₱{product.price}</Text>
                </View>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.description}
                </Text>
                <TouchableOpacity 
                style={styles.addButton}
                onPress={() => Linking.openURL(product.purchaseUrl || 'http://127.0.0.1:8000/')}
              >
                <Text style={styles.addButtonText}>BUY</Text>
              </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
    {/* Bottom Navigation */}
<View style={styles.bottomNav}>
  <TouchableOpacity
    style={styles.navButtonActive}
    onPress={() => navigation.navigate('Home')}
  >
    <View style={styles.navIconContainer}>
      <MaterialIcons name="home" size={24} color="#B2183A" />
    </View>
    <Text style={styles.navButtonTextActive}>Home</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FBF8FB',
  },
  header: {
  backgroundColor: '#B2183A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
    
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  profileButton: {
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF8FB',
    paddingHorizontal: 15,
  },
  welcomeBanner: {
    backgroundColor: '#3F1A2B',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 180,
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(178, 24, 58, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  priceText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
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
});

export default HomeScreen;