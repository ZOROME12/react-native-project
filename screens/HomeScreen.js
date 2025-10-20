import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Linking } from 'react-native';

const { width } = Dimensions.get('window');

// --- Design Constants ---
const PRIMARY_COLOR = '#B2183A'; // Deep Red/Maroon
const SECONDARY_COLOR = '#3F1A2B'; // Darker background for banner
const ACCENT_COLOR = '#FFD700'; // Gold/Yellow for highlights (e.g., price tag)
const BACKGROUND_COLOR = '#F5F5F5'; // Lighter background
const CARD_BACKGROUND = '#FFFFFF';
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#666666';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
<<<<<<< HEAD
    axios.get('https://300c34011010.ngrok-free.app/api/products')
=======
    axios.get('https://56693a1492c4.ngrok-free.app/api/products')
>>>>>>> 93701a1c84f3373f21f433e5825b1f8a447fdfd7
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const ProductCard = ({ product }) => (
    <TouchableOpacity 
      key={product.id} 
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() => Linking.openURL(product.purchaseUrl || 'http://127.0.0.1:8000/')} // Use a single action
    >
      <View style={styles.productImageContainer}>
        <Image
<<<<<<< HEAD
          source={{ uri: `https://300c34011010.ngrok-free.app/storage/${product.image}` }}
=======
          source={{ uri: `https://56693a1492c4.ngrok-free.app/storage/${product.image}` }}
>>>>>>> 93701a1c84f3373f21f433e5825b1f8a447fdfd7
          style={styles.productImage}
          resizeMode="cover"
        />
        {/* Price Tag with Accent Color */}
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>₱{product.price}</Text>
        </View>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {product.description}
        </Text>
        
        {/* Button integrated more seamlessly */}
        <View style={styles.buttonDivider} />
        <View style={styles.buyButtonContainer}>
          <Text style={styles.buyButtonText}>View & Order</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} color={PRIMARY_COLOR} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          
          <Text style={styles.headerTitle}>EasePrint</Text> 
        
          <Image
            source={require('../assets/easeP.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Welcome Banner - Elevated and more prominent */}
        <View style={styles.welcomeBanner}>
          <Text style={styles.welcomeTitle}>Welcome to EasePrint</Text>
          <Text style={styles.welcomeSubtitle}>Your go-to for quality, fast printing! 🖨️</Text>
          <TouchableOpacity style={styles.discoverButton}>
             <Text style={styles.discoverButtonText}>Start Designing</Text>
             <MaterialIcons name="design-services" size={18} color={PRIMARY_COLOR} style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>
        
        {/* Products Section */}
        <Text style={styles.sectionTitle}>Featured Services</Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color={PRIMARY_COLOR} style={{marginTop: 50}} />
        ) : (
          <View style={styles.productsContainer}>
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </View>
        )}
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <MaterialIcons name="home" size={26} color={PRIMARY_COLOR} />
          <Text style={styles.navButtonTextActive}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Topsales')}
        >
          <FontAwesome name="bar-chart" size={24} color={TEXT_COLOR_LIGHT} />
          <Text style={styles.navButtonText}>TopSales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <MaterialIcons name="chat" size={24} color={TEXT_COLOR_LIGHT} />
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Orders')}
        >
          <MaterialIcons name="history" size={24} color={TEXT_COLOR_LIGHT} />
          <Text style={styles.navButtonText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="person" size={24} color={TEXT_COLOR_LIGHT} />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  
  // --- Header Styles ---
  header: {
    backgroundColor: PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    elevation: 8, // Stronger shadow for the header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 8, 
    borderRadius: 5, 
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700', 
    color: '#fff',
    letterSpacing: 0.8,
  },
  profileButton: {
    padding: 2,
  },
  
  // --- ScrollView & Content Styles ---
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollViewContent: {
    paddingBottom: 20, // Ensure space above bottom nav
  },

 
  welcomeBanner: {
    backgroundColor: SECONDARY_COLOR,
    borderRadius: 15,
    padding: 25,
    marginTop: 25,
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800', // Extra bold title
    color: '#fff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
  },
  discoverButton: {
    backgroundColor: CARD_BACKGROUND, // Contrasting button inside banner
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  discoverButtonText: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
    fontSize: 15,
  },

  // --- Section Title Styles ---
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: TEXT_COLOR_DARK,
    marginBottom: 15,
    marginLeft: 5, // Align with card content spacing
  },
  productsContainer: {
    flexDirection: 'column', // Stack cards vertically
  },

  // --- Product Card Styles ---
  productCard: {
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 15, // More pronounced rounding
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 4, // Nice lift
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: width * 0.5, // Relative height based on screen width
  },
  priceTag: {
    position: 'absolute',
    top: 10, // Moved to top right for better visibility
    right: 10,
    backgroundColor: ACCENT_COLOR, // Gold accent
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  priceText: {
    color: TEXT_COLOR_DARK,
    fontWeight: '900', // Very bold
    fontSize: 16,
  },
  productInfo: {
    padding: 18,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_COLOR_DARK,
    marginBottom: 5,
  },
  productDescription: {
    color: TEXT_COLOR_LIGHT,
    fontSize: 14,
    lineHeight: 22,
  },

  // Buy button replacement for sleek look
  buttonDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  buyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  buyButtonText: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
    fontSize: 15,
  },

  // --- Bottom Navigation Styles ---
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: CARD_BACKGROUND,
    paddingVertical: 10,
    borderTopWidth: 0, // Removed border, using elevation instead
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 5,
    width: width / 5,
  },
  navButtonText: {
    fontSize: 11, // Slightly smaller text
    color: TEXT_COLOR_LIGHT,
    marginTop: 3,
  },
  navButtonTextActive: {
    fontSize: 11,
    color: PRIMARY_COLOR,
    fontWeight: '700',
    marginTop: 3,
  },
});

export default HomeScreen;