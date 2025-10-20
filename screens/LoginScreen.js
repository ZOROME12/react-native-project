import React, { useState, useRef, useEffect } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, 
    Image, StatusBar, KeyboardAvoidingView, Platform, ScrollView, 
    Animated, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// NOTE: These icon imports assume an environment like Expo or a linked project
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import axios from 'axios';
<<<<<<< HEAD
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 93701a1c84f3373f21f433e5825b1f8a447fdfd7

const { width, height } = Dimensions.get('window');

// --- Design Constants ---
const PRIMARY_COLOR = '#B2183A'; 
const BACKGROUND_COLOR = '#F9F9F9'; 
const CARD_BACKGROUND = '#FFFFFF';
const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_LIGHT = '#666666';

// --- Animated Paper/Document Component ---
const FlyingPaper = ({ duration, delay, startPosition, icon, verticalPosition, iconSize = 18 }) => {
    // Horizontal Animation Value (Moves L to R)
    const translateXAnimation = useRef(new Animated.Value(startPosition)).current;
    
    // Vertical Animation Value (Subtle Up/Down Float)
    const translateYAnimation = useRef(new Animated.Value(0)).current;

    const startFloat = () => {
        // Creates a continuous, subtle vertical bobbing motion
        Animated.sequence([
            Animated.timing(translateYAnimation, {
                toValue: -5,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnimation, {
                toValue: 5,
                duration: 4000,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnimation, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start(() => startFloat()); // Loop the vertical float
    }

    const startHorizontalAnimation = () => {
        translateXAnimation.setValue(startPosition); // Reset to start outside the screen
        Animated.timing(translateXAnimation, {
            toValue: width * 1.5, // Move past the right edge
            duration,
            useNativeDriver: true,
        }).start(() => startHorizontalAnimation()); // Loop the horizontal movement
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            startHorizontalAnimation();
            startFloat();
        }, delay);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <Animated.View 
            style={[
                styles.flyingPaper, 
                { 
                    // Use prop for vertical placement
                    top: verticalPosition, 
                    // Adjust the container size based on iconSize
                    width: iconSize * 1.5,
                    height: iconSize * 1.5,
                    transform: [
                        { translateX: translateXAnimation },
                        { translateY: translateYAnimation }, // Use the independent float animation
                    ]
                }
            ]}
        >
            <FontAwesome 
                name={icon} 
                size={iconSize}
                // Use a lighter primary color for the bottom icons and white for top
                color={verticalPosition.toString().includes('%') ? "rgba(255, 255, 255, 0.5)" : "rgba(178, 24, 58, 0.1)"} 
            />
        </Animated.View>
    );
};

// --- LoginScreen Component ---
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

    // NOTE: This URL is typically replaced with a dynamic variable in a real app
<<<<<<< HEAD
    const BASE_URL = 'https://300c34011010.ngrok-free.app';

    const handleDesignLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Info', 'Please enter both email and password.');
            return;
        }
        
        setIsLoggingIn(true);
        try {
            // Placeholder for API call (requires a running backend at BASE_URL)
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email,
                password,
            }, {
                headers: {
                    Accept: 'application/json',
                },
            });

            const { user } = response.data;
            Alert.alert('Success', `Welcome back, ${user.name}!`);
            // NOTE: 'Home' and 'Register' screens must be defined in your navigator
            navigation.replace('Home'); 

        } catch (error) {
            let message = 'Something went wrong. Please try again.';

            if (error.response) {
                message = error.response.data.message || 'Invalid email or password.';
            } else if (error.request) {
                message = 'Network Error: Unable to connect to the server. Check your connection.';
            } 
            
            Alert.alert('Login Failed', message);

        } finally {
            setIsLoggingIn(false);
        }
    };
=======
    const BASE_URL = 'https://56693a1492c4.ngrok-free.app';

   
