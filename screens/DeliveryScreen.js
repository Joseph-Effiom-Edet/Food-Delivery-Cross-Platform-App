import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View style={styles.deliveryScreenContainer}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.saContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text style={styles.orderHelp}>Order help</Text>
        </View>

        <View style={styles.secondContainer}>
          <View style={styles.secondWrapper}>
            <View>
              <Text style={styles.estimatedArrival}>Estimated Arrival</Text>
              <Text style={styles.minutes}>45-55 Minutes</Text>
            </View>
            <Image
              source={{ uri: "https://links.papareact.com/fls" }}
              style={styles.image}
            />
          </View>
          <Progress.Bar size={60} indeterminate={true} color="#00CCBB" />
          <Text style={styles.restaurant}>
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier=""
          pinColor="#00CCBB"
        />
      </MapView>

      <SafeAreaView style={styles.bottomSaView}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/6831602/pexels-photo-6831602.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
          style={styles.bottomImage}
        />

        <View style={styles.driverContainer}>
          <Text style={styles.driverName}>Joseph Edet</Text>
          <Text style={styles.driver}>Your Rider</Text>
        </View>

        <Text style={styles.call}>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  deliveryScreenContainer: {
    backgroundColor: "#00CCBB",
    flex: 1,
  },
  safeAreaView: {
    zIndex: 50,
  },
  saContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  orderHelp: {
    fontWeight: "300",
    color: "#FFFF",
    fontSize: 18,
    lineHeight: 28,
  },
  secondContainer: {
    backgroundColor: "#FFFF",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 6,
    padding: 24,
    zIndex: 50,
    elevation: 5,
  },
  secondWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  estimatedArrival: {
    fontSize: 18,
    lineHeight: 28,
    color: "#9CA3AF",
  },
  minutes: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700",
  },
  image: {
    height: 80,
    width: 80,
  },
  restaurant: {
    marginTop: 12,
    color: "#6B7280",
  },
  map: {
    flex: 1,
    zIndex: 0,
  },
  bottomSaView: {
    backgroundColor: "#FFFF",
    flexDirection: "row",
    alignItems: "center",
    height: 100,
  },
  bottomImage: {
    height: 48,
    width: 48,
    backgroundColor: "#D1D5DB",
    padding: 16,
    marginLeft: 20,
    borderRadius: 9999,
  },
  driverContainer: {
    flex: 1,
    marginLeft: 20,
  },
  driverName: {
    fontSize: 18,
    lineHeight: 28,
  },
  driver: {
    color: "#9CA3AF",
  },
  call: {
    color: "#00CCBB",
    fontSize: 18,
    lineHeight: 28,
    marginRight: 20,
    fontWeight: "700",
  },
});
