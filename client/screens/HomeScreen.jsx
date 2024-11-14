import React, { useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { MoviesContext } from "../contexts/MoviesContext";

const HomeScreen = ({ navigation }) => {
  const { featuredMovies, theaterMovies, loading, error } =
    useContext(MoviesContext);

  const renderMovieCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieInfo", { movie: item })}
    >
      <MovieCard movie={item} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Movies Section */}
        <Text style={styles.sectionTitle}>Featured Movies</Text>
        <FlatList
          data={featuredMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />

        {/* Theater Movies Section */}
        <Text style={styles.sectionTitle}>
          Top Movies Currently in Theaters
        </Text>
        <FlatList
          data={theaterMovies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 16,
    color: "#333",
  },
  flatList: {
    paddingLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default HomeScreen;
