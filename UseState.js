import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons';

export function CoreComponent() {
    const [input, setInput] = useState("this is an input data");


    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={styles.header}>Font Awesome Icons</Text>
            <FontAwesomeIcon icon={faHome} size={40} color='#054dc8' style={{ marginBottom: 20 }} />
            <FontAwesomeIcon icon={faCamera} size={40} color='#054dc8' style={{ marginBottom: 20 }} />
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