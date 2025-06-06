import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = (size) => (width / 375) * size;
const normalize = (size) => {
    const newSize = scale(size);
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const Theme = {
    colors: {
        primary: "#22C55E",
        blueLight: "#CCE0F0",
        blueMedium: "#2F80ED",
        blueDark: "#53b8ee",
        green: "#22C55E",
        greenDark: "#0E4D2B",
        greenMedium: "#50C878",
        greenLight: "#B7E4C7",
        yellow: "#ffb702",
        mediumGreen: "#88FCB4",
        lightGreen: "#E9F9EF",
        red: "#EF4444",
        redLight: "#ffe3e3",
        gray: "#808080",

        layer: "#f8f8f8",
        bg: "#ffffff",
        bg2: "#f0f0f0",
        text1: "#000000e2",
        text2: "#00000099",
        line: "#0000001a",


        light: {
            layer: "#f8f8f8",
            bg: "#ffffff",
            bg2: "#f0f0f0",
            text1: "#000000e2",
            text2: "#00000099",
            line: "rgba(0,0,0,0.1)",
        },
        dark: {
            layer: "#202020",
            bg: "#141414",
            bg2: "#212121",
            text1: "#ffffff",
            text2: "#ffffff99",
            line: "rgba(255,255,255,0.1)"
        },
    },
    fonts: {
        brand: "Pacifico_400Regular",
        text100: "Montserrat_100Thin",
        text200: "Montserrat_200ExtraLight",
        text300: "Montserrat_300Light",
        text400: "Montserrat_400Regular",
        text500: "Montserrat_500Medium",
        text600: "Montserrat_600SemiBold",
        text700: "Montserrat_700Bold",
        text800: "Montserrat_800ExtraBold",
        text900: "Montserrat_900Black",
    },

    sizes: {
        xxs: normalize(5),
        xs: normalize(10),
        sm: normalize(12),
        md: normalize(14),
        lg: normalize(16),
        xl: normalize(18),
        xxl: normalize(22),
        icon: {
            xs: normalize(16),
            sm: normalize(20),
            md: normalize(24),
            lg: normalize(32),
        },
        padding: normalize(16),
        borderRadius: normalize(8),
    },

    normalize,
}