import { Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useContext, useState } from 'react'
import { AppContext } from '../Components/globalVariables';
import { AppButton } from '../Components/AppButton';
import { Theme } from '../Components/Theme';

export function Profile() {
    const { userInfo } = useContext(AppContext);
    const [visiblility, setVisiblility] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    source={{ uri: userInfo?.image }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Welcome {userInfo?.firstname}</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Email: {userInfo?.email}</Text>
            </View>
            <AppButton onPress={() => setVisiblility(true)} style={{ margin: 20, }} buttonColor={Theme.colors.red}>Log Out</AppButton>

            <Modal
                visible={visiblility}
                animationType={"slide"}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "#00000072" }}>
                    <TouchableOpacity onPress={() => setVisiblility(false)} style={{ flex: 1 }}></TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff" }}>

                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Are you sure you want to log out?</Text>
                        <Text style={{ fontSize: 16 }}>Email: {userInfo?.email} will be log out too</Text>
                        <AppButton onPress={() => setVisiblility(false)} >Close</AppButton>
                    </View>
                    <TouchableOpacity onPress={() => setVisiblility(false)} style={{ flex: 1 }}></TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})