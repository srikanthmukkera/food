import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FaIcon5 from 'react-native-vector-icons/FontAwesome5';

function PaymentSuccess({navigation, route, ...props}) {
  const {
    transactionAmount,
    transactionId,
    transactionDate,
    typeOfTrnsaction,
    status,
  } = route?.params || {};
  return (
    <View className="flex-1 flex justify-center items-center p-5">
      <View className="w-full h-full flex items-center justify-around">
        <View className="p-8 rounded-full bg-[#93E49B22] relative">
          <View className="p-8 rounded-full bg-[#93E49B]">
            <View>
              <FaIcon5 name="check" color="white" size={40} />
            </View>
          </View>
        </View>
        <View className="items-center">
          <Text className="font-bold text-xl text-black">
            Payment successful
          </Text>
          <Text className="font-light text-black">
            Amount ₹ {transactionAmount} paid
          </Text>
        </View>
        <View className="w-[80%] aspect-square border border-[#d5d5d5] rounded-xl p-3">
          <Text className="text-black font-semibold py-2 text-lg">
            Transaction Details
          </Text>
          <View className="flex flex-row justify-between py-3">
            <Text className="text-[#3e3e3e] text-sm font-light">
              Transaction ID
            </Text>
            <Text className="text-black text-sm font-medium">
              {transactionId}
            </Text>
          </View>
          <View className="flex flex-row justify-between py-3">
            <Text className="text-[#3e3e3e] text-sm font-light">Date</Text>
            <Text className="text-black text-sm font-medium">
              {transactionDate}
            </Text>
          </View>
          <View className="flex flex-row justify-between py-3">
            <Text className="text-[#3e3e3e] text-sm font-light">
              Type of transaction
            </Text>
            <Text className="text-black text-sm font-medium">
              {typeOfTrnsaction}
            </Text>
          </View>
          <View className="flex flex-row justify-between py-3">
            <Text className="text-[#3e3e3e] text-sm font-light">Status</Text>
            <Text className="text-black text-sm font-medium">{status}</Text>
          </View>
          <View className="flex flex-row justify-between py-3">
            <Text className="text-[#3e3e3e] text-sm font-light">Amount</Text>
            <Text className="text-black text-sm font-medium">
              ₹ {transactionAmount} /-
            </Text>
          </View>
        </View>
        <View className="w-[80%] rounded-xl">
          <TouchableOpacity
            onPress={() => navigation.navigate('/')}
            className="w-full px-5 p-5 rounded-md bg-[#00843B] flex justify-center items-center ">
            <Text className="text-white">GO TO HOME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PaymentSuccess;
