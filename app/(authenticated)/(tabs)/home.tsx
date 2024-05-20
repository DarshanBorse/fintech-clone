import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import RoundButton from "@/components/RoundButton";
import Dropdown from "@/components/Dropdown";
import { useBalanceStore } from "@/store/balanceStore";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import WidgetList from "@/components/sortableList/WidgetList";

const Page = () => {
  const { balance, clearTransaction, runTransaction, transactions } = useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added Money",
    });
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.background, marginBottom: 10 }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>$</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <RoundButton icon={"add"} text="Add Money" onPress={onAddMoney} />
        <RoundButton icon={"refresh"} text="Exchange" onPress={clearTransaction} />
        <RoundButton icon={"list"} text="Details" onPress={onAddMoney} />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transacctions</Text>
      <View style={styles.transactions}>
        {transactions.length == 0 && <Text style={{ padding: 40, color: Colors.gray }}>No Transaction Yet</Text>}
        {transactions.reverse().map((transaction) => {
          return (
            <View key={transaction.id} style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
              <View style={styles.circle}>
                <Ionicons name={transaction.amount > 0 ? "add" : "remove"} size={24} color={Colors.dark} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "500" }}>{transaction.title}</Text>
                <Text style={{ color: Colors.gray, fontSize: 12 }}>{transaction.date.toLocaleString()}</Text>
              </View>
              <Text>${transaction.amount}</Text>
            </View>
          );
        })}
      </View>

      <Text style={defaultStyles.sectionHeader}>Widget</Text>
      <WidgetList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 5,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
});
export default Page;
