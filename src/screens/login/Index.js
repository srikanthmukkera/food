import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import h1 from '../../assets/images/h1.jpeg';
import {useAuth} from '../../context/AuthContext';
import {TextInput} from 'react-native-gesture-handler';
import {validateEmail, validatePassword} from '../../utils/validator';
import Icon from 'react-native-vector-icons/EvilIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome6';
import LoginTheme from '../../components/theme/LoginTheme';
function Login({navigation, ...props}) {
  const {login, authenticateUser} = useAuth();
  const [mail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  const [mailError, setMailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const title = (
    <View className="w-full aspect-video my-3 flex items-center justify-center">
      <Text className="text-white text-2xl font-bold">Log In</Text>
      <Text className="text-white text-lg ">
        Please sign in to your existing account
      </Text>
    </View>
  );

  const body = (
    <View className="flex justify-end items-center  w-full ">
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>EMAIL</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder="example@gmail.com"
          onChangeText={value => {
            setUserMail(value);
            setMailError('');
          }}
        />
        <Text className="text-red-900 text-xs">{mailError}</Text>
      </View>
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>PASSWORD</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder="Enter email"
          value={password}
          secureTextEntry={true}
          onChangeText={value => {
            setPassword(value);
            setPasswordError('');
          }}
        />
        <Text className="text-red-900 text-xs">{passwordError}</Text>
      </View>
      <View className="w-full mb-2 flex flex-row justify-between items-center gap-y-1 rounded-md">
        <View className="mb-2 flex flex-row gap-x-4 gap-y-1 items-center rounded-md">
          <View className="rounded-md border border-[#d5d5d5] w-6 h-6"></View>
          <Text>Remember me</Text>
        </View>
        <Text className="text-[#ff7622]">Forgot Password</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (!validateEmail(mail)) {
            setMailError('Please enter valid email');
          }
          if (!validatePassword(password)) {
            setPasswordError(
              'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
            );
            return;
          }
          if (mail && validateEmail(mail)) {
            const result =
              authenticateUser({email: mail, password: password}) || {};
            if (!result?.auth) {
              setPasswordError(result?.message?.password);
              setMailError(result?.message?.email);
              return;
            }
            if (result.auth)
              login({
                user: {
                  ...result.user,
                  user_type_name: 'guest',
                },
                token: 'token',
              });
          }
        }}
        className="p-3 my-3 bg-[#ff7622]  w-full flex justify-center items-center rounded-xl">
        <Text className="text-white font-bold text-xl mb-1 text-center ">
          Log In
        </Text>
      </TouchableOpacity>
      <View className="w-full mb-2 flex flex-row justify-center items-center gap-y-1 rounded-md">
        <Text className="">Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('signup', {
              user: {email: mail, password: password},
            });
          }}>
          <Text className="text-[#ff7622]"> SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <View className="w-full mb-2 flex flex-row justify-center items-center gap-y-1 rounded-md">
        <Text className=""> Or</Text>
      </View>

      <View className="w-full mb-2 flex flex-row justify-center gap-x-8 items-center gap-y-1 rounded-md">
        <View className="w-12 aspect-square rounded-full bg-[#395998] flex justify-center items-center">
          <Icon name="sc-facebook" size={32} color="white" />
        </View>
        <View className="w-12 aspect-square rounded-full bg-[#169CE8] flex justify-center items-center">
          <Icon name="sc-twitter" size={32} color="white" />
        </View>
        <View className="w-12 aspect-square rounded-full bg-[#1B1F2F] flex justify-center items-center">
          <FaIcon name="apple" size={22} color="white" />
        </View>
      </View>
    </View>
  );
  return <LoginTheme showBack={false} title={title} body={body} />;
}

export default Login;
