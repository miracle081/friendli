import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { formatTimeAgo } from './formatTimeAgo';
import { FontAwesome } from '@expo/vector-icons';
import { errorMessage } from './formatErrorMessage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settigns';
import { AppContext } from './globalVariables';
import { Theme } from './Theme';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export function CardPost({ item }) {
    const { userUID, setPreloader, } = useContext(AppContext)
    const isOwner = item.userUID == userUID;
    const checkIfUserLiked = item?.heart?.includes(userUID);

    function handleheart() {
        let updatedHearts = [];
        if (checkIfUserLiked) {
            // Remove like
            updatedHearts = item.heart.filter(uid => uid !== userUID);
        } else {
            // Add like
            updatedHearts = [...item.heart, userUID];
        }
        updateDoc(doc(db, "posts", item.docID), {
            heart: updatedHearts
        })
            .then(() => {
                // console.log("Post updated successfully");
            })
            .catch((error) => {
                console.error("Error updating post: ", error);
                ToastApp(errorMessage(error.code), "LONG");
            })
    }

    function handleDelete() {
        Alert.alert("Delete Post!", "Are you sure you want to delete this post?",
            [{ text: "No, Cancel", style: "cancel" },
            { text: "Yes", style: "destructive", onPress: () => { } }
            ]
        )
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <Image source={{ uri: item?.userInfo?.image }} style={styles.profilePic} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={styles.profileName}>{item?.userInfo?.firstname} {item?.userInfo?.lastname}</Text>
                        {item?.userInfo?.bio && <Text style={styles.profileDetails} numberOfLines={1}>{item?.userInfo?.bio}</Text>}
                        <Text style={{ fontFamily: Theme.fonts.text600, color: Theme.colors.gray, fontSize: 13 }}>{formatTimeAgo(item?.timestamp)}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleDelete}>
                    <FontAwesomeIcon icon={faTrashAlt} color={Theme.colors.red} />
                </TouchableOpacity>
            </View>

            <Text style={styles.postText}>{item.caption}</Text>

            {item?.media[0] && <Image source={{ uri: item?.media[0] }} style={styles.postImage} />}

            <View style={styles.actionRow}>
                <TouchableOpacity onPress={handleheart} style={styles.actionButton}>
                    <FontAwesome name={checkIfUserLiked ? "heart" : "heart-o"} size={20} color={checkIfUserLiked ? Theme.colors.red : "gray"} />
                    <Text style={styles.actionText}>{item?.heart?.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome name="comment-o" size={20} color="black" />
                    <Text style={styles.actionText}>{item.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome name="share" size={20} color="black" />
                    <Text style={styles.actionText}>{item.shares}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        marginHorizontal: 10,
        marginVertical: 6,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        gap: 10
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    profileName: {
        fontWeight: 'bold'
    },
    profileDetails: {
        fontSize: 12,
        color: '#555'
    },
    postText: {
        marginVertical: 8,
        fontSize: 14
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionText: {
        marginLeft: 5
    }
})