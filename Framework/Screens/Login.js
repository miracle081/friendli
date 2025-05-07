import { Text, TextInput, View } from "react-native";
import { AppBotton } from "../Components/AppBotton";

export function Login() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Sign In</Text>
            <Text>Welcome back</Text>
            <View>
                <Text>Email</Text>
                <TextInput
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    secureTextEntry={true}
                />
                <AppBotton>Login</AppBotton>
            </View>
        </View>
    )
}