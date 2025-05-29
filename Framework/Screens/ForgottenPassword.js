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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/settigns';
import { errorMessage } from '../Components/formatErrorMessage';
import { AppContext } from '../Components/globalVariables';
import { ToastApp } from '../Components/Toast';
import { InputField } from '../Components/InputField';
import { AppButton } from '../Components/AppButton';

// Validation Schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required')
});


export function ForgottenPassword({ navigation }) {
    const { setPreloader } = useContext(AppContext);

    const handlePasswordReset = async (values) => {
        setPreloader(true);
        try {
            await sendPasswordResetEmail(auth, values.email);
            setPreloader(false);
            ToastApp("A link has been sent to your email", "LONG");
            navigation.goBack();
        } catch (error) {
            setPreloader(false);
            Alert.alert("Reset Failed", errorMessage(error.code));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Forgot Password</Text>
                        <Text style={styles.subheading}>Enter your email address to continue</Text>
                    </View>

                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handlePasswordReset}
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

                                <AppButton onPress={handleSubmit} style={styles.loginButton}>
                                    Send Reset Link
                                </AppButton>
                            </View>
                        )}
                    </Formik>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Remember password? </Text>
                        <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                            <Text style={styles.signupLink}>Sign in</Text>
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
        justifyContent: "center"
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