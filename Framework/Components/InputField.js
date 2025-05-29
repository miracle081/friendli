import { StyleSheet, Text, View, TextInput } from "react-native";
import { Theme } from "./Theme";

// Input field component
export function InputField({ label, placeholder, value, onChangeText, onBlur, keyboardType = "default", autoCapitalize = "none", error }) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder={placeholder}
                placeholderTextColor={Theme.colors.gray}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}


const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontFamily: Theme.fonts.text500,
        fontSize: 14,
        color: Theme.colors.light.text1,
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: Theme.colors.light.bg2,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontFamily: Theme.fonts.text400,
        fontSize: 16,
        color: Theme.colors.light.text1,
        borderWidth: 1,
        borderColor: Theme.colors.light.line,
    },
    inputError: {
        borderColor: Theme.colors.red,
    },
    errorText: {
        fontFamily: Theme.fonts.text400,
        fontSize: 12,
        color: Theme.colors.red,
        marginTop: 4,
    },
});