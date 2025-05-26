import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../Screens/HomeScreen";
import { SignUp } from "../Screens/SignUp";
import { Login } from "../Screens/Login";
import { CreatePost } from "../Screens/CreatePost";


const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="CreatePost" component={CreatePost} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}