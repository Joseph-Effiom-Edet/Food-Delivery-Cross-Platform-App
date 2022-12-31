import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.containerView}>
        <View style={styles.wrapperView}>
          <View>
            <Text style={styles.headingText}>Basket</Text>
            <Text style={styles.titleText}>{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={navigation.goBack}
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        <View style={styles.deliveryContainer}>
          <Image
            style={styles.image}
            source={{
              uri: "https://images.pexels.com/photos/6831602/pexels-photo-6831602.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              height: 28,
              width: 28,
            }}
          />
          <Text style={{ flex: 1, marginLeft: 16 }}>Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text style={{ color: "#00CCBB" }}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View style={styles.basketItemsList} key={key}>
              <Text style={{ color: "#00CCBB" }}>{items.length} X</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                  height: 48,
                  width: 48,
                }}
                style={{ borderRadius: 9999, marginLeft: 12 }}
              />
              <Text style={{ flex: 1 }}>{items[0]?.name}</Text>
              <Text style={{ color: "#4B5563" }}>
                <Currency quantity={items[0]?.price} currency="GBP" />
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text
                  style={{ color: "#00CCBB", fontSize: 12, marginLeft: 12 }}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.subTotalContainer}>
          <View style={styles.subTotalWrapper}>
            <Text style={styles.subTotal}>Subtotal</Text>
            <Text style={styles.subTotalAmount}>
              <Currency quantity={basketTotal} currency="GBP" />
            </Text>
          </View>

          <View style={styles.subTotalWrapper}>
            <Text style={styles.subTotal}>Delivery Fee</Text>
            <Text style={styles.subTotalAmount}>
              <Currency quantity={5.99} currency="GBP" />
            </Text>
          </View>

          <View style={styles.subTotalWrapper}>
            <Text>Order Total</Text>
            <Text style={styles.orderTotalAmount}>
              <Currency quantity={basketTotal + 5.99} currency="GBP" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            style={styles.placeOrderButton}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  containerView: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  wrapperView: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#00CCBB",
    backgroundColor: "white",
    elevation: 5,
  },
  headingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleText: {
    textAlign: "center",
    color: "#9CA3AF",
  },
  touchableOpacity: {
    position: "absolute",
    top: 12,
    right: 20,
    borderRadius: 9999,
    backgroundColor: "#F3F4F6",
  },
  image: {
    padding: 16,
    borderRadius: 9999,
    backgroundColor: "#D1D5DB",
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    marginVertical: 20,
  },
  basketItemsList: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  subTotalContainer: {
    padding: 20,
    backgroundColor: "#FFFF",
    marginTop: 20,
  },
  subTotalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  subTotal: {
    color: "#9ca3af",
  },
  subTotalAmount: {
    color: "#9ca3af",
  },
  orderTotalAmount: {
    fontWeight: "800",
  },
  placeOrderButton: {
    borderRadius: 18,
    backgroundColor: "#00CCBB",
    padding: 16,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#FFFF",
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "700",
  },
});
