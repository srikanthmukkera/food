import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import LoginTheme from '../../components/theme/LoginTheme';
import {useAuth} from '../../context/AuthContext';
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from '../../utils/validator';

function SignUp({route, navigation, ...props}) {
  const {login, authenticateUser, setUsers, _users} = useAuth();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    retypepassword: '',
    name: '',
  });
  const [userInfoError, setUserInfoError] = useState({
    email: '',
    password: '',
    retypepassword: '',
    name: '',
  });
  const {email, password} = route?.params?.user || {};
  useEffect(() => {
    setUserInfo(prev => ({...prev, email, password, retypepassword: password}));
  }, [email, password]);

  const validateUserInfo = () => {
    const {email, password, name, retypepassword} = userInfo;

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidRetypePassword = password === retypepassword;
    const isValidName = validateFullName(name);
    setUserInfoError({
      email: isValidEmail ? undefined : 'Please enter valid email id',
      name: isValidName
        ? undefined
        : 'Full name should only contain Alphabets and spance',
      password: isValidPassword
        ? undefined
        : 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
      retypepassword:
        isValidRetypePassword || !isValidPassword
          ? undefined
          : 'Should match with password',
    });
    return (
      isValidEmail && isValidName && isValidPassword && isValidRetypePassword
    );
  };
  const body = (
    <View className="flex justify-end items-center  w-full ">
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>NAME</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder="John Doe"
          value={userInfo?.name}
          onChangeText={value => {
            setUserInfo(prev => ({...prev, name: value}));
            setUserInfoError(prev => ({...prev, name: ''}));
          }}
        />
        <Text className="text-red-900 text-xs">{userInfoError.name}</Text>
      </View>
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>EMAIL</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder="example@gmail.com"
          value={userInfo?.email}
          onChangeText={value => {
            setUserInfo(prev => ({...prev, email: value}));
            setUserInfoError(prev => ({...prev, email: ''}));
          }}
        />
        <Text className="text-red-900 text-xs">{userInfoError.email}</Text>
      </View>
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>PASSWORD</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder=". . . . ."
          secureTextEntry={true}
          value={userInfo.password}
          onChangeText={value => {
            setUserInfo(prev => ({...prev, password: value}));
            setUserInfoError(prev => ({...prev, password: ''}));
          }}
        />
        <Text className="text-red-900 text-xs">{userInfoError.password}</Text>
      </View>
      <View className="w-full mb-2 flex gap-y-1 rounded-md">
        <Text>RE-TYPE PASSWORD</Text>
        <TextInput
          className="p-3 bg-slate-100 border border-gray-200 rounded-md "
          placeholder=". . . . ."
          secureTextEntry={true}
          value={userInfo?.retypepassword}
          onChangeText={value => {
            setUserInfo(prev => ({...prev, retypepassword: value}));
            setUserInfoError(prev => ({...prev, retypepassword: ''}));
          }}
        />
        <Text className="text-red-900 text-xs">
          {userInfoError.retypepassword}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          const isValid = validateUserInfo();
          console.log('====================================');
          console.log(isValid, 'isvalid');
          console.log('====================================');
          if (!isValid) return;
          const result = authenticateUser(userInfo);
          console.log('====================================');
          console.log(result, 'isvalid');
          console.log('====================================');
          if (result?.isExist) {
            setUserInfoError(prev => ({
              ...prev,
              email: 'User email already exists.',
            }));
            return;
          }
          setUsers([..._users, userInfo]);
          login({user: {...userInfo, user_type_name: 'guest'}, token: 'token'});
        }}
        className="p-3 my-3 bg-[#ff7622]  w-full flex justify-center items-center rounded-xl">
        <Text className="text-white font-bold text-xl mb-1 text-center ">
          SIGN UP
        </Text>
      </TouchableOpacity>
    </View>
  );
  return <LoginTheme body={body} />;
}

export default SignUp;
