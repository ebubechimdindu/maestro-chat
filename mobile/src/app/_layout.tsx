import '../../global.css';
import { AuthProvider } from "@/core/Providers/AuthProvider";
import ReactQueryProvider from "@/core/Providers/ReactQueryProvider";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import React from "react";
import { ClerkProvider } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!


if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}


export default function RootLayout() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#0D0D0F",
    },
  };


  return (
    <ReactQueryProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          
            <ThemeProvider value={theme}>
              <Slot/>
            </ThemeProvider>
            {/* <ToastManager config={toastConfig} /> */}
        
        </ClerkProvider>
    </ReactQueryProvider>
  )
}

