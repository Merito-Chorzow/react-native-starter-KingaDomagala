import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNotes } from '../context/NotesContext';

export default function NotesListScreen({ navigation }) {
  const { notes, loading } = useNotes();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate('NoteDetails', { noteId: item.id })}
      accessibilityLabel={`Notatka: ${item.title}`}
      accessibilityHint="Kliknij aby zobaczyć szczegóły"
    >
      <View style={styles.noteContent}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumb}>
            <Text style={styles.placeholderIcon}>📝</Text>
          </View>
        )}
        <View style={styles.noteText}>
          <Text style={styles.noteTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.noteDate}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.notePreview} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Ładowanie notatek...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>Brak notatek</Text>
            <Text style={styles.emptySubtext}>Dodaj pierwszą notatkę!</Text>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditNote')}
        accessibilityLabel="Dodaj nową notatkę"
        accessibilityRole="button"
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  noteCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  noteContent: {
    flexDirection: 'row',
    padding: 16,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  placeholderThumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#0f3460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 24,
  },
  noteText: {
    flex: 1,
    marginLeft: 14,
  },
  noteTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#eaf6f6',
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 12,
    color: '#e94560',
    marginBottom: 6,
  },
  notePreview: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  loadingText: {
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 14,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#eaf6f6',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabIcon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '300',
    marginTop: -2,
  },
});

