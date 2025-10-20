import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { width } = Dimensions.get('window');
const BASE_URL = 'https://56693a1492c4.ngrok-free.app';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('📡 Fetching orders...');
        const token = await AsyncStorage.getItem('sanctum_token');
        console.log('🔑 Token from storage:', token);

        if (!token) {
          console.log('⚠️ No token found');
          return;
        }

        const response = await axios.get(`${BASE_URL}/api/tracking/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        console.log('✅ Response data:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('❌ Error fetching orders:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <MaterialIcons name="local-shipping" size={24} color="#B2183A" />
        <Text style={styles.orderTitle}>Order #{item.id}</Text>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Status: </Text>
          {item.status}
        </Text>
        <Text style={styles.orderText}>
          <Text style={styles.bold}>Tracking Stage: </Text>
          {item.tracking_stage}
        </Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width:
                item.tracking_stage === 'Delivered'
                  ? '100%'
                  : item.tracking_stage === 'In Transit'
                  ? '65%'
                  : item.tracking_stage === 'Packed'
                  ? '35%'
                  : '15%',
            },
          ]}
        />
      </View>

      <Text style={styles.trackingStageText}>
        {item.tracking_stage || 'Pending'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 My Orders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B2183A" style={{ marginTop: 50 }} />
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="inbox" size={60} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name="home" size={24} color="#777" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Topsales')}>
          <FontAwesome name="bar-chart" size={24} color="#777" />
          <Text style={styles.navButtonText}>TopSales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Chat')}>
          <MaterialIcons name="chat" size={24} color="#777" />
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButtonActive} onPress={() => navigation.navigate('Orders')}>
          <MaterialIcons name="history" size={24} color="#B2183A" />
          <Text style={styles.navButtonTextActive}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="person" size={24} color="#777" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBF8FB', alignItems: 'center' },
  title: {
    fontSize: 24,
    color: '#B2183A',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 18,
    marginVertical: 8,
    borderRadius: 14,
    width: width * 0.9,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  orderTitle: { fontSize: 18, fontWeight: 'bold', color: '#3F1A2B' },
  orderDetails: { marginTop: 4 },
  orderText: { fontSize: 14, color: '#444', marginBottom: 2 },
  bold: { fontWeight: 'bold' },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#B2183A',
    borderRadius: 10,
  },
  trackingStageText: {
    fontSize: 12,
    color: '#B2183A',
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: { fontSize: 16, color: '#999', marginTop: 10 },
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
  navButton: { alignItems: 'center', width: width / 5 },
  navButtonActive: { alignItems: 'center', width: width / 5 },
  navButtonText: { fontSize: 12, color: '#777', marginTop: 3 },
  navButtonTextActive: {
    fontSize: 12,
    color: '#B2183A',
    marginTop: 3,
    fontWeight: 'bold',
  },
});

export default OrdersScreen;
