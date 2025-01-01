import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import useAsyncStorageM from '../utils/asyncStorage/useAsyncStorageM';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {users} from '../demo/users/users';

const AuthContext = createContext({
  user: null,
  loader: null,
  token: null,
  logout: () => {},
  login: () => {},
  deviceToken: null,
  _users: [],
  setUserPhoto: () => {},
  authenticateUser: () => {},
  setUsers: () => {},
  cartItems: {},
  transactionData: {},
  setCartItems: () => {},
  handleUserCart: () => {},
  handleTransaction: () => {},
});

export const AuthProvider = ({children}) => {
  const [_users, setUsers] = useAsyncStorageM('users', users);
  const [cartItems, setCartItems] = useAsyncStorageM('userCartItems', {});
  const [transactionData, setTransactionData] = useAsyncStorageM(
    'userTransactionsData',
    {},
  );

  const [user, setUser] = useAsyncStorageM('user', null);
  const [token, setToken] = useAsyncStorageM('token', '');
  const [loader, setLoader] = useState(false);
  const [deviceToken, setDeviceToken] = useAsyncStorageM('deviceToken', '');

  useEffect(() => {
    // setUsers(users);
  }, []);

  const handleUserCart = (user, item, restaurant, action) => {
    if (user) {
      const isUserCartExist =
        cartItems?.[user]?.restaurant?.name === restaurant?.name &&
        cartItems?.[user]?.count;
      const isExist =
        cartItems?.[user]?.items?.find(i => i?.name === item?.name)?.count || 0;
      const items = (
        isUserCartExist
          ? isExist
            ? cartItems?.[user]?.items?.map(i =>
                i?.name !== item.name
                  ? i
                  : {
                      ...item,
                      count: isExist
                        ? isExist + (action === 'add' ? 1 : -1)
                        : action === 'add'
                        ? 1
                        : 0,
                    },
              )
            : [
                ...cartItems?.[user]?.items,
                {
                  ...item,
                  count: action === 'add' ? 1 : 0,
                },
              ]
          : [action === 'add' ? {...item, count: 1} : {...item, count: 0}]
      ).filter(i => i.name);

      console.log(items, 'items=====');

      let _cartItems = {
        ...cartItems,
        [user]: {
          restaurant,
          items,
          count: items.reduce((prev, curr) => prev + curr?.count || 0, 0),
        },
      };
      console.log(isUserCartExist, isExist, JSON.stringify(_cartItems));

      setCartItems(_cartItems);
    }
  };

  const handleTransaction = _transactionData => {
    setTransactionData({
      ...transactionData,
      [user?.email]: [
        ...(transactionData?.[user?.email] || []),
        _transactionData,
      ],
    });
  };

  const authenticateUser = user => {
    const availableUser = _users.find(u => u.email === user?.email);
    const isExist = !!availableUser?.email;
    const loggedIn = isExist && availableUser.password === user.password;
    return {
      isExist,
      auth: loggedIn,
      user: availableUser,
      message: {
        email:
          loggedIn || isExist
            ? undefined
            : 'Email not exist. Please login with registered email id',
        password: isExist
          ? loggedIn
            ? undefined
            : 'In correct Password, Please enter valid password.'
          : undefined,
      },
    };
  };
  const login = async data => {
    setLoader(true);

    if (data?.user?.user_type_name) {
      setUser(data?.user);
      setToken(data?.token);
    }
  };

  const logout = async () => {
    setUser({...user, user_type_name: ''});
    try {
    } catch (err) {}
    setToken('');
  };

  const value = useMemo(
    () => ({
      _users,
      user,
      login,
      logout,
      token,
      loader,
      setLoader,
      deviceToken,
      setDeviceToken,
      authenticateUser,
      setUsers,
      cartItems,
      setCartItems,
      handleUserCart,
      transactionData,
      handleTransaction,
    }),
    [user, _users, token, loader, deviceToken, cartItems, transactionData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
