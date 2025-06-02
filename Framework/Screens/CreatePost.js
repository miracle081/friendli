import { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, Platform, StatusBar, Alert, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage, faVideo, faGlobe, faCaretDown, faTimes, faSmile } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, } from "../Firebase/settigns";
import { errorMessage } from "../Components/formatErrorMessage";
import { ToastApp } from "../Components/Toast";

export function CreatePost({ navigation }) {
    const { userUID, userInfo, setPreloader } = useContext(AppContext);
    const [caption, setCaption] = useState("");
    const [media, setMedia] = useState([]);

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        // if (!permissionResult.granted) {
        //     Alert.alert("Permission required", "Permission to access camera roll is required!");
        //     return;
        // }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setMedia([result.assets[0].uri]);
        }
    }

    async function uploadImageToFirebase(imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = `posts/${userUID}`;
        const imageRef = ref(storage, filename);

        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
    }

    async function handlePost() {
        if (!caption.trim() && media.length === 0) {
            Alert.alert("Error", "Please add some content or select an image");
            return;
        }

        setPreloader(true);

        try {
            let uploadedMedia = [];

            if (media.length > 0) {
                const uploadedUrl = await uploadImageToFirebase(media[0]);
                uploadedMedia = [uploadedUrl];
            }

            await addDoc(collection(db, "posts"), {
                caption: caption,
                media: uploadedMedia,
                userUID: userUID,
                userInfo: {
                    firstname: userInfo.firstname,
                    lastname: userInfo.lastname,
                    image: userInfo.image,
                    bio: userInfo.bio,
                },
                timestamp: new Date().getTime(),
                heart: [],
                comments: [],
                shares: [],
                privacy: "public",
            });

            setPreloader(false);
            setCaption("");
            setMedia([]);
            ToastApp("Post created successfully", "LONG");
            navigation.navigate("HomeScreen", { screen: "Home" });
        } catch (error) {
            setPreloader(false);
            console.log("Error adding document: ", error);
            Alert.alert("Error adding document", errorMessage(error.code));
        }
    }

    function removeImage() {
        setMedia([]);
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.userInfoContainer}>
                    <Image source={{ uri: userInfo?.image }} style={styles.userAvatar} />
                    <View style={styles.userNamePrivacyContainer}>
                        <Text style={styles.userName}>{userInfo.firstname} {userInfo.lastname}</Text>
                        <TouchableOpacity style={styles.privacySelector}>
                            <FontAwesomeIcon icon={faGlobe} size={14} color={Theme.colors.gray} />
                            <Text style={styles.privacyText}>Public</Text>
                            <FontAwesomeIcon icon={faCaretDown} size={14} color={Theme.colors.gray} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.postContentContainer}>
                    <TextInput
                        style={styles.postInput}
                        placeholder="What's on your mind?"
                        placeholderTextColor={Theme.colors.gray}
                        multiline={true}
                        value={caption}
                        onChangeText={inp => setCaption(inp)}
                    />

                    {media.length > 0 && (
                        <View style={styles.selectedImageContainer}>
                            <Image source={{ uri: media[0] }} style={styles.selectedImage} />
                            <TouchableOpacity onPress={removeImage} style={styles.removeImageButton}>
                                <FontAwesomeIcon icon={faTimes} size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.mediaSection}>
                    <Text style={styles.mediaSectionTitle}>Add to your post</Text>
                    <View style={styles.mediaOptions}>
                        <TouchableOpacity style={styles.mediaOption} onPress={pickImage}>
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

                <TouchableOpacity onPress={handlePost} style={styles.postButtonBottom}>
                    <Text style={styles.postButtonBottomText}>Post</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.light.bg,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        borderWidth: 0.5,
        borderColor: Theme.colors.gray,
        borderRadius: 10,
        padding: 10
    },
    selectedImageContainer: {
        marginTop: 12,
        position: 'relative',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
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
