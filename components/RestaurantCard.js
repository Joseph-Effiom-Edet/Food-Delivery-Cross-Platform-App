import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      style={styles.touchOpacity}
    >
      <Image
        style={styles.image}
        source={{ height: 144, width: 256, uri: urlFor(imgUrl).url() }}
      />
      <View style={styles.div}>
        <Text style={styles.text}>{title}</Text>
        <View style={styles.div1}>
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text style={styles.text1}>
            <Text style={styles.text2}>{rating}</Text>. {genre}
          </Text>
        </View>

        <View style={styles.div1}>
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text style={styles.text1}>Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 8,
  },
  div: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  div1: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    fontSize: 12,
    color: "#6B7280",
  },
  text2: {
    color: "#22C55E",
  },
  touchOpacity: {
    backgroundColor: "white",
    marginRight: 12,
    elevation: 5,
  },
});

export default RestaurantCard;
