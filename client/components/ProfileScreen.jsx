import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Để lấy token từ AsyncStorage

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hàm lấy thông tin người dùng
  const getUserProfile = async () => {
    try {
      // Lấy token từ AsyncStorage
      const token = await AsyncStorage.getItem("userToken"); // Sửa lại 'userToken' nếu bạn đã lưu với tên khác
      if (!token) {
        throw new Error("No token found");
      }

      console.log("Token:", token); // Log token để kiểm tra
      console.log("API URL:", "http://192.168.1.10:3000/user/me"); // Log URL API

      // Gửi yêu cầu đến API để lấy thông tin người dùng
      const response = await axios.get("http://192.168.1.10:3000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Cập nhật thông tin người dùng
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to load user data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // Hiển thị khi đang tải
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Hiển thị thông báo lỗi
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Hiển thị thông tin người dùng
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Screen</Text>
      <Text>Full Name: {userData?.full_name}</Text>
      <Text>Email: {userData?.email}</Text>
      <Text>Phone: {userData?.phone_number}</Text>
      <Text>Date of Birth: {new Date(userData?.dob).toLocaleDateString()}</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ProfileScreen;
