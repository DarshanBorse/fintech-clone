import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="registered" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="line-chart" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="exchange" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="bitcoin" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "LifeStyle",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="th" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default Layout;
