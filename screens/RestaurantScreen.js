import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View style={{ postition: "relative" }}>
          <Image
            source={{ uri: urlFor(imgUrl).url(), width: "100%", height: 224 }}
            style={styles.imageStyle}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={navigation.goBack}
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>{title}</Text>
            <View style={{ flexDirection: "row", marginVertical: 4 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text style={{ fontSize: 12, color: "#6B7280", marginLeft: 4 }}>
                  <Text style={{ color: "#22C55E" }}>{rating}</Text> . {genre}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 8,
                }}
              >
                <MapPinIcon color="gray" opacity={0.4} size={22} />
                <Text style={{ fontSize: 12, color: "#6B7280", marginLeft: 4 }}>
                  Nearby . {address}
                </Text>
              </View>
            </View>

            <Text style={{ color: "#6B7280", marginTop: 8, paddingBottom: 16 }}>
              {short_description}
            </Text>
          </View>

          <TouchableOpacity style={styles.allergyTouchable}>
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text style={styles.allergyText}>Have a food allergy?</Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: 96 }}>
          <Text style={styles.menuText}>Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    backgroundColor: "#D1D5DB",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 56,
    left: 20,
    padding: 2,
    backgroundColor: "#F3F4F6",
    borderRadius: 9999,
  },
  allergyTouchable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#6B7280",
  },
  allergyText: {
    paddingLeft: 8,
    fontWeight: "bold",
    flex: 1,
    fontSize: 18,
  },
  menuText: {
    paddingHorizontal: 16,
    paddingTop: 24,
    marginBottom: 12,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default RestaurantScreen;
