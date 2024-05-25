import CustomHeader from "@/components/CustomHeader";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView intensity={100} tint="extraLight" style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }} />
        ),
        tabBarStyle: {
          backgroundColor: "trasparent",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="registered" size={size} color={color} />;
          },
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />

      <Tabs.Screen
        name="crypto"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="registered" size={size} color={color} />;
          },
          header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
    </Tabs>
  );
};

export default Layout;
