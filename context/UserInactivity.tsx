import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "inactivity-storage",
});

export const UserInActivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  const { isSignedIn } = useAuth();
  console.log("🚀 ~ file: UserInactivity.tsx:16 ~ UserInActivityProvider ~ isSignedIn:", isSignedIn);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // && appState.current.match(/background/)
    if (nextAppState == "background") {
      recordStartTime();
    } else if (nextAppState == "active") {
      console.log("We are back", Date.now() - (storage.getNumber("startTime") || 0));

      console.log("🚀 ~ file: UserInactivity.tsx:34 ~ handleAppStateChange ~ isSignedIn:", isSignedIn);
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      if (elapsed > 3000 && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }
  };

  const recordStartTime = () => {
    console.log("Recording Start time");
    storage.set("startTime", Date.now());
  };

  return children;
};
