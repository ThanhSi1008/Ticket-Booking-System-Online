// MovieDetailsScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";

const MovieDetailsScreen = ({ route }) => {
  const { movieId } = route.params; // Lấy ID phim từ params
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false); // Trạng thái để hiển thị trailer

  // Lấy thông tin chi tiết phim
  useEffect(() => {
    axios
      .get(`http://192.168.1.10:3000/api/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data.movie);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [movieId]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.movie_poster }} style={styles.moviePoster} />
      <Text style={styles.movieTitle}>{movie.movie_name}</Text>
      <Text style={styles.movieDescription}>{movie.description}</Text>
      <Text style={styles.movieDetails}>Genre: {movie.genre}</Text>
      <Text style={styles.movieDetails}>Language: {movie.language}</Text>
      <Text style={styles.movieDetails}>Duration: {movie.duration} min</Text>
      <Text style={styles.movieDetails}>
        Release Date: {new Date(movie.release_date).toLocaleDateString()}
      </Text>

      {/* Nút để mở trailer */}
      <TouchableOpacity
        style={styles.trailerButton}
        onPress={() => setShowTrailer(true)}
      >
        <Text style={styles.trailerButtonText}>Watch Trailer</Text>
      </TouchableOpacity>

      {/* Modal hiển thị trailer */}
      <Modal
        visible={showTrailer}
        animationType="slide"
        onRequestClose={() => setShowTrailer(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowTrailer(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView
            source={{
              uri: `https://www.youtube.com/embed/${
                movie.trailer_link.split("v=")[1]
              }`,
            }}
            style={styles.webview}
            allowsFullscreenVideo
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  moviePoster: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  movieDetails: {
    fontSize: 14,
    marginVertical: 5,
  },
  trailerButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  trailerButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});

export default MovieDetailsScreen;
