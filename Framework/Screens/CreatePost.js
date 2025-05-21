import { useContext } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Platform,
    StatusBar
} from "react-native";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCameraRotate,
    faImage,
    faVideo,
    faGlobe,
    faCaretDown,
    faTimes,
    faSmile
} from "@fortawesome/free-solid-svg-icons";

export function CreatePost() {
    const { userInfo } = useContext(AppContext);

    return (
        <SafeAreaView style={styles.container}>

            {/* User Info Section */}
            <View style={styles.userInfoContainer}>
                <Image source={{ uri: userInfo?.image }} style={styles.userAvatar} />
                <View style={styles.userNamePrivacyContainer}>
                    <Text style={styles.userName}>Andrew Tate</Text>
                    <TouchableOpacity style={styles.privacySelector}>
                        <FontAwesomeIcon icon={faGlobe} size={14} color={Theme.colors.gray} />
                        <Text style={styles.privacyText}>Public</Text>
                        <FontAwesomeIcon icon={faCaretDown} size={14} color={Theme.colors.gray} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Post Content Section */}
            <View style={styles.postContentContainer}>
                <TextInput
                    style={styles.postInput}
                    placeholder="What's on your mind?"
                    placeholderTextColor={Theme.colors.gray}
                    multiline={true}
                />
            </View>

            {/* Media Attachment Section */}
            <View style={styles.mediaSection}>
                <Text style={styles.mediaSectionTitle}>Add to your post</Text>
                <View style={styles.mediaOptions}>
                    <TouchableOpacity style={styles.mediaOption}>
                        <View style={[styles.iconContainer, { backgroundColor: Theme.colors.greenLight }]}>
                            <FontAwesomeIcon icon={faImage} size={18} color={Theme.colors.primary} />
                        </View>
                        <Text style={styles.mediaOptionText}>Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mediaOption}>
                        <View style={[styles.iconContainer, { backgroundColor: Theme.colors.redLight }]}>
                            <FontAwesomeIcon icon={faVideo} size={18} color={Theme.colors.red} />
                        </View>
                        <Text style={styles.mediaOptionText}>Video</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.mediaOption}>
                        <View style={[styles.iconContainer, { backgroundColor: Theme.colors.blueLight }]}>
                            <FontAwesomeIcon icon={faSmile} size={18} color={Theme.colors.blueMedium} />
                        </View>
                        <Text style={styles.mediaOptionText}>Feeling</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Post Button - Bottom */}
            <TouchableOpacity style={styles.postButtonBottom}>
                <Text style={styles.postButtonBottomText}>Post</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.light.bg,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.light.line,
    },
    closeButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.light.text1,
    },
    postButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    postButtonText: {
        color: Theme.colors.blueMedium,
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Theme.colors.light.line,
    },
    userNamePrivacyContainer: {
        marginLeft: 12,
    },
    userName: {
        fontFamily: Theme.fonts.text600,
        fontSize: 15,
        color: Theme.colors.light.text1,
    },
    privacySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 12,
        backgroundColor: Theme.colors.light.bg2,
    },
    privacyText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 12,
        color: Theme.colors.gray,
        marginHorizontal: 4,
    },
    postContentContainer: {
        paddingHorizontal: 16,
        flex: 1,
    },
    postInput: {
        fontFamily: Theme.fonts.text400,
        fontSize: 18,
        color: Theme.colors.light.text1,
        textAlignVertical: 'top',
        height: 200,
    },
    mediaSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.light.line,
    },
    mediaSectionTitle: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: Theme.colors.light.text2,
        marginBottom: 12,
    },
    mediaOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
    },
    mediaOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mediaOptionText: {
        marginLeft: 8,
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text1,
    },
    postButtonBottom: {
        margin: 16,
        backgroundColor: Theme.colors.primary,
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
    },
    postButtonBottomText: {
        color: 'white',
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
    }
});