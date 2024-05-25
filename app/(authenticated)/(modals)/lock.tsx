import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

const lock = () => {
  const { user } = useUser();
  const [firstName, setFirstName] = useState<string | null | undefined>(user?.firstName);
  const [code, setCode] = useState<number[]>([]);

  const codeLength = Array(6).fill(0);
  const router = useRouter();

  useEffect(() => {
    if (code?.length == 6) {
      if (code.join("") == "111111") {
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access the app.",
      fallbackLabel: "Use passcode instead?",
      disableDeviceFallback: true,
      cancelLabel: "Cancel",
    });

    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      setCode([]);
    }
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      console.log("🚀 ~ file: lock.tsx:53 ~ compatible:", compatible);
    })();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.greeting}>Welcome back, {firstName}</Text>
      <View style={[styles.codeView]}>
        {codeLength.map((_, index) => {
          return (
            <View
              key={index}
              style={[
                styles.codeEmpty,
                {
                  backgroundColor: code[index] ? Colors.primary : Colors.lightGray,
                },
              ]}
            ></View>
          );
        })}
      </View>
      <View style={styles.numberView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number, index) => (
            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number, index) => (
            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number, index) => (
            <TouchableOpacity key={index} onPress={() => onNumberPress(number)}>
              <Text style={styles.number}>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity onPress={onBiometricAuthPress}>
            <MaterialCommunityIcons name="face-recognition" size={26} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNumberPress(0)}>
            <Text style={styles.number}>0</Text>
          </TouchableOpacity>
          <View style={{ minWidth: 30 }}>
            {code.length > 0 && (
              <TouchableOpacity onPress={numberBackSpace}>
                <Text style={styles.number}>
                  <MaterialCommunityIcons name="backspace-outline" size={26} color={"black"} />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default lock;

const styles = StyleSheet.create({
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 80,
    alignSelf: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    marginVertical: 100,
    alignItems: "center",
    gap: 20,
  },
  codeEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  numberView: {
    marginHorizontal: 80,
    gap: 60,
  },
  number: {
    fontSize: 32,
  },
});
