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
import { auth, db } from '../Firebase/settigns';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { errorMessage } from '../Components/formatErrorMessage';
import { doc, setDoc } from 'firebase/firestore';
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
import { InputField } from '../Components/InputField';

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password')
});

export function SignUp({ navigation }) {
    const { setPreloader, setUserUID } = useContext(AppContext);

    const handleSignup = async (values) => {
        setPreloader(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const userid = userCredential.user.uid;

            await setDoc(doc(db, "users", userid), {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                image: null,
                bio: "",
                phone: "",
                location: null,
                createdAt: new Date().getTime(),
            });

            setUserUID(userid);
            setPreloader(false);
            navigation.navigate("HomeScreen", { email: values.email });
        } catch (error) {
            setPreloader(false);
            Alert.alert("Signup Failed", errorMessage(error.code));
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
                        <Text style={styles.heading}>Create Account</Text>
                        <Text style={styles.subheading}>Sign up to get started!</Text>
                    </View>

                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.formContainer}>
                                <InputField
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    value={values.firstname}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    autoCapitalize="words"
                                    error={touched.firstname && errors.firstname}
                                />

                                <InputField
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    value={values.lastname}
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    autoCapitalize="words"
                                    error={touched.lastname && errors.lastname}
                                />

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
                                    placeholder="Create a password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    secureTextEntry={true}
                                    error={touched.password && errors.password}
                                />

                                <InputField
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    secureTextEntry={true}
                                    error={touched.confirmPassword && errors.confirmPassword}
                                />

                                <AppButton onPress={handleSubmit} style={styles.loginButton}>
                                    Sign Up
                                </AppButton>
                            </View>
                        )}
                    </Formik>

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