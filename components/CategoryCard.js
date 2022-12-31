import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity style={styles.touchableOpacity}>
      <Image style={styles.imageStyle} source={{ uri: imgUrl }} />
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    borderRadius: 4,
    height: 80,
    width: 80,
  },
  touchableOpacity: {
    marginRight: 8,
    position: "relative",
  },
  cardText: {
    position: "absolute",
    bottom: 4,
    left: 4,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default CategoryCard;
