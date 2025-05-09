import React, { useState } from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image
} from 'react-native';
import { Theme } from '../Components/Theme'; // Adjust the import path as necessary

// Button component
export function AppButton({ children, onPress, variant = "primary", style }) {
    const buttonStyles = [styles.button];
    const textStyles = [styles.buttonText];

    if (variant === "primary") {
        buttonStyles.push(styles.primaryButton);
    } else if (variant === "outline") {
        buttonStyles.push(styles.outlineButton);
        textStyles.push(styles.outlineButtonText);
    } else if (variant === "text") {
        buttonStyles.push(styles.textButton);
        textStyles.push(styles.textButtonText);
    }

    return (
        <TouchableOpacity
            style={[...buttonStyles, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={textStyles}>{children}</Text>
        </TouchableOpacity>
    );
}

// Input field component
export function InputField({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "none",
    error
}) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                placeholderTextColor={Theme.colors.gray}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

// Login Screen
export function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateForm()) {
            // Handle login logic here
            // console.log("Login with:", { email, password });
            navigation.navigate("HomeScreen");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            {/* Replace with your actual logo */}
                            <Text style={styles.logoText}>YourApp</Text>
                        </View>
                    </View>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Sign In</Text>
                        <Text style={styles.subheading}>Welcome back!</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <InputField
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={errors.email}
                        />

                        <InputField
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            error={errors.password}
                        />

                        <TouchableOpacity
                            style={styles.forgotPasswordContainer}
                            onPress={() => console.log("Forgot password")}
                        >
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <AppButton
                            onPress={handleLogin}
                            style={styles.loginButton}
                        >
                            Login
                        </AppButton>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Sign in with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Sign in with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate("SignUp")}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.light.bg,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Theme.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontFamily: Theme.fonts.brand,
        fontSize: 24,
        color: Theme.colors.greenDark,
    },
    headerContainer: {
        marginBottom: 30,
        alignItems: 'center',
    },
    heading: {
        fontFamily: Theme.fonts.text700,
        fontSize: 28,
        color: Theme.colors.light.text1,
        marginBottom: 8,
    },
    subheading: {
        fontFamily: Theme.fonts.text400,
        fontSize: 16,
        color: Theme.colors.light.text2,
    },
    formContainer: {
        width: '100%',
        marginBottom: 25,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.light.text1,
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: Theme.colors.light.bg2,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontFamily: Theme.fonts.text400,
        fontSize: 16,
        color: Theme.colors.light.text1,
        borderWidth: 1,
        borderColor: Theme.colors.light.line,
    },
    inputError: {
        borderColor: Theme.colors.red,
    },
    errorText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 12,
        color: Theme.colors.red,
        marginTop: 4,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.blueMedium,
    },
    loginButton: {
        marginTop: 10,
    },
    button: {
        height: 56,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: Theme.colors.primary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Theme.colors.primary,
    },
    textButton: {
        backgroundColor: 'transparent',
        height: 40,
    },
    buttonText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
        color: '#FFFFFF',
    },
    outlineButtonText: {
        color: Theme.colors.primary,
    },
    textButtonText: {
        color: Theme.colors.primary,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Theme.colors.light.line,
    },
    dividerText: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.gray,
        marginHorizontal: 10,
    },
    socialLoginContainer: {
        marginBottom: 30,
    },
    socialButton: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Theme.colors.light.line,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    socialButtonText: {
        fontFamily: Theme.fonts.text500,
        fontSize: 16,
        color: Theme.colors.light.text1,
        marginLeft: 10,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signupText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text2,
    },
    signupLink: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: Theme.colors.primary,
    }
});