const handleDesignLogin = async () => {
  if (!email || !password) {
    Alert.alert('Missing Info', 'Please enter both email and password.');
    return;
  }

  setIsLoggingIn(true);

  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email,
      password,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    const { token, user } = response.data;

    // ✅ Save token for later use
    await AsyncStorage.setItem('sanctum_token', token);
    await AsyncStorage.setItem('user_name', user.name);

    Alert.alert('Success', `Welcome back, ${user.name}!`);

    // ✅ Navigate to your Home or Dashboard screen
    navigation.replace('Home');

  } catch (error) {
    console.log(error.response?.data || error.message);
    let message = 'Something went wrong. Please try again.';

    if (error.response) {
      message = error.response.data.message || 'Invalid email or password.';
    } else if (error.request) {
      message = 'Network Error: Unable to connect to the server. Check your connection.';
    }

    Alert.alert('Login Failed', message);

  } finally {
    setIsLoggingIn(false);
  }
};
>>>>>>> 93701a1c84f3373f21f433e5825b1f8a447fdfd7

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                    
                    {/* Header/Branding Area with Animation */}
                    <View style={styles.header}>
                        {/* Flying Paper Icons (Top Animation) */}
                        <FlyingPaper duration={15000} delay={0} startPosition={-width * 0.2} icon="file-text-o" verticalPosition="20%" iconSize={28} />
                        <FlyingPaper duration={22000} delay={5000} startPosition={-width * 0.5} icon="paper-plane-o" verticalPosition="45%" iconSize={28} />
                        <FlyingPaper duration={18000} delay={10000} startPosition={-width * 0.8} icon="file-o" verticalPosition="70%" iconSize={28} />
                        
                        <View style={styles.headerContent}>
                            {/* NOTE: Ensure this image path is correct or the app will fail to load */}
                            <Image
                                source={require('../assets/easeP.jpg')} 
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.headerTitle}>EasePrint</Text>
                        </View>
                    </View>
                    
                    <View style={styles.cardContainer}>
                        <Text style={styles.welcomeText}>Welcome! 🖨️</Text>
                        <Text style={styles.subtitle}>Sign in.</Text>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="email" size={20} color={TEXT_COLOR_LIGHT} style={styles.icon} />
                                <TextInput
                                    placeholder="name@example.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    keyboardType="email-address"
                                    placeholderTextColor="#ADADAD"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password Input with Eye Icon */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <MaterialIcons name="lock" size={20} color={TEXT_COLOR_LIGHT} style={styles.icon} />
                                
                                <TextInput
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible} 
                                    style={styles.input}
                                    placeholderTextColor="#ADADAD"
                                />
                                
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                >
                                    <MaterialIcons 
                                        name={isPasswordVisible ? 'visibility' : 'visibility-off'} 
                                        size={24} 
                                        color={TEXT_COLOR_LIGHT} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        

                        {/* Login Button */}
                        <TouchableOpacity 
                            onPress={handleDesignLogin} 
                            style={[styles.button, isLoggingIn && styles.buttonDisabled]}
                            disabled={isLoggingIn}
                            activeOpacity={0.8}
                        >
                            {isLoggingIn ? (
                                <Text style={styles.buttonText}>LOGGING IN...</Text>
                            ) : (
                                <Text style={styles.buttonText}>LOGIN</Text>
                            )}
                        </TouchableOpacity>
                        
                        
                    </View>
                    
                    {/* Bottom Flying Paper Icons (Must be absolutely positioned relative to ScrollView) */}
                    <FlyingPaper duration={16000} delay={1000} startPosition={-width * 0.3} icon="paper-plane" verticalPosition={height - 50} iconSize={40} />
                    <FlyingPaper duration={20000} delay={6000} startPosition={-width * 0.6} icon="file-o" verticalPosition={height - 10} iconSize={40} />
                    <FlyingPaper duration={14000} delay={12000} startPosition={-width * 0.9} icon="envelope-o" verticalPosition={height - 90} iconSize={40} />
                    
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: BACKGROUND_COLOR,
        position: 'relative',
    },
    header: {
        position: 'relative', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: PRIMARY_COLOR,
        overflow: 'hidden', 
    },
    headerContent: {
        zIndex: 10, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 45,
        height: 45,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 1,
    },
    // The top position, width, and height are now set dynamically by component props/logic
    flyingPaper: {
        position: 'absolute',
        left: 0, 
        zIndex: 5, 
    },
    cardContainer: {
        flex: 1,
        backgroundColor: CARD_BACKGROUND,
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30,
        marginTop: -20, 
        padding: 30,
        paddingTop: 40,
        elevation: 15, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: TEXT_COLOR_DARK,
        marginBottom: 8,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: TEXT_COLOR_LIGHT,
        marginBottom: 40,
        textAlign: 'left',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: TEXT_COLOR_DARK,
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 12, 
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 15,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        color: TEXT_COLOR_DARK,
        fontSize: 16,
        paddingRight: 10, 
    },
    eyeButton: {
        paddingLeft: 10,
    },
    button: {
        backgroundColor: PRIMARY_COLOR,
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: '#C5A7B1',
        shadowOpacity: 0.1,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -10,
    },
    forgotPasswordText: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        fontWeight: '600',
    },
    signUpPrompt: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: TEXT_COLOR_LIGHT,
        fontSize: 15,
    },
    signUpLink: {
        color: PRIMARY_COLOR,
        fontSize: 15,
        fontWeight: '700',
    }
});

export default LoginScreen;
