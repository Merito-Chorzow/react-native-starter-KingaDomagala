import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNotes } from '../context/NotesContext';

export default function NoteDetailsScreen({ route, navigation }) {
  const { noteId } = route.params;
  const { notes, deleteNote } = useNotes();
  
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Notatka nie została znaleziona</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Usuń notatkę',
      'Czy na pewno chcesz usunąć tę notatkę?',
      [
        { text: 'Anuluj', style: 'cancel' },
        { 
          text: 'Usuń', 
          style: 'destructive',
          onPress: () => {
            deleteNote(note.id);
            navigation.goBack();
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {note.imageUri ? (
          <Image source={{ uri: note.imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderIcon}>📷</Text>
            <Text style={styles.placeholderText}>Brak zdjęcia</Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.descriptionLabel}>Opis</Text>
          <Text style={styles.description}>{note.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('AddEditNote', { note })}
          accessibilityLabel="Edytuj notatkę"
          accessibilityRole="button"
        >
          <Text style={styles.editButtonText}>✏️ Edytuj</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          accessibilityLabel="Usuń notatkę"
          accessibilityRole="button"
        >
          <Text style={styles.deleteButtonText}>🗑️ Usuń</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e94560',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#eaf6f6',
    marginBottom: 8,
  },
  date: {
    fontSize: 13,
    color: '#e94560',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#0f3460',
    marginVertical: 16,
  },
  descriptionLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#eaf6f6',
    lineHeight: 26,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 30,
    gap: 12,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0f3460',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#eaf6f6',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'rgba(233, 69, 96, 0.15)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e94560',
    minHeight: 48,
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#e94560',
    fontSize: 15,
    fontWeight: '600',
  },
});

