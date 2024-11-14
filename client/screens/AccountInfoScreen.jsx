import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AccountInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Account Information</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>John Doe</Text>
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>johndoe@example.com</Text>
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>+1 123 456 7890</Text>
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Address</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>123 Hollywood Blvd, CA</Text>
          <TouchableOpacity>
            <Icon name="pencil-outline" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AccountInfoScreen;
