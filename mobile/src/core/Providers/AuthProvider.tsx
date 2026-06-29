// AuthContext.tsx
import { authTokenService } from '@/services/auth/authTokenService';
import { appFirstRunService, authFlowService, clearAllAppData, guestModeService, onboardingFlowStatusService } from '@/services/storage/appStorage';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { appLogger } from '../utils/loggers';
import { Route } from 'expo-router';

interface TokenType {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: ({ accessToken, refreshToken }: TokenType) => void;
  logout: () => void;
  startGuestMode: () => void;
  getInitialRoute: () => Route;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getInitialRoute = (): Route => {
    const onboardingComplete = onboardingFlowStatusService.getStatus();
    const authComplete = authFlowService.isComplete();
 

    if (isAuthenticated) return '/(protected)/(tabs)';
   
    return '/onboarding';
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
        const guestActive = guestModeService.isActive(); 

        appLogger(`refresh token expired: ${expired}, guest active: ${guestActive}`, { fileName: 'AuthProvider' });

        if (!expired) {
          setIsAuthenticated(true);
        
        } else if (guestActive) {
     
          setIsAuthenticated(false);
        } else {
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



  const startGuestMode = () => {
    guestModeService.setActive();
    setIsAuthenticated(false);
  };

  const login = async ({ accessToken, refreshToken }: TokenType) => {
    setIsAuthenticated(true);
  
    guestModeService.remove();
    await authTokenService.setToken({ accessToken, refreshToken });
  };

  const logout = async () => {
    await authTokenService.deleteToken();
    guestModeService.remove();
  
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, startGuestMode, getInitialRoute }}>
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
