import { useAuth, useClerk, useUser, useUserProfileModal } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false })
  const { presentUserProfile } = useUserProfileModal()

  console.log(isSignedIn,"isSignedIn")


  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  
  if (!isSignedIn) {
    return <Redirect href={'/(auth)'}/>
  }

  return (
      <Redirect href={'/(tabs)'}/>
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
