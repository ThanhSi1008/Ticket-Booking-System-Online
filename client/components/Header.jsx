import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search by movie names"
          style={styles.searchInput}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Icon name="person-circle" size={28} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
  },
});

export default Header;
