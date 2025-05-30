import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatMoney } from '../Components/FormatMoney';
import { AppContext } from '../Components/globalVariables';

export const Wallet = ({ navigation }) => {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const [showBalance, setShowBalance] = useState(true);
    const transactions = [
        {
            id: 1,
            title: 'Coffee Shop',
            amount: -400.50,
            date: 'Today',
            icon: 'coffee',
            type: 'expense'
        },
        {
            id: 2,
            title: 'Salary',
            amount: 350000.00,
            date: 'Yesterday',
            icon: 'money',
            type: 'income'
        },
        {
            id: 3,
            title: 'Shopping',
            amount: -8900.99,
            date: 'May 27',
            icon: 'shopping-bag',
            type: 'expense'
        },
        {
            id: 4,
            title: 'Gas Station',
            amount: -4500.00,
            date: 'May 26',
            icon: 'car',
            type: 'expense'
        },
        {
            id: 5,
            title: 'Rent',
            amount: -120000.00,
            date: 'May 24',
            icon: 'home',
            type: 'expense'
        }
    ];

    const balance = userInfo.balance;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                            <FontAwesome
                                name={showBalance ? "eye" : "eye-slash"}
                                size={18}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.balanceAmount}>
                        ₦{showBalance ? formatMoney(balance) : '******'}
                    </Text>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => navigation.navigate("FundWallet")} style={styles.addButton}>
                            <FontAwesome name="plus" size={16} color="white" />
                            <Text style={styles.buttonText}>Add Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sendButton}>
                            <FontAwesome name="send" size={16} color="#007AFF" />
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Transactions */}
                <View style={styles.transactionsSection}>
                    <Text style={styles.sectionTitle}>Recent Transactions</Text>

                    {transactions.map((item) => (
                        <View key={item.id} style={styles.transactionItem}>
                            <View style={styles.iconContainer}>
                                <FontAwesome
                                    name={item.icon}
                                    size={20}
                                    color={item.type === 'income' ? '#4CAF50' : '#FF5722'}
                                />
                            </View>

                            <View style={styles.transactionInfo}>
                                <Text style={styles.transactionTitle}>{item.title}</Text>
                                <Text style={styles.transactionDate}>{item.date}</Text>
                            </View>

                            <Text style={[
                                styles.transactionAmount,
                                { color: item.type === 'income' ? '#4CAF50' : '#FF5722' }
                            ]}>
                                {item.amount > 0 ? '+' : ''}₦{formatMoney(Math.abs(item.amount))}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    balanceCard: {
        backgroundColor: 'white',
        margin: 20,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#666',
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 10,
    },
    addButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        gap: 8,
    },
    sendButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 10,
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
    sendButtonText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    transactionsSection: {
        backgroundColor: 'white',
        margin: 20,
        marginTop: 0,
        padding: 20,
        borderRadius: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    transactionDate: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});