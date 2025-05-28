import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Platform,
    StatusBar
} from "react-native";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCamera,
    faPencilAlt,
    faEllipsisH,
    faUserPlus,
    faCommentAlt,
    faShareSquare,
    faThumbsUp,
    faImage,
    faMapMarkerAlt,
    faBriefcase,
    faGraduationCap,
    faHeart,
    faHome
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/settigns";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import { AppButton, InputField } from "./SignUp";

export function EditProfile({ navigation }) {
    const { userInfo, userUID, setPreloader } = useContext(AppContext);

    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [bio, setBio] = useState(userInfo.bio);
    const [email, setEmail] = useState(userInfo.email);

    function handleUpdate() {
        setPreloader(true)
        updateDoc(doc(db, "users", userUID), {
            firstname,
            lastname,
            bio
        })
            .then(() => {
                setPreloader(false)
                ToastApp("Profile updated successfully");
                navigation.goBack();
            })
            .catch((error) => {
                setPreloader(false)
                console.error("Error updating post: ", error);
                ToastApp(errorMessage(error.code), "LONG");
            })
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cover Photo Section */}
                <View style={styles.coverPhotoContainer}>
                    <View style={{ height: 190, backgroundColor: Theme.colors.primary }}></View>
                </View>

                {/* Profile Info Section */}
                <View style={styles.profileInfoContainer}>
                    <View style={styles.profileImageContainer}>
                        <Image source={{ uri: userInfo?.image || 'https://placehold.co/120/22C55E/FFFFFF/png' }} style={styles.profileImage} />
                        <TouchableOpacity style={styles.editProfileImageButton}>
                            <FontAwesomeIcon icon={faCamera} size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>{userInfo.firstname} {userInfo.lastname}</Text>
                    <Text style={styles.profileBio}>{userInfo.bio}</Text>
                </View>

                {/* Profile Stats Divider */}
                <View style={styles.divider} />

                <View style={{ padding: 20, backgroundColor: "white" }}>

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

                    <InputField
                        label="Email"
                        value={email}
                    />

                    <AppButton
                        onPress={handleUpdate}
                        style={styles.loginButton}
                    >
                        Update
                    </AppButton>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
    },
    coverPhotoContainer: {
        position: 'relative',
    },
    coverPhoto: {
        height: 180,
        width: '100%',
    },
    editCoverButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        padding: 8,
    },
    profileInfoContainer: {
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
    editProfileImageButton: {
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
    profileName: {
        fontFamily: Theme.fonts.text700,
        fontSize: 22,
        color: Theme.colors.light.text1,
        marginTop: 8,
    },
    profileBio: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text2,
        textAlign: 'center',
        marginTop: 4,
        marginHorizontal: 40,
    },
    profileActionContainer: {
        flexDirection: 'row',
        marginTop: 16,
        width: '100%',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 4,
    },
    actionButtonText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: 'white',
        marginLeft: 4,
    },
    moreOptionsButton: {
        backgroundColor: Theme.colors.light.bg2,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 4,
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.light.line,
        marginVertical: 12,
    },
});