// AuthContext.tsx
import { authTokenService } from '@/services/auth/authTokenService';
import { appFirstRunService, clearAllAppData } from '@/services/storage/appStorage';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { appLogger } from '../utils/loggers';
import { Route } from 'expo-router';
import { useAuth as useClerkAuth } from '@clerk/expo'


interface TokenType {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ({ accessToken, refreshToken }: TokenType) => void;
  logout: () => void;
  getInitialRoute: () => Route;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isSignedIn, isLoaded,getToken } = useClerkAuth({ treatPendingAsSignedOut: false })
  const [isLoading, setIsLoading] = useState(isLoaded);
  

  const getInitialRoute = (): Route => {
    if (isAuthenticated) return '/(tabs)';

    return '/(auth)';
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const firstRun = appFirstRunService.isFirstRun();

        if (firstRun) {
          appLogger('Fresh install detected, clearing all previous data...');
          await clearAllAppData();
          appFirstRunService.markAsRun()
        }

        const expired = await authTokenService.isRefreshTokenExpired();

        appLogger(`refresh token expired: ${expired}`, { fileName: 'AuthProvider' });

        if (!expired) {
          setIsAuthenticated(true);
        }
        else {
          setIsAuthenticated(false);

        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);





  const login = async ({ accessToken, refreshToken }: TokenType) => {
    setIsAuthenticated(true);
    await authTokenService.setToken({ accessToken, refreshToken });
  };

  const logout = async () => {
    await authTokenService.deleteToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, getInitialRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
