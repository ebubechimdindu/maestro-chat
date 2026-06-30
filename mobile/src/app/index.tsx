import { useAuth } from "@/core/Providers/AuthProvider";
import { useAuth as useClerkAuth, useClerk, useUser, useUserProfileModal } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function Index() {
  const {isAuthenticated,isLoading,getInitialRoute} = useAuth()

  if (isLoading) return

  
  if (!isAuthenticated) {
    return <Redirect href={'/(auth)'}/>
  }

  return (
      <Redirect href={'/(auth)'}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered:{
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  }
});
