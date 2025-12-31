# Field Notes 📝

Aplikacja mobilna React Native (Expo) do tworzenia notatek ze zdjęciami.

## Funkcje

### Natywna funkcja: Aparat / Galeria
- Robienie zdjęć aparatem urządzenia
- Wybieranie zdjęć z galerii
- Wykorzystuje `expo-image-picker`

### Integracja z API
- Pobieranie notatek z JSONPlaceholder API (`GET /posts`)
- Zapisywanie nowych notatek (`POST /posts`)
- Fallback na mock data przy braku internetu

### Widoki (3)
1. **Lista notatek** - wyświetla wszystkie notatki z tytułem, datą i miniaturką
2. **Szczegóły notatki** - pełny widok z opisem, zdjęciem i akcjami (edycja/usuń)
3. **Dodaj/Edytuj** - formularz z możliwością dodania zdjęcia

## Wymagania

- Node.js 18+
- Expo CLI
- iOS Simulator / Android Emulator / Expo Go na urządzeniu

## Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom aplikację
npx expo start
```

## Testowanie

### Na urządzeniu fizycznym (zalecane dla aparatu)
1. Zainstaluj aplikację **Expo Go** ze sklepu
2. Zeskanuj kod QR z terminala

### Na emulatorze
- iOS: Naciśnij `i` w terminalu
- Android: Naciśnij `a` w terminalu

### Scenariusze testowe

1. **Dodanie notatki z apratem**
   - Kliknij przycisk `+` 
   - Wybierz "Aparat" i zrób zdjęcie
   - Wpisz tytuł i opis
   - Zapisz

2. **Dodanie notatki z galerii**
   - Kliknij przycisk `+`
   - Wybierz "Galeria" i wybierz zdjęcie
   - Wpisz tytuł i opis
   - Zapisz

3. **Przeglądanie i edycja**
   - Kliknij na notatkę z listy
   - Zobacz szczegóły
   - Kliknij "Edytuj" aby zmienić
   - Kliknij "Usuń" aby usunąć

4. **Komunikacja z API**
   - Przy starcie aplikacji pobierane są notatki z API
   - Przy dodawaniu notatki dane są wysyłane do API (POST)
   - W konsoli widoczne są logi z API

## Technologie

- React Native + Expo SDK 52
- React Navigation (native-stack)
- expo-image-picker (natywny dostęp do aparatu/galerii)
- JSONPlaceholder API

## Struktura projektu

```
├── App.js                 # Główny plik z nawigacją
├── src/
│   ├── api/
│   │   └── notesApi.js    # Komunikacja z API
│   ├── context/
│   │   └── NotesContext.js # Stan aplikacji
│   └── screens/
│       ├── NotesListScreen.js    # Lista notatek
│       ├── NoteDetailsScreen.js  # Szczegóły notatki
│       └── AddEditNoteScreen.js  # Dodawanie/edycja
├── app.json               # Konfiguracja Expo
└── package.json
```

## Dostępność (a11y)

- `accessibilityLabel` na przyciskach i elementach interaktywnych
- `accessibilityRole` dla semantyki
- Minimalne rozmiary celów dotyku: 48px

