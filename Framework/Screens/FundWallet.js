import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../Components/Theme';

export const FundWallet = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false);

    const quickAmounts = [500, 1000, 2000, 5000];

    const handleFund = () => {
        if (amount && parseFloat(amount) > 0) {
            setShowModal(true);
        }
    };

    const confirmDeposit = () => {
        setShowModal(false);
        navigation.navigate("Pay", { amount })
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Amount Input */}
            <View style={styles.amountSection}>
                <Text style={styles.label}>Enter Amount</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.currency}>₦</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="0.00"
                        keyboardType="numeric"
                        placeholderTextColor="#ccc"
                    />
                </View>
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickAmounts}>
                <Text style={styles.quickLabel}>Quick Select</Text>
                <View style={styles.quickRow}>
                    {quickAmounts.map((quickAmount) => (
                        <TouchableOpacity
                            key={quickAmount}
                            style={styles.quickButton}
                            onPress={() => setAmount(quickAmount.toString())}
                        >
                            <Text style={styles.quickText}>₦{quickAmount}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Fund Button */}
            <TouchableOpacity
                style={[styles.fundButton, !amount && styles.disabled]}
                onPress={handleFund}
                disabled={!amount}
            >
                <Text style={styles.fundText}>Continue</Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal visible={showModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIcon}>
                            <FontAwesomeIcon icon={faWallet} size={24} color={Theme.colors.primary} />
                        </View>

                        <Text style={styles.modalTitle}>Confirm Deposit</Text>
                        <Text style={styles.modalAmount}>₦{amount}</Text>
                        <Text style={styles.modalSubtext}>
                            You're about to fund your account with this amount via PayStack
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={confirmDeposit}
                            >
                                <Text style={styles.confirmText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    amountSection: {
        backgroundColor: 'white',
        margin: 20,
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Theme.colors.primary,
        paddingBottom: 10,
    },
    currency: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    amountInput: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    quickAmounts: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: 0,
        padding: 20,
        borderRadius: 15,
    },
    quickLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    quickRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    quickButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    quickText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    fundButton: {
        backgroundColor: Theme.colors.primary,
        margin: 20,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabled: {
        backgroundColor: '#ccc',
    },
    fundText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        minWidth: 300,
    },
    modalIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#f0f8ff',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalAmount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Theme.colors.primary,
        marginBottom: 10,
    },
    modalSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelText: {
        color: '#666',
        fontWeight: '600',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: Theme.colors.primary,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmText: {
        color: 'white',
        fontWeight: '600',
    },
});