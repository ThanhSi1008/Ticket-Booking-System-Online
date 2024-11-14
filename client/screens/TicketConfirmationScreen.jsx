import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const foodItems = [
  { id: "1", name: "Popcorn Large", price: 59, quantity: 2, image: "" },
  { id: "2", name: "Popcorn Large", price: 59, quantity: 2, image: "" },
];

const TicketConfirmationScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const movie = {
    title: "Venom: The Last Dance",
    time: "19:15 - 21:04, Wed, 13/11/2024",
    room: "Screen 4",
    seat: "J06",
    theater: "Cosmos 1",
    address: "6925 Hollywood Blvd, Hollywood, CA 90028",
    price: 59,
    image: "require('./assets/venom.png')",
  };

  const foodTotalPrice = foodItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal = movie.price + foodTotalPrice;

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItemContainer}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodQuantity}>2 x ${item.price}</Text>
      </View>
      <Text style={styles.foodTotal}>${item.price * item.quantity}</Text>
    </View>
  );

  const handleCheckout = () => {
    setModalVisible(true);
  };

  const handleConfirmPayment = () => {
    setModalVisible(false);
    navigation.navigate("Invoice", { movie, foodItems, grandTotal });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("Product")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirmation</Text>
        </View>

        {/* Ticket Booking Info */}
        <View>
          <Text style={styles.subTitle}>Ticket Booking Info</Text>
        </View>
        <View style={styles.ticketInfoContainer}>
          <Image source={movie.image} style={styles.movieImage} />
          <View style={styles.ticketDetails}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text>Time: {movie.time}</Text>
            <Text>Room: {movie.room}</Text>
            <Text>Seat(s): {movie.seat}</Text>
            <Text>
              Theater: <Text style={styles.boldText}>{movie.theater}</Text>
            </Text>
            <Text>Address: {movie.address}</Text>
            <Text style={styles.ticketPrice}>Total: ${movie.price}</Text>
          </View>
        </View>

        {/* Food and Drinks Info */}
        <Text style={styles.subTitle}>Food and Drinks Info</Text>
        <View style={styles.foodContainer}>
          <FlatList
            data={foodItems}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.foodTotalLabel}>Total: ${foodTotalPrice}</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${grandTotal}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to proceed with the payment?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleConfirmPayment}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  subTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 16,
  },
  ticketInfoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  ticketDetails: {
    flex: 1,
    marginLeft: 16,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  foodContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8f8f8",
  },
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8e8e8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  foodDetails: {
    flex: 1,
    marginLeft: 16,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodQuantity: {
    fontSize: 14,
    color: "#555",
  },
  foodTotal: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodTotalLabel: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 4,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
  checkoutButton: {
    alignItems: "center",
    backgroundColor: "brown",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#FF6347", // Red-ish color for Cancel and Confirm
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default TicketConfirmationScreen;
