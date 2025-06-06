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
import { collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../Firebase/settigns';
import { errorMessage } from '../Components/formatErrorMessage';
import { ToastApp } from '../Components/Toast';
import { formatTimeAgo } from '../Components/formatTimeAgo';
import { CardPost } from '../Components/CardPost';



const storiesData = [
    { name: 'Friends', image: 'https://cdn-icons-png.flaticon.com/512/4951/4951182.png' },
    { name: 'Groups', image: 'https://thumbs.dreamstime.com/b/icon-educational-study-groups-icon-educational-study-groups-351942438.jpg' },
    { name: 'Pages', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcb2eCz81UgezU85Yl-a8qT22TaEPSfhUhg&s' },
    { name: 'Events', image: 'https://cdn-icons-png.flaticon.com/512/6079/6079964.png' },
    { name: 'Marketplace', image: 'https://cdn-icons-png.flaticon.com/512/9198/9198446.png' }
];
const Home = ({ navigation }) => {
    const { userUID, userInfo, setPreloader, setUserInfo, posts, setPosts, transactions, setTransactions } = useContext(AppContext)
    const { width, height } = Dimensions.get("window");


    function fetchPosts() {
        setPreloader(true);
        onSnapshot(collection(db, "posts"), (snapshot) => {
            const allposts = [];
            snapshot.forEach(item => {
                allposts.push({ ...item.data(), docID: item.id });
            });
            setPreloader(false);
            setPosts(allposts.sort((a, b) => b.timestamp - a.timestamp));
        }, (error) => {
            setPreloader(false);
            console.error("Error fetching posts: ", error);
            Alert.alert("Error", errorMessage(error.code));
        });
    }

    function fetchTransactions() {
        const q = query(collection(db, "history"), where("user", "==", userUID));
        onSnapshot(q, (snapshot) => {
            const allposts = [];
            snapshot.forEach(item => {
                allposts.push({ ...item.data(), docID: item.id });
            });
            console.log(allposts);

            setTransactions(allposts.sort((a, b) => b.timestamp - a.timestamp));
        });
    }

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


        fetchPosts()
        fetchTransactions();
    }, [])

    const renderStory = (item, index) => (
        <View key={index} style={styles.storyItem}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <Text style={styles.storyText}>{item.name}</Text>
        </View>
    );

    const renderPost = ({ item }) => {

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
                        <Image source={{ uri: userInfo?.image }} style={styles.profilePic} />
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
                    // ListHeaderComponent={
                    //     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
                    //         {storiesData.map(renderStory)}
                    //     </ScrollView>
                    // }
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <CardPost item={item} />}
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
                        iconName = focused ? 'add-circle-sharp' : 'add';
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