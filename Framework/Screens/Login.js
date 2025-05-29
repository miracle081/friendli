import React, { useContext } from 'react';
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
    Alert
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Theme } from '../Components/Theme';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/settigns';
import { errorMessage } from '../Components/formatErrorMessage';
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
import { InputField } from '../Components/InputField';

// Validation Schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export function Login({ navigation }) {
    const { setPreloader, setUserUID } = useContext(AppContext);

    const handleLogin = async (values) => {
        setPreloader(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const userid = userCredential.user.uid;
            setUserUID(userid);
            setPreloader(false);
            navigation.replace("HomeScreen");
        } catch (error) {
            setPreloader(false);
            Alert.alert("Login Failed", errorMessage(error.code));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoCircle}>
                            <Text style={styles.logoText}>Friendli</Text>
                        </View>
                    </View>

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Sign In</Text>
                        <Text style={styles.subheading}>Welcome back!</Text>
                    </View>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.formContainer}>
                                <InputField
                                    label="Email"
                                    placeholder="Enter your email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    error={touched.email && errors.email}
                                />

                                <InputField
                                    label="Password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={true}
                                    error={touched.password && errors.password}
                                />

                                <TouchableOpacity
                                    style={styles.forgotPasswordContainer}
                                    onPress={() => navigation.navigate("ForgottenPassword")}
                                >
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>

                                <AppButton onPress={handleSubmit} style={styles.loginButton}>
                                    Login
                                </AppButton>
                            </View>
                        )}
                    </Formik>

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
        fontFamily: Theme.fonts.text600,
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
        backgroundColor: Theme.colors.primary,
    },
    buttonText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
        color: '#FFFFFF',
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