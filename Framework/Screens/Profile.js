import { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Platform, StatusBar } from "react-native";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPencilAlt, faImage, faMapMarkerAlt, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/settigns";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import { CardPost } from "../Components/CardPost";



export function Profile({ navigation }) {
    const { userInfo, posts, userUID } = useContext(AppContext);
    const userPosts = posts.filter(item => item.userUID === userUID);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cover Photo */}
                <View style={styles.coverPhoto} />

                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={{ uri: userInfo?.image || 'https://placehold.co/120/22C55E/FFFFFF/png' }}
                            style={styles.profileImage}
                        />
                    </View>

                    <Text style={styles.profileName}>
                        {userInfo?.firstname} {userInfo?.lastname}
                    </Text>
                    <Text style={styles.profileBio}>{userInfo?.bio}</Text>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => navigation.navigate("Wallet")} style={[styles.button, styles.primaryButton]}>
                            <FontAwesomeIcon icon={faWallet} size={16} color="white" />
                            <Text style={styles.buttonText}>Wallet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("EditProfile")}
                            style={[styles.button, styles.secondaryButton]}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} size={16} color={Theme.colors.light.text1} />
                            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Post Creation */}
                <View style={styles.postCreateSection}>
                    <View style={styles.postCreateRow}>
                        <Image
                            source={{ uri: userInfo?.image || 'https://placehold.co/40/22C55E/FFFFFF/png' }}
                            style={styles.postUserImage}
                        />
                        <TouchableOpacity style={styles.postInput}>
                            <Text style={styles.postInputText}>What's on your mind?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postOptions}>
                        <TouchableOpacity style={styles.postOption}>
                            <FontAwesomeIcon icon={faImage} size={18} color={Theme.colors.green} />
                            <Text style={styles.postOptionText}>Photo</Text>
                        </TouchableOpacity>

                        <View style={styles.optionDivider} />

                        <TouchableOpacity style={styles.postOption}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={Theme.colors.red} />
                            <Text style={styles.postOptionText}>Check in</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Posts */}
                {userPosts.map((post, index) => (
                    <CardPost key={index} item={post} />
                ))}
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
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: Theme.colors.light.bg,
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
    buttonRow: {
        flexDirection: 'row',
        marginTop: 16,
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 4,
    },
    primaryButton: {
        backgroundColor: Theme.colors.primary,
    },
    secondaryButton: {
        backgroundColor: Theme.colors.light.bg2,
    },
    buttonText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: 'white',
        marginLeft: 4,
    },
    secondaryButtonText: {
        color: Theme.colors.light.text1,
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.light.line,
        marginVertical: 12,
    },
    postCreateSection: {
        backgroundColor: Theme.colors.light.bg,
        padding: 16,
        marginVertical: 8,
    },
    postCreateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
    },
    postUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    postInput: {
        flex: 1,
        backgroundColor: Theme.colors.light.bg2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginLeft: 12,
    },
    postInputText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text2,
    },
    postOptions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: Theme.colors.light.line,
        paddingTop: 12,
    },
    postOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    postOptionText: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.light.text2,
        marginLeft: 8,
    },
    optionDivider: {
        width: 1,
        backgroundColor: Theme.colors.light.line,
    },

});