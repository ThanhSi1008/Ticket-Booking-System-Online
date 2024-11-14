import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SeatSelectionScreen from "./SeatSelectionScreen";

const dates = [
  { day: "13/11", label: "WED" },
  { day: "14/11", label: "THU" },
  { day: "15/11", label: "FRI" },
  { day: "16/11", label: "SAT" },
  { day: "17/11", label: "SUN" },
  { day: "18/11", label: "MON" },
];

const showtimes = [
  {
    cinema: "Cosmos 1",
    address: "6925 Hollywood Blvd, Hollywood, CA 90028",
    times: ["17:00 ~ 18:49", "19:15 ~ 21:04"],
  },
  {
    cinema: "Cosmos 2",
    address: "6925 Hollywood Blvd, Hollywood, CA 90028",
    times: ["17:00 ~ 18:49", "19:15 ~ 21:04"],
  },
  {
    cinema: "Cosmos 3",
    address: "6925 Hollywood Blvd, Hollywood, CA 90028",
    times: ["17:00 ~ 18:49", "19:15 ~ 21:04"],
  },
  {
    cinema: "Cosmos 4",
    address: "6925 Hollywood Blvd, Hollywood, CA 90028",
    times: ["17:00 ~ 18:49", "19:15 ~ 21:04"],
  },
];

const ShowTimesScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("13/11");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Venom: The Last Dance</Text>
      </View>

      {/* Date Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateSelector}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date.day}
            style={[
              styles.dateItem,
              selectedDate === date.day && styles.selectedDateItem,
            ]}
            onPress={() => setSelectedDate(date.day)}
          >
            <Text
              style={[
                styles.dateText,
                selectedDate === date.day && styles.selectedDateText,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.dateLabel,
                selectedDate === date.day && styles.selectedDateText,
              ]}
            >
              {date.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Showtimes */}
      <FlatList
        data={showtimes}
        keyExtractor={(item) => item.cinema}
        renderItem={({ item }) => (
          <View style={styles.cinemaCard}>
            <Text style={styles.cinemaName}>{item.cinema}</Text>
            <Text style={styles.cinemaAddress}>{item.address}</Text>
            <View style={styles.showtimeContainer}>
              {item.times.map((time, index) => (
                <View key={index} style={styles.showtime}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SeatSelection")}
                  >
                    <Text style={styles.showtimeText}>{time}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  dateSelector: {
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  dateItem: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: "#e0e0e0",
  },
  selectedDateItem: {
    backgroundColor: "#b71c1c",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
  },
  dateLabel: {
    fontSize: 12,
    color: "#333",
  },
  cinemaCard: {
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  cinemaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cinemaAddress: {
    fontSize: 14,
    color: "#888",
    marginVertical: 4,
  },
  showtimeContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  showtime: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  showtimeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ShowTimesScreen;
