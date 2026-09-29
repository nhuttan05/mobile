import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, layout = 'row', onSelect }) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.7}
    >
      <View style={isTile ? styles.posterWrapperTile : styles.posterWrapperRow}>
        <Image
          source={{ uri: movie.poster }}
          style={isTile ? styles.posterTile : styles.posterRow}
          resizeMode="cover"
        />
        {isTile && (
          <Text style={styles.ratingBadgeTile}>
            ⭐ {Number(movie.rating).toFixed(1)}
          </Text>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        {!isTile && (
          <Text style={styles.ratingRow}>⭐ {Number(movie.rating).toFixed(1)}</Text>
        )}

        {!isTile && (
          <Text style={styles.subText}>
            {movie.genre} • {movie.year}
          </Text>
        )}

        <Text style={styles.status}>{movie.isShowing ? '✅' : '❌'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    padding: 0,
    overflow: 'hidden',
  },
  posterWrapperRow: { marginRight: 10 },
  posterWrapperTile: { position: 'relative', width: '100%' },
  posterRow: { width: 70, height: 100, borderRadius: 4 },
  posterTile: { width: '100%', aspectRatio: 2 / 3 },
  ratingBadgeTile: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  info: { flex: 1, justifyContent: 'center' },
  infoTile: { padding: 8 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  ratingRow: { fontSize: 14, color: '#f39c12', fontWeight: '600', marginBottom: 4 },
  subText: { fontSize: 13, color: '#666', marginBottom: 4 },
  status: { fontSize: 14 },
});

export default React.memo(MovieCard);