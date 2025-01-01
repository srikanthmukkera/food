import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {categories} from '../../demo/restaurants/categories';
import classNames from 'classnames';

export default function Checkout(props) {
  const navigation = useNavigation();
  const {safeAreaHeight: height, safeAreaWidth: width} = useTheme();
  const {user, cartItems, handleUserCart} = useAuth();

  return (
    <View style={{height, width, flex: 1}}>
      <View
        className="w-full bg-[#121223]"
        style={{height: height + 50 - (width * 3) / 4}}>
        <View className="w-full h-[50px] flex flex-row items-center justify-between mb-5 px-5 mt-5">
          <View className="h-full flex flex-row items-center gap-x-5">
            <TouchableOpacity onPress={navigation.goBack}>
              <View className="h-full aspect-square bg-[#ECF0F4] rounded-full justify-center items-center">
                <FaIcon name="chevron-left" size={16} color="black" />
              </View>
            </TouchableOpacity>
            <View className="max-w-[80%]">
              <View className="flex flex-row items-center gap-x-2 w-full ">
                <Text className="font-light text-lg overflow-hidden line-clamp-1 text-ellipsis text-white">
                  Cart
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-1 ">
          <FlatList
            className="flex-1"
            data={
              cartItems?.[user.email]?.count &&
              cartItems?.[user.email]?.items
                ?.filter(item => item?.count)
                ?.sort((a, b) => a?.name < b.name)
            }
            keyExtractor={item => item.name}
            renderItem={({item, index}) => {
              const cat = categories.find(c => c.name === item?.category?.name);
              return (
                <View className="w-full h-[140px] mb-2 p-2 flex flex-row gap-x-3">
                  <View className="h-full relative aspect-square rounded-3xl bg-[#d5d5d533] overflow-hidden flex justify-center items-center">
                    <Image
                      source={cat?.image}
                      className="h-[80%] aspect-square rounded-full"
                    />
                  </View>
                  <View
                    className="flex"
                    style={{width: width - 48 - 140 * 0.8}}>
                    <Text className="line-clamp-2 font-medium text-white">
                      {item?.name}
                    </Text>
                    <Text className="line-clamp-2 font-light text-xs text-white">
                      {item?.description}
                    </Text>
                    <Text className="text-white font-bold">
                      ₹ {item?.price}
                    </Text>
                    <View className="w-full h-[34px] lx flex-row justify-end">
                      <View
                        className={classNames(
                          'flex-row p-2 h-full justify-between items-center rounded-full',
                          {hidden: !item?.count},
                        )}>
                        <TouchableOpacity
                          onPress={() =>
                            handleUserCart(
                              user.email,
                              item,
                              cartItems?.[user?.email]?.restaurant,
                              'minus',
                            )
                          }
                          className="h-full aspect-square flex justify-center items-center bg-[#f5f5f533] rounded-full">
                          <FaIcon name="minus" size={12} color="white" />
                        </TouchableOpacity>
                        <Text className="w-[20%] text-white font-medium text-center">
                          {item?.count}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleUserCart(
                              user.email,
                              item,
                              cartItems?.[user?.email]?.restaurant,
                              'add',
                            );
                          }}
                          className="h-full aspect-square flex justify-center items-center bg-[#f5f5f533] rounded-full">
                          <FaIcon name="plus" size={12} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View className="h-[50px] w-fll"></View>
      </View>
      <View className="w-full aspect-[4/3] absolute bottom-0 left-0 bg-white rounded-t-[40px] justify-around p-5 flex gap-y-3">
        <View className="w-full flex-row justify-between items-center">
          <Text>DELIVERY ADDRESS</Text>
          <Text className="text-[#ff7622] underline">EDIT</Text>
        </View>
        <View className="">
          <Text className="line-clamp-3 text-xs text-black font-light p-4 bg-[#F0F5FA] rounded-2xl">
            GUTENBERG IT Park, 3rd Floor, Kalajyothi Rd, Masjid Banda, Sai
            Pruthvi Enclave, Kondapur, Telangana 500084
          </Text>
        </View>
        <View className="w-full h-fit flex flex-row justify-between items-center">
          <View className="flex flex-row items-center gap-x-2">
            <Text className="text-black text-xl">Total: </Text>
            <Text className="text-black font-bold text-xl">₹</Text>
          </View>
          <View className="flex flex-row items-center gap-x-2">
            <Text className="text-black">Breakdown</Text>
            <FaIcon name="chevron-right" color="black" />
          </View>
        </View>
        <TouchableOpacity className="w-full px-5 p-5 rounded-md bg-[#ff7622] flex justify-center items-center ">
          <Text className="text-white">PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
