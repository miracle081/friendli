import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'

export function CoreComponent() {
    const [input, setInput] = useState("this is an input data");

    // console.log(input);


    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={styles.header}>Core Component</Text>
            <Text style={{}}>TextInput, Button & TouchableOpacity</Text>

            <TextInput
                placeholder="Type here..."
                // value={"Mac book Pro M2 Max"}
                style={styles.input}
                onChangeText={(inp) => setInput(inp)}
            />

            <Button title='Submit' color={"red"} onPress={() => { console.log("Button Clicked") }} />

            <TouchableOpacity disabled={true} onPress={() => console.log(input)} style={styles.btn}>
                <Text style={{ color: "white", fontSize: 18 }}>Touchable Opacity</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#054dc8',
        padding: 10,
        borderRadius: 50,
        marginTop: 10,
        color: "#02235b",
        fontSize: 19,
    },
    btn: {
        backgroundColor: "#054dc8",
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
    }

})