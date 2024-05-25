import { View, Text, SectionList, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";

const categories = ["Overview"];

const Page = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json());
      return info[+id!];
    },
  });

  const { data: tickers } = useQuery({
    queryKey: ["tickers"],
    queryFn: async () => {
      return await fetch(`/api/tickers`).then((res) => res.json());
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        keyExtractor={(i) => i.title}
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => {
          return (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 16,
                paddingBottom: 8,
                backgroundColor: Colors.background,
                borderBottomColor: Colors.lightGray,
                borderBottomWidth: StyleSheet.hairlineWidth,
                paddingTop: 7,
              }}
            >
              {categories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setActiveIndex(index)}
                  style={activeIndex == index ? styles.categoriesBtnActive : styles.categoriesBtn}
                >
                  <Text style={activeIndex == index ? styles.categoryTextActive : styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          );
        }}
        style={{ marginTop: headerHeight }}
        scrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        ListHeaderComponent={() => (
          <>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 16 }}
            >
              <Text style={styles.subTitle}>{data?.symbol}</Text>
              <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
            </View>

            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[defaultStyles.pillButtonSmall, { backgroundColor: Colors.primary, flexDirection: "row", gap: 10 }]}
              >
                <Ionicons name="add" size={24} color={"#fff"} />
                <Text style={[defaultStyles.buttonText, { color: "#fff" }]}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primaryMuted, flexDirection: "row", gap: 10 },
                ]}
              >
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Recieved</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={{ height: 400, marginHorizontal: "auto" }}>
              {tickers && (
                <LineChart
                  data={{
                    labels:
                      tickers?.map(
                        ({ timestamp }: { timestamp: string }) =>
                          `${moment(timestamp).format("DD")}/${moment(timestamp).format("MM")}`
                      ) || [],
                    datasets: [
                      {
                        data: tickers?.map(({ price }: { price: any }) => price?.toFixed(2) / 12) || [],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 30}
                  height={400}
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              )}
            </View>
            <View style={[defaultStyles.block, { marginTop: 20, marginBottom: 20 }]}>
              <Text style={styles.subTitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent
                from user to user on the peer-to-peer bitcoin network without the need for intermediaries. Transactions are
                verified by network nodes through cryptography and recorded in a public distributed ledger called a
                blockchain.
              </Text>
            </View>
          </>
        )}
      ></SectionList>
    </>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.gray,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
});

export default Page;
