import classNames from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
function Details({navigation, route, ...props}) {
  const {restaurant, item, cat} = route?.params || {};
  const {user, cartItems, handleUserCart} = useAuth();
  const count = useMemo(() => {
    return cartItems?.[user?.email]?.items?.find(i => i.name === item.name)
      ?.name
      ? cartItems?.[user?.email]?.items?.find(i => i.name === item.name)?.count
      : 0;
  }, [user, cartItems, item.name]);
  useEffect(() => {
    console.log('===============count=====================');
    console.log(count);
    console.log('====================================');
  }, [count]);
  return (
    <View className="flex-1 bg-[#fcfcfd] relative">
      <View className="flex-1 p-5 bg-[#fcfcfd] relative">
        <View className="w-full h-[50px] flex flex-row items-center justify-between mb-5">
          <View className="h-full flex flex-row items-center gap-x-5">
            <TouchableOpacity onPress={navigation.goBack}>
              <View className="h-full aspect-square bg-[#ECF0F4] rounded-full justify-center items-center">
                <FaIcon name="chevron-left" size={16} color="black" />
              </View>
            </TouchableOpacity>
            <View className="max-w-[80%]">
              <View className="flex flex-row items-center gap-x-2 w-full ">
                <Text className="font-light text-sm overflow-hidden line-clamp-1 text-ellipsis text-black">
                  {item?.name}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-full aspect-square p-1">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('checkout');
              }}>
              <View className="h-full aspect-square bg-black rounded-full justify-center items-center  relative">
                <Ionicon name="bag-handle-outline" size={22} color={'white'} />
                <View
                  className={classNames(
                    'absolute w-[70%] left-[50%] bottom-[50%] aspect-square rounded-full bg-[#ff7622] flex justify-center items-center',
                    {hidden: !cartItems?.[user?.email]?.count},
                  )}>
                  <Text className=" text-white text-sm font-medium ">
                    {cartItems?.[user?.email]?.count || 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full aspect-[16/7] rounded-3xl bg-red-50 overflow-hidden">
          <Image source={cat?.image} className="w-full h-full" />
        </View>
        <View>
          <Text className="text-black font-medium text-xl line-clamp-2 text-ellipsis">
            {item.name}
          </Text>

          <Text className="text-black font-light text-sm line-clamp-2 text-ellipsis">
            {item.description || 'lorem phr'}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-3">
          <View className="flex flex-row items-center gap-x-2">
            <FaIcon name="star-o" size={16} color="#ff7622" />
            <Text className="text-sm font-medium text-black">
              {restaurant.rating}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <MIcons name="truck-fast-outline" size={20} color="#ff7622" />
            <Text className="text-sm font-medium text-black">
              {restaurant.deliveryCharge || 'free'} ₹{' '}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <MIcons name="clock-outline" size={20} color="#ff7622" />
            <Text className="text-sm font-medium text-black">
              {restaurant.deliveryTime} min
            </Text>
          </View>
        </View>
      </View>
      <View className="w-full aspect-video absolute bottom-0 left-0 bg-[#F0F5FA] rounded-t-[40px] p-5">
        <View className="w-full h-[50%] flex flex-row justify-between items-center">
          <Text className="text-black font-bold text-xl">
            {' '}
            ₹ {(count || 1) * item.price}
          </Text>
          <View
            className={classNames(
              'flex-row p-2 bg-black h-[50px] justify-between items-center rounded-full',
              {hidden: !count},
            )}>
            <TouchableOpacity
              onPress={() =>
                handleUserCart(user.email, item, restaurant, 'minus')
              }
              className="h-full aspect-square flex justify-center items-center bg-[#f5f5f533] rounded-full">
              <FaIcon name="minus" size={18} color="white" />
            </TouchableOpacity>
            <Text className="w-[20%] text-white font-medium text-center">
              {count}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleUserCart(user.email, item, restaurant, 'add');
              }}
              className="h-full aspect-square flex justify-center items-center bg-[#f5f5f533] rounded-full">
              <FaIcon name="plus" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!count) handleUserCart(user.email, item, restaurant, 'add');
          }}
          className="w-full px-5 p-2 rounded-md bg-[#ff7622] flex justify-center items-center h-[40px]">
          <Text className="text-white">
            {count ? 'GO TO CART' : 'ADD TO CART'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Details;
