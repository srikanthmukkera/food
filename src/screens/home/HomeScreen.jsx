import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../context/AuthContext';
import {greeting} from '../../utils/greetings';
import {categories} from '../../demo/restaurants/categories';
import {restaurants} from '../../demo/restaurants/restaurents';
import classNames from 'classnames';

export const categoryCard = (item = {}, showImage = true) => {
  return (
    <View
      className={classNames(
        'h-[50px] bg-white flex flex-row p-1 px-3 rounded-full m-auto mr-3 items-center gap-x-2',
        {
          shadow: Platform.OS === 'android',
          'shadow-sm': Platform.OS === 'ios',
        },
      )}>
      <View
        className={classNames(
          'h-[90%] aspect-square rounded-full overflow-hidden bg-white',
          {hidden: !showImage},
        )}>
        {item?.image ? (
          <Image className="w-full h-full " source={item.image} />
        ) : null}
      </View>
      <Text className="text-sm font-medium text-black px-5">{item.name}</Text>
    </View>
  );
};
function HomeScreen({navigation, ...props}) {
  const {
    safeAreaHeight: height,
    safeAreaWidth: width,
    setShowBottomTab,
  } = useTheme();
  const {user, cartItems} = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setShowBottomTab(false);
  }, [navigation]);

  const restaurantCard = restaurant => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('restaurent', {restaurant});
        }}>
        <View className="w-full aspect-[4/3] rounded-md  mb-4 p-3 overflow-hidden gap-y-2">
          <View className="w-full aspect-[16/7] rounded-2xl bg-red-50 overflow-hidden">
            <Image
              source={
                categories.find(
                  cat => cat.name === restaurant.items?.[0]?.category?.name,
                )?.image
              }
              className="w-full h-full"
            />
          </View>
          <View className="w-full flex-1 rounded-md p-1 gap-y-2 justify-between">
            <View>
              <Text className="text-black text-xl line-clamp-2 text-ellipsis">
                {restaurant.name}
              </Text>
              <Text className="line-clamp-2 text-ellipsis text-[#3f3f3f] text-sm">
                {[
                  ...new Set(
                    restaurant?.items?.map(item => item?.category?.name) || [],
                  ),
                ].join(' - ')}
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
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{height}} className="bg-white p-5">
      <View className="w-full gap-y-5 mb-3">
        <View className="w-full h-[50px] flex flex-row justify-between">
          <View className="h-full flex flex-row items-center gap-x-5">
            <View className="h-full aspect-square bg-[#ECF0F4] rounded-full justify-center items-center">
              <FeatherIcon name="bar-chart-2" size={24} className="rotate-90" />
            </View>
            <View className="max-w-[60%]">
              <Text className="text-sm font-medium text-[#ff7622] w-full">
                DELIVER TO
              </Text>
              <View className="flex flex-row items-center gap-x-2 w-full ">
                <Text className="font-light text-sm overflow-hidden line-clamp-1 text-ellipsis">
                  Tech Sophy office
                </Text>
                <FaIcon name="caret-down" size={16} />
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
        <View>
          <Text className="font-light text-sm">
            Hey {user?.name}, <Text className="font-medium ">{greeting}!</Text>
          </Text>
        </View>
        <View className="w-full p-2 px-3 bg-[#f6f6f6] rounded-md flex flex-row items-center">
          <FaIcon name="search" size={20} color={'#d5d5d5'} />
          <TextInput
            className="h-[40px] px-3"
            placeholder="Search dishes, restaurants"
          />
        </View>
      </View>
      <View className="py-2 w-full flex-row justify-between items-center">
        <Text className="text-lg text-black font-light"> All Categories</Text>
        <View className="flex flex-row items-center gap-x-1">
          <Text className="font-light text-black">See All</Text>
          <View>
            <FaIcon name="chevron-right" />
          </View>
        </View>
      </View>
      <View className="w-full">
        <FlatList
          className="w-full h-[100px] px-1"
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={cat => cat.name}
          renderItem={({item, index}) => categoryCard(item)}
        />
      </View>
      <View className="py-2 w-full flex-row justify-between items-center">
        <Text className="text-lg text-black font-light">
          {' '}
          Open Restaurants{' '}
        </Text>
        <View className="flex flex-row items-center gap-x-1">
          <Text className="font-light text-black">See All</Text>
          <View>
            <FaIcon name="chevron-right" />
          </View>
        </View>
      </View>
      <View className="w-full flex-1">
        <FlatList
          className="flex-1"
          showsVerticalScrollIndicator={false}
          data={restaurants}
          keyExtractor={item => item.name}
          renderItem={({item}) => restaurantCard(item)}
        />
      </View>
    </View>
  );
}

export default HomeScreen;
