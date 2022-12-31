import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  return (
    <SafeAreaView style={{ paddingTop: 20, backgroundColor: "#FFFFFF" }}>
      {/* Header */}
      <View style={styles.headerContainerStyle}>
        <Image
          style={styles.imageStyle}
          source={{
            width: 28,
            height: 28,
            uri: "https://images.pexels.com/photos/6831602/pexels-photo-6831602.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextContainerText1}>Deliver Now!</Text>
          <Text style={styles.headerTextContainerText2}>
            Current Location
            <ChevronDownIcon size={18} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View style={styles.headerSearch}>
        <View style={styles.headerSearchBar}>
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            style={{ marginLeft: 8 }}
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* Body */}
      <ScrollView
        style={{ backgroundColor: "#F3F4F6" }}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured Roles */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    backgroundColor: "#D1D5DB",
    padding: 16,
    borderRadius: 9999,
  },
  headerContainerStyle: {
    flexDirection: "row",
    paddingBottom: 12,
    alignItems: "center",
    marginLeft: 16,
    marginRight: 16,
  },
  headerTextContainer: {
    marginLeft: 8,
    flex: 1,
  },
  headerTextContainerText1: {
    fontWeight: "bold",
    color: "#9CA3AF",
    fontSize: 12,
  },
  headerTextContainerText2: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerSearch: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 18,
    marginLeft: 16,
    marginRight: 16,
  },
  headerSearchBar: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#E5E7EB",
    flex: 1,
    marginRight: 8,
  },
});

export default HomeScreen;
