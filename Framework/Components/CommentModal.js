import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Pressable, FlatList, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes, faArrowCircleUp, faUserCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Theme } from "../Components/Theme";
import { addDoc, collection, onSnapshot, query, where, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { ToastApp } from "../Components/Toast";
import { errorMessage } from "../Components/formatErrorMessage";
import { formatTimeAgo } from "../Components/formatTimeAgo";
import { AppContext } from "./globalVariables";
import { db } from "../Firebase/settigns";

export function CommentModal({ visible, onClose, postID, comments }) {
    const { setPreloader, userUID, userInfo } = useContext(AppContext);

    const [comment, setComment] = useState("");

    useEffect(() => {
    }, []);

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setPreloader(true);
            updateDoc(doc(db, "posts", postID), {
                comments: [...comments,
                {
                    author: userUID,
                    username: userInfo?.firstname + " " + userInfo.lastname,
                    text: comment,
                    createdAt: new Date().getTime(),
                    type: "comment",
                }]
            })
                .then(() => {
                    setComment("");
                    ToastApp("Comment added", "SHORT");
                })
                .catch((error) => {
                    Alert.alert("Access denied!", errorMessage(error.code));
                })
                .finally(() => {
                    setPreloader(false);
                });
        }
    };

    const handleDeleteComment = (createdAt) => {
        Alert.alert(
            "Delete Comment",
            "Are you sure you want to delete this comment?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        setPreloader(true);
                        const returnedComs = comments.filter(item => item.createdAt !== createdAt)
                        updateDoc(doc(db, "posts", postID), {
                            comments: returnedComs
                        })
                            .then(() => {
                                ToastApp("Comment deleted", "SHORT");
                            })
                            .catch((error) => {
                                Alert.alert("Error", errorMessage(error.code));
                            })
                            .finally(() => {
                                setPreloader(false);
                            });
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Pressable style={{ flex: 1 }} onPress={onClose} />
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Comments</Text>
                        <TouchableOpacity onPress={onClose}>
                            <FontAwesomeIcon icon={faTimes} size={24} color={Theme.colors.text2} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, padding: 20 }}>
                        <View style={styles.commentsList}>
                            {comments.length > 0 ? (
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={comments}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.commentItem}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                    {/* <UserComment userID={item.userUID} onPress={onClose} /> */}
                                                    <Text style={styles.username}>{item.username}</Text>
                                                    <Text style={styles.commentDate}>{formatTimeAgo(item.createdAt)}</Text>
                                                </View>
                                                <Text style={styles.commentText}>{item.text}</Text>

                                                {/* Show delete button only if the comment author is the current user */}
                                                {item.author === userUID && (
                                                    <TouchableOpacity
                                                        style={styles.deleteButton}
                                                        onPress={() => handleDeleteComment(item.createdAt)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} size={16} color={Theme.colors.red} />
                                                        <Text style={styles.deleteText}>Delete</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item) => item.createdAt}
                                    showsVerticalScrollIndicator={false}
                                />
                            ) : (
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <FontAwesomeIcon icon={faComments} size={50} color={Theme.colors.text2} />
                                    <Text style={{ color: Theme.colors.text2, fontFamily: Theme.fonts.text600 }}>No comments yet</Text>
                                    <Text style={{ color: Theme.colors.text2, fontFamily: Theme.fonts.text400 }}>Be the first to comment</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add a comment..."
                            value={comment}
                            onChangeText={setComment}
                            multiline
                        />
                        <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
                            <FontAwesomeIcon icon={faArrowCircleUp} size={24} color={Theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: "70%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
        padding: 20,
    },
    modalTitle: {
        fontSize: Theme.sizes.xl,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
    },
    commentsList: {
        flex: 1,
        marginBottom: 20,
    },
    commentItem: {
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.line,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    username: {
        // marginLeft: 5,
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text600,
        color: Theme.colors.text1,
    },
    commentText: {
        fontSize: Theme.sizes.md,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
        marginBottom: 5,
    },
    commentDate: {
        fontSize: Theme.sizes.sm,
        fontFamily: Theme.fonts.text400,
        color: Theme.colors.text2,
        textAlign: "right"
    },
    commentInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Theme.colors.line,
        paddingTop: 10,
        padding: 20
    },
    commentInput: {
        flex: 1,
        backgroundColor: Theme.colors.bg2,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Theme.colors.line,
        fontFamily: Theme.fonts.text400,
    },
    submitButton: {
        padding: 10,
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: 5,
        padding: 5,
    },
    deleteText: {
        marginLeft: 5,
        fontSize: Theme.sizes.sm,
        color: Theme.colors.red,
        fontFamily: Theme.fonts.text500,
    },
});