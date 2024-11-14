import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";

const MovieInfoScreen = ({ navigation }) => {
  const cast = [
    {
      name: "Tom Hardy",
      role: "Eddie Brock",
      image: "https://example.com/tom_hardy.jpg",
    },
    {
      name: "Juno Temple",
      role: "Dr. Teddy Payne",
      image: "https://example.com/juno_temple.jpg",
    },
    {
      name: "Rhys Ifans",
      role: "Martin Moon",
      image: "https://example.com/rhys_ifans.jpg",
    },
    {
      name: "Peggy Lu",
      role: "Mrs. Chen",
      image: "https://example.com/peggy_lu.jpg",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 10,
      comment:
        "This movie was absolutely incredible! The story was gripping, and the visuals were stunning. I couldn't take my eyes off the screen!",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 9,
      comment: "A thrilling movie with a powerful story and amazing visuals!",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Movie Info</Text>
      </View>

      {/* Movie Info */}
      <View style={styles.movieInfo}>
        <Image
          style={styles.poster}
          source={{ uri: "https://example.com/venom_poster.jpg" }}
        />
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>Venom: The Last Dance</Text>
          <Text style={styles.genre}>Action/Sci-fi</Text>
          <Text style={styles.detail}>Released Date: 25/10/2024</Text>
          <Text style={styles.detail}>Duration: 109 minutes</Text>
          <Text style={styles.detail}>Language: English</Text>
          <Text style={styles.rating}>⭐ 8.8/10 (1.9k Ratings)</Text>
          <TouchableOpacity style={styles.trailerButton}>
            <Text style={styles.trailerButtonText}>▶ Trailer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>
          Eddie and Venom, on the run, face pursuit from both worlds. As
          circumstances tighten, they're compelled to make a heart-wrenching
          choice that could mark the end of their symbiotic partnership.
        </Text>
      </View>

      {/* Casts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Casts</Text>
        <FlatList
          horizontal
          data={cast}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.castItem}>
              <Image style={styles.castImage} source={{ uri: item.image }} />
              <Text style={styles.castName}>{item.name}</Text>
              <Text style={styles.castRole}>{item.role}</Text>
            </View>
          )}
        />
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Review</Text>
          <Text style={styles.writeReview}>Write a review</Text>
        </View>
        <Text style={styles.rating}>⭐ 8.8/10 (1.9k Ratings)</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewUser}>{item.user}</Text>
              <Text style={styles.reviewRating}>
                ⭐ {item.rating}/10 - Masterpiece
              </Text>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
        />
      </View>

      {/* Get Tickets Button */}
      <TouchableOpacity
        style={styles.getTicketsButton}
        onPress={() => navigation.navigate("ShowTimes")}
      >
        <Text style={styles.getTicketsText}>Get Tickets</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  movieInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  movieDetails: {
    marginLeft: 16,
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  genre: {
    fontSize: 14,
    color: "#666",
  },
  detail: {
    fontSize: 14,
    color: "#333",
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
  trailerButton: {
    backgroundColor: "#b71c1c",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  trailerButtonText: {
    color: "#fff",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  overviewText: {
    fontSize: 14,
    color: "#333",
  },
  castItem: {
    alignItems: "center",
    marginRight: 16,
  },
  castImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  castName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  castRole: {
    fontSize: 12,
    color: "#666",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  writeReview: {
    color: "#b71c1c",
    fontWeight: "bold",
  },
  reviewItem: {
    backgroundColor: "#f1f1f1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: "bold",
    fontSize: 14,
  },
  reviewRating: {
    fontSize: 14,
    marginVertical: 4,
  },
  reviewComment: {
    fontSize: 14,
  },
  getTicketsButton: {
    backgroundColor: "#b71c1c",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
  },
  getTicketsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MovieInfoScreen;
