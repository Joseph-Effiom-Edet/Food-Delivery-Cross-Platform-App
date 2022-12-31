import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Animatable.Image
        source={require("../assets/orderLoading.gif")}
        animation="slideInUp"
        iterationCount={1}
        style={styles.animationImage}
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        style={styles.animationText}
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#00CCBB",
    justifyContent: "center",
    alignItems: "center",
  },
  animationImage: {
    height: 384,
    width: 384,
  },
  animationText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    color: "#FFFF",
    fontWeight: "700",
    marginVertical: 50,
  },
});
