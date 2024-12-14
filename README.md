# Manga Tracker

Een React Native applicatie voor het bijhouden van je manga collectie, leesvoortgang en favoriete leeslocaties. Gebouwd met Expo en TypeScript.

## Features

### Collectie Beheer

- Bijhouden van manga volumes per serie
- Zoeken en filteren binnen je collectie
- Track leesvoortgang per volume
- Statistieken overzicht van je collectie

### MyAnimeList Integratie

- Zoeken in de MAL database
- Eenvoudig nieuwe manga's toevoegen
- Ondersteuning voor zowel lopende als afgeronde series
- Bulk toevoegen van volumes

### Lees Tracking

- Dagelijkse leesherinneringen
- Leessessies toevoegen aan je agenda
- Voortgangsstatistieken
- Ongelezen volumes snel identificeren

### Leeslocaties

- Sla je favoriete leesplekken op met GPS coördinaten
- Kaartweergave van alle locaties
- Beschrijvingen en datums per locatie
- Volledig CRUD functionaliteit

## Technische Details

### Gebouwd met

- React Native & Expo
- TypeScript

- AsyncStorage voor lokale opslag
- React Context voor state management
- Expo Haptics voor feedback
- Expo Router voor navigatie
- Expo Location & Maps
- Expo Notifications
- Expo Calendar

### Project Structuur

```plaintext
manga-tracker/
├── app/              # Expo Router pages
│   ├── (tabs)/       # Tab-based navigatie schermen
│   └── (modals)/     # Modale schermen
├── src/              # Source code
│   ├── components/   # React componenten
│   │   ├── ui/       # Herbruikbare UI componenten
│   │   └── features/ # Feature-specifieke componenten
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API en device services
│   ├── config/       # App configuratie en constanten
│   ├── types/        # TypeScript type definities
│   ├── utils/        # Helper functies
│   └── styles/       # Styling definities
└── db.json           # Database
```

### State Management

- Centraal beheer via MangaContext
- Lokale persistentie met AsyncStorage
- Optimistische updates voor betere UX

### Data Flow

1. UI Interactie triggert context actie
2. Context update lokale state
3. Service laag communiceert met API/storage
4. Feedback naar gebruiker via haptics/alerts

## Getting Started

### Vereisten

- Node.js
- npm
- Expo CLI
- iOS Simulator of Android Emulator

### Installatie

```bash
# Clone het project
git clone [repository-url]

# Installeer dependencies
npm install

# Start de development server
npx expo start
```

### Configuratie

1. Maak een `.env` file op basis van `.env.example`
2. Voeg je MAL API credentials toe
3. Configureer lokale development URLs

### Database Setup

Deze app gebruikt JSON Server als mock database voor development. Setup:

1. Installeer JSON Server globaal:

```bash
npm install -g json-server
```

2. Maak een `db.json` file aan in de root:

```json
{
  "mangas": []
}
```

3. Start JSON Server (aparte terminal):

```bash
json-server --watch db.json --port 3000
```

De server draait nu op `http://localhost:3000` met deze endpoints:

- GET /mangas - Haal alle manga's op
- GET /mangas/:id - Haal specifieke manga op
- POST /mangas - Voeg nieuwe manga toe
- PUT /mangas/:id - Update manga
- DELETE /mangas/:id - Verwijder manga

### Environment Setup

Maak een `.env` file met:

```plaintext
MAL_CLIENT_ID=your_mal_client_id
```

### API Setup

De app communiceert met:

- JSON Server voor lokale data opslag
- MyAnimeList API voor manga informatie

Development URLs:

- Android Emulator: <http://10.0.2.2:3000>
- iOS Simulator: <http://localhost:3000>
- Fysiek Device: http://{LOCAL_IP}:3000

## Development

### Code Stijl

- TypeScript strict mode
- ESLint configuratie
- Prettier voor formatting

### Best Practices

- Component compositie voor herbruikbaarheid
- Custom hooks voor gedeelde logica
- Consistent error handling
- TypeScript types voor type safety

## Roadmap

Toekomstige features en verbeteringen:

- [ ] Offline modus ondersteuning
- [ ] Batch acties voor volumes
- [ ] Import/Export functionaliteit
- [ ] Uitgebreide statistieken
- [ ] Dark mode support

## Licentie

MIT
