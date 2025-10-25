// components/Bottomnavs.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BottomNavLayout({ children }) {
  const navigation = useNavigation();
  const route = useRoute();
  const current = route.name;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>{children}</View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavContainer}>
    <View style={styles.bottomNav}>
        <NavButton
          icon="home"
          label="Home"
          route="Home"
          current={current}
          navigation={navigation}
        />
        <NavButton
          icon="chat"
          label="Chat"
          route="Chat"
          current={current}
          navigation={navigation}
        />
        <NavButton
          icon="history"
          label="Orders"
          route="Orders"
          current={current}
          navigation={navigation}
        />
        <NavButton
          icon="person"
          label="Profile"
          route="Profile"
          current={current}
          navigation={navigation}
        />
      </View>
    </View>
    </View>
  );
}

function NavButton({ icon, label, route, current, navigation }) {
  const isActive = current === route;

  return (
    <TouchableOpacity
      style={isActive ? styles.navButtonActive : styles.navButton}
      onPress={() => navigation.navigate(route)}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isActive ? '#B2183A' : '#777'}
      />
      <Text style={isActive ? styles.navButtonTextActive : styles.navButtonText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14, // increased vertical padding
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 8, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navButtonActive: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  navButtonText: {
    fontSize: 14, // slightly larger text
    color: '#777',
  },
  navButtonTextActive: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B2183A',
  },
  bottomNavContainer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
},
});

