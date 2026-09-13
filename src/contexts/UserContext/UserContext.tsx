import React, { createContext, useCallback, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { identifyCrashlyticsUser } from '@services/crashlytics';
import {
  createUser as createUserService,
  getUser as getUserService,
  postAuth,
} from '@services/user';
import { CreateUserRequest, User } from '@typings/user';

import { UserContextData } from './UserContext.types';

const USER_TOKEN_KEY = '@ecommerce:user-token';

export const UserContext = createContext<UserContextData | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsAuthPending(true);
    try {
      const response = await postAuth(email, password);
      await AsyncStorage.setItem(USER_TOKEN_KEY, response.access_token);
      setToken(response.access_token);

      const userData = await getUserService(response.access_token);
      setUser(userData);
      setIsLoggedIn(true);

      return { access_token: response.access_token, user: userData };
    } finally {
      setIsAuthPending(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  const getUser = useCallback(async () => {
    if (!token) return;
    const response = await getUserService(token);
    setUser(response);
    setIsLoggedIn(true);
  }, [token]);

  const createUser = useCallback(async (user: CreateUserRequest) => {
    const response = await createUserService(user);
    setUser(response);
    setIsLoggedIn(true);
    return response;
  }, []);

  useEffect(() => {
    void identifyCrashlyticsUser(user);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const storedToken = await AsyncStorage.getItem(USER_TOKEN_KEY);

        if (!storedToken) {
          setIsLoading(false);
          return;
        }

        setToken(storedToken);

        const userData = await getUserService(storedToken);
        setUser(userData);
        setIsLoggedIn(true);
      } catch {
        await AsyncStorage.removeItem(USER_TOKEN_KEY);
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthPending,
        isLoggedIn,
        login,
        logout,
        getUser,
        createUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
