import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        style={styles.touchableOpacity}
      >
        <Text style={styles.quantityText}>{items.length}</Text>
        <Text style={styles.viewBasket}>View Basket</Text>
        <Text style={styles.currencyText}>
          <Currency quantity={basketTotal} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    zIndex: 50,
  },
  touchableOpacity: {
    backgroundColor: "#00CCBB",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
    backgroundColor: "#01A296",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  viewBasket: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  currencyText: {
    fontSize: 18,
    color: "white",
    fontWeight: "800",
  },
});

export default BasketIcon;
