// HomeScreen.js
import { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Dimensions } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-reanimated-carousel';
import { Profile } from './Profile';
import { Theme } from '../Components/Theme';
import { CreatePost } from './CreatePost';
import { AppContext } from '../Components/globalVariables';



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
        profilePic: 'https://randomuser.me/api/portraits/men/17.jpg',
        postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDywZygHNZKNoXZNF_26ainkkq6bjD2GU5Q&s'
    }
];

const Home = ({ navigation }) => {
    const { width, height } = Dimensions.get("window");
    const { userUID, userInfo } = useContext(AppContext)



    const renderStory = (item, index) => (
        <View key={index} style={styles.storyItem}>
            <Image source={{ uri: item.image }} style={styles.storyImage} />
            <Text style={styles.storyText}>{item.name}</Text>
        </View>
    );

    const renderPost = ({ item }) => (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.profileName}>{item.name} <Text style={styles.following}>• Following</Text></Text>
                    <Text style={styles.profileDetails}>{item.details}</Text>
                </View>
            </View>

            <Text style={styles.postText}>{item.text}</Text>

            <Image source={{ uri: item.postImage }} style={styles.postImage} />

            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionButton}>
                    <FontAwesome name="heart-o" size={20} color="black" />
                    <Text style={styles.actionText}>{item.likes}</Text>
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
    );

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
                    data={postsData}
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
        justifyContent: 'space-between'
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 15,
        flex: 1,
        marginRight: 10,
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
    following: {
        color: 'blue'
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