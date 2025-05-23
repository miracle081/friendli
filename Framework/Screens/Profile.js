import { useContext } from "react";
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

export function Profile() {
    const { userInfo } = useContext(AppContext);

    // This would be replaced with actual data from your API or context
    const posts = [
        {
            id: '1',
            content: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
            time: '2 hours ago',
            likes: 234,
            comments: 45,
            shares: 12
        },
        {
            id: '2',
            content: 'Just finished a great workout session! Pushing limits every day. #motivation #fitness',
            time: '2 days ago',
            likes: 578,
            comments: 89,
            shares: 30
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <FontAwesomeIcon icon={faEllipsisH} size={20} color={Theme.colors.light.text1} />
                    </TouchableOpacity>
                </View>

                {/* Cover Photo Section */}
                <View style={styles.coverPhotoContainer}>
                    <Image
                        source={{ uri: 'https://placehold.co/600x200/22C55E/FFFFFF/png' }}
                        style={styles.coverPhoto}
                    />
                    <TouchableOpacity style={styles.editCoverButton}>
                        <FontAwesomeIcon icon={faCamera} size={16} color="white" />
                    </TouchableOpacity>
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

                    {/* Profile Action Buttons */}
                    <View style={styles.profileActionContainer}>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: Theme.colors.primary }]}>
                            <Text style={styles.actionButtonText}>+ Add to Story</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: Theme.colors.light.bg2 }]}>
                            <FontAwesomeIcon icon={faPencilAlt} size={16} color={Theme.colors.light.text1} />
                            <Text style={[styles.actionButtonText, { color: Theme.colors.light.text1 }]}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.moreOptionsButton}>
                            <FontAwesomeIcon icon={faEllipsisH} size={16} color={Theme.colors.light.text1} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Stats Divider */}
                <View style={styles.divider} />

                {/* About Section */}
                <View style={styles.aboutSection}>
                    <View style={styles.aboutItem}>
                        <FontAwesomeIcon icon={faBriefcase} size={16} color={Theme.colors.gray} />
                        <Text style={styles.aboutText}>Entrepreneur at Top G Enterprises</Text>
                    </View>

                    <View style={styles.aboutItem}>
                        <FontAwesomeIcon icon={faGraduationCap} size={16} color={Theme.colors.gray} />
                        <Text style={styles.aboutText}>Studied at University of Life</Text>
                    </View>

                    <View style={styles.aboutItem}>
                        <FontAwesomeIcon icon={faHome} size={16} color={Theme.colors.gray} />
                        <Text style={styles.aboutText}>Lives in Dubai, United Arab Emirates</Text>
                    </View>

                    <View style={styles.aboutItem}>
                        <FontAwesomeIcon icon={faHeart} size={16} color={Theme.colors.gray} />
                        <Text style={styles.aboutText}>Single</Text>
                    </View>

                    <TouchableOpacity style={styles.editDetailsButton}>
                        <Text style={styles.editDetailsText}>Edit Details</Text>
                    </TouchableOpacity>
                </View>

                {/* Friends Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionTitle}>Friends</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.friendsCount}>1.2M friends</Text>

                    <View style={styles.friendsGrid}>
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <View key={i} style={styles.friendItem}>
                                <Image
                                    source={{ uri: `https://placehold.co/100/808080/FFFFFF/png?text=Friend+${i}` }}
                                    style={styles.friendImage}
                                />
                                <Text style={styles.friendName}>Friend {i}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Posts Section */}
                <View style={styles.sectionContainer}>
                    <View style={styles.postCreateContainer}>
                        <Image source={{ uri: userInfo?.image || 'https://placehold.co/40/22C55E/FFFFFF/png' }} style={styles.postUserImage} />
                        <TouchableOpacity style={styles.postInputPlaceholder}>
                            <Text style={styles.postInputText}>What's on your mind?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.postOptionsContainer}>
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

                {/* Posts List */}
                {posts.map(post => (
                    <View key={post.id} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <Image source={{ uri: userInfo?.image || 'https://placehold.co/40/22C55E/FFFFFF/png' }} style={styles.postUserImage} />
                            <View style={styles.postHeaderInfo}>
                                <Text style={styles.postUserName}>Andrew Tate</Text>
                                <Text style={styles.postTime}>{post.time}</Text>
                            </View>
                            <TouchableOpacity style={styles.postMoreButton}>
                                <FontAwesomeIcon icon={faEllipsisH} size={18} color={Theme.colors.gray} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.postContent}>{post.content}</Text>

                        <View style={styles.postStats}>
                            <Text style={styles.postStatText}>{post.likes} Likes</Text>
                            <Text style={styles.postStatText}>{post.comments} Comments</Text>
                            <Text style={styles.postStatText}>{post.shares} Shares</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.postActions}>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesomeIcon icon={faThumbsUp} size={18} color={Theme.colors.gray} />
                                <Text style={styles.postActionText}>Like</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesomeIcon icon={faCommentAlt} size={18} color={Theme.colors.gray} />
                                <Text style={styles.postActionText}>Comment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesomeIcon icon={faShareSquare} size={18} color={Theme.colors.gray} />
                                <Text style={styles.postActionText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
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
    aboutSection: {
        backgroundColor: Theme.colors.light.bg,
        padding: 16,
        marginVertical: 8,
    },
    aboutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    aboutText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text1,
        marginLeft: 12,
    },
    editDetailsButton: {
        marginTop: 12,
    },
    editDetailsText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: Theme.colors.blueMedium,
    },
    sectionContainer: {
        backgroundColor: Theme.colors.light.bg,
        padding: 16,
        marginVertical: 8,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontFamily: Theme.fonts.text600,
        fontSize: 18,
        color: Theme.colors.light.text1,
    },
    seeAllText: {
        fontFamily: Theme.fonts.text600,
        fontSize: 14,
        color: Theme.colors.blueMedium,
    },
    friendsCount: {
        fontFamily: Theme.fonts.text400,
        fontSize: 14,
        color: Theme.colors.light.text2,
        marginTop: 4,
    },
    friendsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    friendItem: {
        width: '31%',
        marginBottom: 12,
    },
    friendImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
    },
    friendName: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.light.text1,
        marginTop: 4,
    },
    postCreateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 12,
    },
    postUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    postInputPlaceholder: {
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
    postOptionsContainer: {
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
    postContainer: {
        backgroundColor: Theme.colors.light.bg,
        marginVertical: 8,
        padding: 16,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postHeaderInfo: {
        flex: 1,
        marginLeft: 12,
    },
    postUserName: {
        fontFamily: Theme.fonts.text600,
        fontSize: 16,
        color: Theme.colors.light.text1,
    },
    postTime: {
        fontFamily: Theme.fonts.text400,
        fontSize: 12,
        color: Theme.colors.light.text2,
    },
    postMoreButton: {
        padding: 4,
    },
    postContent: {
        fontFamily: Theme.fonts.text400,
        fontSize: 16,
        color: Theme.colors.light.text1,
        marginVertical: 12,
        lineHeight: 22,
    },
    postStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 12,
    },
    postStatText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 12,
        color: Theme.colors.light.text2,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
    },
    postAction: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    postActionText: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.light.text2,
        marginLeft: 8,
    },
});