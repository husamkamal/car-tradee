import {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { Cookies } from 'react-cookie';
import { UserContextType, UserContextTypeWithDispatch } from './interfaces';
import httpInstance from './services/axiosConfig';

export const UserContext = createContext<UserContextTypeWithDispatch>({
  userInfo: {
    id: 0,
    email: '',
    username: '',
    role: '',
  },
  setUserInfo: () => ({
    id: 0,
    email: '',
    username: '',
    role: '',
  }),
});

const cookies = new Cookies();
export default function UserInfoProvider({ children }: any) {
  const [userInfo, setUserInfo] = useState<UserContextType | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const result = await httpInstance.get('/auth/user');
        setUserInfo(result.data);
        cookies.set('token', result.data.token);
        localStorage.setItem('token', result.data.token);
      } catch (error) {
        setUserInfo(null);
      }
    };
    getUserInfo();
  }, []);
  const value = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo],
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
