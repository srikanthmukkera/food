import React, {useEffect, useMemo} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {categories} from '../../demo/restaurants/categories';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {categoryCard} from './HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import classNames from 'classnames';
import Animated from 'react-native-reanimated';

function Restaurant({route, ...props}) {
  const navigation = useNavigation();
  const {restaurant} = route?.params || {};
  const cats = useMemo(
    () =>
      [...new Set(restaurant.items.map(item => item?.category?.name))].map(
        cat => categories.find(category => category.name === cat),
      ),
    [categories, restaurant],
  );
  const {user, cartItems} = useAuth();

  useEffect(() => {}, [cats]);
  return (
    <View className="flex-1 p-5 bg-[#fcfcfd]">
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
                {restaurant?.name}
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
      <Animated.ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full aspect-[16/7] rounded-3xl bg-red-50 overflow-hidden">
          <Image
            source={
              categories.find(
                cat => cat.name === restaurant.items?.[0]?.category?.name,
              )?.image
            }
            className="w-full h-full"
          />
        </View>
        <View>
          <Text className="text-black font-medium text-xl line-clamp-2 text-ellipsis">
            {restaurant.name}
          </Text>

          <Text className="text-black font-light text-sm line-clamp-2 text-ellipsis">
            {restaurant.description || 'lorem phr'}
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
        <View className="w-full">
          <FlatList
            className="w-full h-[100px] "
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cats}
            keyExtractor={cat => cat.name}
            renderItem={({item, index}) => categoryCard(item, false)}
          />
        </View>
        <View className="flex-1 ">
          <FlatList
            data={['restaurantdata']}
            horizontal
            className="w-full"
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="w-full"
            renderItem={({item}) => (
              <FlatList
                data={cats}
                className="w-full"
                keyExtractor={item => item.name}
                renderItem={({item: cat, index}) => {
                  const categoryItems = restaurant.items.filter(
                    item => item.category.name === cat.name,
                  );
                  return (
                    <View>
                      <View>
                        <Text className="text-black text-xl ">
                          {cat.name} ({categoryItems.length})
                        </Text>
                      </View>
                      <FlatList
                        scrollEnabled={false}
                        numColumns={2}
                        keyExtractor={item => item.name}
                        data={categoryItems}
                        className=""
                        renderItem={({item}) => {
                          return (
                            <TouchableOpacity
                              className="w-[45%] m-[2.5%] aspect-[3/4] "
                              onPress={() =>
                                navigation.navigate('details', {
                                  restaurant,
                                  item,
                                  cat,
                                })
                              }>
                              <View className="w-full h-full">
                                <View className="absolute bottom-[0%] left-0 bg-white w-full h-[60%] rounded-3xl z-10">
                                  <View className=" absolute top-[-60%]  w-full aspect-[3/4] rounded-3xl z-10 px-5 items-center">
                                    <View className="w-[80%] aspect-square rounded-full bg-white overflow-hidden">
                                      <Image
                                        source={cat.image}
                                        className="w-full h-full shadow-sm"
                                      />
                                    </View>
                                  </View>
                                  <View className="  w-full h-full flex justify-start items-start p-2 z-10">
                                    <Text className="text-black font-medium text-sm mt-5">
                                      {item.name}
                                    </Text>
                                    <Text className="font-light text-xs line-clamp-2 text-black">
                                      {item.description}
                                    </Text>
                                    <View className="w-full flex flex-row justify-between items-center rounded-full mb-3">
                                      <Text className="text-black font-medium">
                                        ₹ {item?.price}
                                      </Text>
                                      <View className="w-8 aspect-square rounded-full bg-[#ff7622] flex justify-center items-center">
                                        <FaIcon
                                          name="plus"
                                          color="white"
                                          size={18}
                                        />
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  );
                }}
              />
            )}
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

export default Restaurant;
