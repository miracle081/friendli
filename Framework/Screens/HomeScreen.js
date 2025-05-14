import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-reanimated-carousel';

export function HomeScreen() {
    const { width, height } = Dimensions.get("window");
    // console.log(width, height);


    const carouselLinks = [
        "https://images.pexels.com/photos/534228/pexels-photo-534228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4495803/pexels-photo-4495803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
            <ScrollView style={{}}>
                <View style={{}}>

                    <View style={{ marginVertical: 10, }}>
                        <Carousel
                            loop
                            width={width - 30}
                            height={170}
                            autoPlay={true}
                            data={carouselLinks}
                            style={{ borderRadius: 10 }}
                            scrollAnimationDuration={1000}
                            renderItem={({ item, index }) => (
                                <View>
                                    <Image style={{ width: '100%', height: 170, borderRadius: 10, borderWidth: 1 }} source={{ uri: item }} />
                                </View>
                            )}
                        />
                    </View>
                    <Text>Hi</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({});
