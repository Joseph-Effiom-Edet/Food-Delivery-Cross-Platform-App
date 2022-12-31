import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  function addItemToBasket() {
    dispatch(addToBasket({ id, name, description, price, image }));
  }

  function removeItemFromBasket() {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  }

  return (
    <>
      <TouchableOpacity
        style={styles.touchOpacity(isPressed)}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={{ fontSize: 18, marginBottom: 4 }}>{name}</Text>
            <Text style={{ color: "#9CA3AF" }}>{description}</Text>
            <Text style={{ color: "#9CA3AF", marginTop: 8 }}>
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>
          <View>
            <Image
              style={styles.imageStyles}
              source={{ uri: urlFor(image).url(), width: 80, height: 80 }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View style={{ backgroundColor: "white", paddingHorizontal: 16 }}>
          <View style={styles.quantityView}>
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
              style={{ marginRight: 8 }}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity
              onPress={addItemToBasket}
              style={{ marginLeft: 8 }}
            >
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageStyles: {
    backgroundColor: "#D1D5DB",
    padding: 16,
    borderWidth: 4,
    borderColor: "#f3F3F4",
  },
  touchOpacity: (isPressed) => ({
    backgroundColor: "white",
    borderWidth: 1,
    padding: 16,
    borderColor: "#E5E7EB",
    borderBottomWidth: isPressed ? 0 : 1,
  }),
  quantityView: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },
});

export default DishRow;
