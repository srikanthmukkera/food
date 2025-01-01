import {useNavigation} from '@react-navigation/native';
import classNames from 'classnames';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
function LoginTheme({showBack = true, title, body, ...props}) {
  const navigation = useNavigation();

  return (
    <View className="flex-1 w-full h-full relative flex items-center">
      <TouchableOpacity
        onPress={navigation.goBack}
        className={classNames(
          'absolute top-4 left-4 z-50 w-12 h-12 rounded-full bg-white',
          {hidden: !showBack},
        )}>
        <View className="w-full h-full justify-center items-center">
          <Icon name="chevron-left" size={20} color="black" />
        </View>
      </TouchableOpacity>
      <View className="w-full h-[45%] bg-[#121223]">{title}</View>
      <View className="w-full h-[75%] absolute bottom-0 bg-white rounded-t-3xl p-8">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {body}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}

export default LoginTheme;
