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

// Theme configuration
export const Theme = {
    colors: {
        primary: "#22C55E",
        blueLight: "#CCE0F0",
        blueMedium: "#2F80ED",
        blueDark: "#53b8ee",
        green: "#22C55E",
        greenDark: "#0E4D2B",
        greenMedium: "#50C878",
        greenLight: "#B7E4C7",
        yellow: "#ffb702",
        mediumGreen: "#88FCB4",
        lightGreen: "#E9F9EF",
        red: "#EF4444",
        redLight: "#ffe3e3",
        gray: "#808080",
        light: {
            layer: "#f8f8f8",
            bg: "#ffffff",
            bg2: "#f0f0f0",
            text1: "#000000e2",
            text2: "#00000099",
            line: "rgba(0,0,0,0.1)",
        },
        dark: {
            layer: "#202020",
            bg: "#141414",
            bg2: "#212121",
            text1: "#ffffff",
            text2: "#ffffff99",
            line: "rgba(255,255,255,0.1)"
        },
    },
    fonts: {
        brand: "Pacifico_400Regular",
        text100: "Montserrat_100Thin",
        text200: "Montserrat_200ExtraLight",
        text300: "Montserrat_300Light",
        text400: "Montserrat_400Regular",
        text500: "Montserrat_500Medium",
        text600: "Montserrat_600SemiBold",
        text700: "Montserrat_700Bold",
        text800: "Montserrat_800ExtraBold",
        text900: "Montserrat_900Black",
    }
};

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

export function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!name) {
            newErrors.name = "Name is required";
        }

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

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = () => {
        if (validateForm()) {
            // Handle signup logic here
            console.log("Sign up with:", { name, email, password });
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
                        <Text style={styles.heading}>Create Account</Text>
                        <Text style={styles.subheading}>Sign up to get started!</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <InputField
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            error={errors.name}
                        />

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
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            error={errors.password}
                        />

                        <InputField
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            error={errors.confirmPassword}
                        />

                        <AppButton
                            onPress={handleSignup}
                            style={styles.loginButton}
                        >
                            Sign Up
                        </AppButton>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialLoginContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Sign up with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialButtonText}>Sign up with Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                            <Text style={styles.signupLink}>Sign In</Text>
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
