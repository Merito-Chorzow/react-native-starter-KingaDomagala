import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { NotesProvider } from './src/context/NotesContext';
import NotesListScreen from './src/screens/NotesListScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';
import AddEditNoteScreen from './src/screens/AddEditNoteScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#1a1a2e' },
            headerTintColor: '#eaf6f6',
            headerTitleStyle: { fontWeight: '600' },
            contentStyle: { backgroundColor: '#16213e' },
          }}
        >
          <Stack.Screen 
            name="NotesList" 
            component={NotesListScreen} 
            options={{ title: 'Field Notes' }}
          />
          <Stack.Screen 
            name="NoteDetails" 
            component={NoteDetailsScreen} 
            options={{ title: 'Szczegóły' }}
          />
          <Stack.Screen 
            name="AddEditNote" 
            component={AddEditNoteScreen} 
            options={({ route }) => ({ 
              title: route.params?.note ? 'Edytuj notatkę' : 'Nowa notatka' 
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}

