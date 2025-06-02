import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "../Screens/HomeScreen";
import { SignUp } from "../Screens/SignUp";
import { Login } from "../Screens/Login";
import { CreatePost } from "../Screens/CreatePost";
import { ForgottenPassword } from "../Screens/ForgottenPassword";
import { EditProfile } from "../Screens/EditProfile";
import { Wallet } from "../Screens/Wallet";
import { FundWallet } from "../Screens/FundWallet";
import { Pay } from "../Screens/Pay";


const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ title: "Forgotten Password" }} />
                <Stack.Screen name="CreatePost" component={CreatePost} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: "Edit Profile" }} />
                <Stack.Screen name="Wallet" component={Wallet} />
                <Stack.Screen name="FundWallet" component={FundWallet} options={{ title: "Fund Wallet" }} />
                <Stack.Screen name="Pay" component={Pay} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}