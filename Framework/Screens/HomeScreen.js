import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export function HomeScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
            <ScrollView style={{}}>
                <View style={{}}>

                    <Text>HomeScreen</Text>
                    <Image source={require("../../assets/user.jpg")} style={{ width: 120, height: 120, borderRadius: 70 }} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})