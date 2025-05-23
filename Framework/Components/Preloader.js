import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native';
// import AnimatedLottieView from 'lottie-react-native';
import { AppContext } from './globalVariables';
import { Theme } from './Theme';

export function Preloader() {
    const { preloader } = useContext(AppContext);
    return (
        <>
            {
                preloader ?
                    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                        <ActivityIndicator color={Theme.colors.primary} size={"large"} />
                        <Text style={{ fontSize: 20, color: Theme.colors.primary, fontFamily: Theme.fonts.text600 }}>Loading...</Text>
                        {/* <AnimatedLottieView
                            style={{ width: 400, height: 400 }}
                            source={require('../../assets/loader.json')}
                            autoPlay
                            loop
                            speed={1}
                        /> */}
                    </View>
                    : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffffd7',
        zIndex: 2
    },
});

