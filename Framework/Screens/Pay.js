import { Text, View } from 'react-native'
import { Paystack } from 'react-native-paystack-webview';
import { Theme } from '../Components/Theme';
import { useContext } from 'react';
import { AppContext } from '../Components/globalVariables';

export function Pay({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route?.params

    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey="pk_test_92fcc0077ec7f42a73ff01c87db79c3698b06dec"
                amount={amount + ((1.8 / 100) * amount)}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={() => {

                }}
                autoStart={true}
            />
        </View>
    )
}
