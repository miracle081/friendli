import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar
} from "react-native";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/settigns";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import { InputField } from "../Components/InputField";
import { AppButton } from "../Components/AppButton";

export function EditProfile({ navigation }) {
    const { userInfo, userUID, setPreloader } = useContext(AppContext);
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [bio, setBio] = useState(userInfo.bio);
    const [email, setEmail] = useState(userInfo.email);

    const handleUpdate = async () => {
        setPreloader(true);
        try {
            await updateDoc(doc(db, "users", userUID), { firstname, lastname, bio });
            ToastApp("Profile updated successfully");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating profile:", error);
            ToastApp(errorMessage(error.code), "LONG");
        } finally {
            setPreloader(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cover Photo */}
                <View style={styles.coverPhoto} />

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: userInfo?.image || 'https://placehold.co/120/22C55E/FFFFFF/png' }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.cameraButton}>
                            <FontAwesomeIcon icon={faCamera} size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{userInfo.firstname} {userInfo.lastname}</Text>
                    <Text style={styles.bio}>{userInfo.bio}</Text>
                </View>

                <View style={styles.divider} />

                {/* Form Section */}
                <View style={styles.formSection}>
                    <InputField
                        label="First Name"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChangeText={setFirstname}
                        autoCapitalize="words"
                    />
                    <InputField
                        label="Last Name"
                        placeholder="Enter your last name"
                        value={lastname}
                        onChangeText={setLastname}
                        autoCapitalize="words"
                    />
                    <InputField
                        label="Bio"
                        placeholder="Enter your Bio"
                        value={bio}
                        onChangeText={setBio}
                        autoCapitalize="words"
                    />
                    <InputField label="Email" value={email} />
                    <AppButton onPress={handleUpdate}>Update</AppButton>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.light.bg2,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    coverPhoto: {
        height: 190,
        backgroundColor: Theme.colors.primary,
    },
    profileSection: {
        backgroundColor: Theme.colors.light.bg,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -20,
        paddingHorizontal: 16,
        paddingBottom: 16,
        alignItems: 'center',
    },
    profileImageContainer: {
        position: 'relative',
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Theme.colors.light.bg,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.primary,
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontFamily: Theme.fonts.text700,
        fontSize: 22,
        color: Theme.colors.light.text1,
        marginTop: 8,
    },
    bio: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text2,
        textAlign: 'center',
        marginTop: 4,
        marginHorizontal: 40,
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.light.line,
        marginVertical: 12,
    },
    formSection: {
        padding: 20,
        backgroundColor: "white",
    },
});