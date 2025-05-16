import { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { AppContext } from "../Components/globalVariables";
import { Theme } from "../Components/Theme";


export function CreatePost() {
    const { userInfo } = useContext(AppContext);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.taskswrapper} >
                <Text style={styles.sectionTitle}>{"Andrew Tate"}</Text>

                <Image source={{ uri: userInfo?.image }} style={styles.image} />
                <Text style={styles.textZ}>{"Public post"}</Text>
                <Text style={styles.textR}>{"What's the gist today "}</Text>
                <Text style={styles.text}>{"POST"} a content</Text>
                <TouchableOpacity>
                    <View style={styles.items}>
                        <Text style={styles.textT}>{ }{"Add Photos / Video"}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    taskswrapper: {
        padding: 10,
        // paddingVertical: 100
    },
    sectionTitle: {
        fontSize: 15,
        right: -50,
        bottom: 8,
        marginHorizontal: 10
    },
    textR: {
        textAlign: "left",
        backgroundColor: "lightblue",
        height: 230,
        borderRadius: 8,
        fontSize: 18,
        padding: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 2,
        bottom: 40,
        borderColor: Theme.colors.primary
    },
    text: {
        textAlign: "center",
        fontSize: 24,
        backgroundColor: Theme.colors.primary,
        top: 350,
        color: "white",

    },
    textZ: {
        fontSize: 15,
        backgroundColor: "lightblue",
        marginLeft: 300,
        marginTop: 10,
        left: -1,
        top: -87,
        marginHorizontal: 1,
        fontFamily: Theme.fonts.text600,
    },
    textT: {
        fontFamily: Theme.fonts.text600,
        fontStyle: "arial",
        fontSize: 15,
        right: -4
    }
})