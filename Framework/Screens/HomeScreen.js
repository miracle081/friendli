// HomeScreen.js
import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-reanimated-carousel';
import { Profile } from './Profile';
import { Theme } from '../Components/Theme';
import { CreatePost } from './CreatePost';
import { AppContext } from '../Components/globalVariables';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/settigns';
import { errorMessage } from '../Components/formatErrorMessage';
import { ToastApp } from '../Components/Toast';



const storiesData = [
    { name: 'Friends', image: 'https://cdn-icons-png.flaticon.com/512/4951/4951182.png' },
    { name: 'Groups', image: 'https://thumbs.dreamstime.com/b/icon-educational-study-groups-icon-educational-study-groups-351942438.jpg' },
    { name: 'Pages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcb2eCz81UgezU85Yl-a8qT22TaEPSfhUhg&s' },
    { name: 'Events', image: 'https://cdn-icons-png.flaticon.com/512/6079/6079964.png' },
    { name: 'Marketplace', image: 'https://cdn-icons-png.flaticon.com/512/9198/9198446.png' }
];

const postsData = [
    {
        name: 'Savannah Nguyen',
        details: 'Chef at Emirate Foods • 5 mins ago',
        text: 'Here’s a delicious and healthy salad recipe to try out this weekend! ',
        likes: 684,
        comments: 245,
        shares: 102,
        profilePic: 'https://randomuser.me/api/portraits/women/15.jpg',
        postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s'
    },
    {
        name: 'Cody Fisher',
        details: 'Food Blogger • 15 mins ago',
        text: 'Made this creamy avocado toast for brunch today. So simple, so good! ',
        likes: 512,
        comments: 132,
        shares: 67,
        profilePic: 'https://randomuser.me/api/portraits/men/16.jpg',
        postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfjhkUsJa4nFmUhaf69WdfrRca0zbetiMmjQ&s'
    },
    {
        name: 'Wade Warren',
        details: 'Nutritionist • 30 mins ago',
        text: 'Hydration is key! Don’t forget to drink your water and eat your greens ',
        likes: 389,
        comments: 98,
        shares: 40,
        profilePic: 'https://randomuser.me/api/portraits/men/20.jpg',
        postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDywZygHNZKNoXZNF_26ainkkq6bjD2GU5Q&s'
    }
];

const Home = ({ navigation }) => {
    const { userUID, userInfo, setPreloader, setUserInfo, posts, setPosts } = useContext(AppContext)
    const { width, height } = Dimensions.get("window");



    useEffect(() => {
        // function getuser() {
        //     setPreloader(true)
        //     getDoc(doc(db, "users", userUID))
        //         .then((shapshot) => {
        //             setUserInfo(shapshot.data());
        //             setPreloader(false)
        //         })
        //         .catch((error) => {
        //             setPreloader(false)
        //             Alert.alert("Login Failed", errorMessage(error.code));
        //         });
        // }
        function getuser() {
            setPreloader(true)
            onSnapshot(doc(db, "users", userUID), (shapshot) => {
                setPreloader(false)
                setUserInfo(shapshot.data());
            })
        }
        getuser();

        function fetchPosts() {
            setPreloader(true);
            onSnapshot(collection(db, "posts"), (snapshot) => {
                const allposts = [];
                snapshot.forEach(item => {
                    allposts.push({ ...item.data(), docID: item.id });
                });
                setPreloader(false);
                setPosts(allposts);
            }, (error) => {
                setPreloader(false);
                console.error("Error fetching posts: ", error);
                Alert.alert("Error", errorMessage(error.code));
            });
        }

        fetchPosts()
    }, [])

    const renderStory = (item, index) => (
        <View key={index} style={styles.storyItem}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <Text style={styles.storyText}>{item.name}</Text>
        </View>
    );

    const renderPost = ({ item }) => {
        const checkIfUserLiked = item.heart.includes(userUID);

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

        return (
            <View style={styles.postContainer}>
                <View style={styles.postHeader}>
                    <Image source={{ uri: item?.userInfo?.image }} style={styles.profilePic} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.profileName}>{item?.userInfo?.firstname} {item?.userInfo?.lastname}</Text>
                        <Text style={styles.profileDetails}>{item?.userInfo?.bio}</Text>
                    </View>
                </View>

                <Text style={styles.postText}>{item.caption}</Text>

                {item.media[0] && <Image source={{ uri: item.media[0] }} style={styles.postImage} />}

                <View style={styles.actionRow}>
                    <TouchableOpacity onPress={handleheart} style={styles.actionButton}>
                        <FontAwesome name={checkIfUserLiked ? "heart" : "heart-o"} size={20} color={checkIfUserLiked ? Theme.colors.red : "gray"} />
                        <Text style={styles.actionText}>{item.heart.length}</Text>
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
    };

    const carouselLinks = [
        "https://images.pexels.com/photos/534228/pexels-photo-534228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4495803/pexels-photo-4495803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];


    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                        <Image source={{ uri: userInfo.image }} style={styles.profilePic} />
                    </TouchableOpacity>
                    <TextInput style={styles.searchBar} placeholder="Search" placeholderTextColor="#999" />
                    <TouchableOpacity>
                        <FontAwesome name="envelope-o" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* <View style={{ marginVertical: 10, }}>
                    <Carousel
                        loop
                        width={width - 30}
                        height={150}
                        autoPlay={true}
                        data={carouselLinks}
                        style={{ borderRadius: 10 }}
                        scrollAnimationDuration={2000}
                        renderItem={({ index }) => (
                            <Image style={{ width: '100%', height: 150, borderRadius: 10, }} source={{ uri: carouselLinks[index] }} />
                        )}
                    />
                </View> */}

                <FlatList
                    ListHeaderComponent={
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
                            {storiesData.map(renderStory)}
                        </ScrollView>
                    }
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderPost}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />

            </View>


        </SafeAreaView>


    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'space-between',
        gap: 10
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        flex: 1,
        height: 40,
    },
    storiesContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10


    },
    storyItem: {
        alignItems: 'center',
        marginRight: 15,
    },
    storyImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: 'blue',
        borderWidth: 2
    },
    storyText: {
        marginTop: 5,
        fontSize: 12
    },
    postContainer: {
        marginHorizontal: 10,
        marginVertical: 6,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center'
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
});

// export default HomeScreen;

export default Home;

const Tab = createBottomTabNavigator();

export function HomeScreen() {
    const { width, height } = Dimensions.get("window");


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let size;
                    if (route.name === 'Home') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    else if (route.name === 'CreatePost') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'bag-add' : 'bag-add-outline';
                    }
                    else if (route.name === 'Cart') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'cart' : 'cart-outline';
                    }
                    else if (route.name === 'Profile') {
                        size = focused ? 35 : 23
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Theme.colors.primary,
                tabBarInactiveTintColor: Theme.colors.gray,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="CreatePost" component={CreatePost} options={{ title: "Post Ads" }} />
            {/* <Tab.Screen name="Cart" component={Cart} /> */}
            <Tab.Screen name="Profile" component={Profile} options={{ title: "Account" }} />
        </Tab.Navigator>
    );
}