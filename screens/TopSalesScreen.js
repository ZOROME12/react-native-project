import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const TopSalesScreen = ({ navigation }) => {
  const [topSales, setTopSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSales();
  }, []);

  const fetchTopSales = async () => {
    try {
      const response = await axios.get("https://300c34011010.ngrok-free.app/api/top-sales"); 
      setTopSales(response.data); 
    } catch (error) {
      console.error("Error fetching top sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.product}>{item.item_name}</Text>
      <Text style={styles.sales}>Sold: {item.total_quantity}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FBF8FB" }}>
      {/* Main Content */}
      <View style={styles.container}>
        <Text style={styles.header}>📊 Top 10 Best-Selling Items</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#B2183A" />
        ) : (
          <FlatList
            data={topSales}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Home")}
        >
          <View style={styles.navIconContainer}>
            <MaterialIcons name="home" size={24} color="#777" />
          </View>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButtonActive}
          onPress={() => navigation.navigate("TopSales")}
        >
          <View style={styles.navIconContainer}>
            <FontAwesome name="bar-chart" size={24} color="#B2183A" />
          </View>
          <Text style={styles.navButtonTextActive}>TopSales</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Chat")}
        >
          <View style={styles.navIconContainer}>
            <MaterialIcons name="chat" size={24} color="#777" />
          </View>
          <Text style={styles.navButtonText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Orders")}
        >
          <View style={styles.navIconContainer}>
            <MaterialIcons name="history" size={24} color="#777" />
          </View>
          <Text style={styles.navButtonText}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
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
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#B2183A" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rank: { fontWeight: "bold", color: "#B2183A" },
  product: { flex: 1, marginLeft: 10, fontSize: 16 },
  sales: { color: "#555" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navButton: {
    alignItems: "center",
    paddingVertical: 5,
    width: width / 5,
  },
  navButtonActive: {
    alignItems: "center",
    paddingVertical: 5,
    width: width / 5,
  },
  navIconContainer: { marginBottom: 3 },
  navButtonText: { fontSize: 12, color: "#777" },
  navButtonTextActive: { fontSize: 12, color: "#B2183A", fontWeight: "bold" },
});

export default TopSalesScreen;
