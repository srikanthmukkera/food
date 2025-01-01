import {SafeAreaView} from 'react-native';
import {useAuth} from './src/context/AuthContext';
import Login from './src/screens/login/Index';
import HomeTabs from './src/screens/home/HomeStack';
import SignUp from './src/screens/login/SignUp';

export const AuthRoutes = ({Stack}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="AuthRoot"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
};

export const UnAuthRoutes = ({Stack}) => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="splashScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Group>
  );
};
