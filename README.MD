# React aplikacija za prikaz proizvoda sa podrškom za više tema

## Opis projekta

Ovaj projekat predstavlja **React + TypeScript** aplikaciju koja omogućava prikaz proizvoda, rad sa korpom, promjenu teme, promjenu jezika i sinhronizaciju korisničkih podataka.  
Aplikacija koristi **Fake Store API** za prikaz proizvoda i **Firebase** za autentifikaciju i skladištenje podataka.

Aplikacija se pokreće pomoću **Docker Compose-a**.

---

## Cilj aplikacije

Implementirati sledeće funkcionalnosti:

- Prijavljivanje i registracija korisnika (Firebase Auth)
- Lista proizvoda sa mogućnošću dodavanja, ažuriranja i brisanja proizvoda u korpi
- Pregled detalja proizvoda
- Filtriranje proizvoda
- Korpa sa ukupnom cijenom i brojem proizvoda
- Podrška za više tema
- Podrška za više jezika
- Sinhronizacija podataka sa Firestore-om i lokalnom memorijom

---

## Korišćene tehnologije

- React
- TypeScript
- Redux
- Redux Toolkit
- React Router
- Docker
- Docker Compose
- Fake Store API
- Firebase

---

## Preduslovi

Prije pokretanja projekta potrebno je instalirati:

- Git
- Docker Desktop

> Node.js nije potreban ukoliko se aplikacija pokreće putem Docker-a.

---

## Environment varijable

Aplikacija koristi Firebase konfiguraciju definisanu kroz environment varijable.

Prije pokretanja projekta potrebno je:

1. Kopirati `.env.example` fajl u `.env`
2. Popuniti vrijednosti odgovarajućim Firebase podacima

Docker Compose automatski učitava `.env` fajl iz root direktorijuma projekta.

Primjer sadržaja `.env.example` fajla:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## Pokretanje projekta

- Prije pokretanja provjeriti da je port **5173** slobodan
- Napomena da `.env` mora biti kopiran prije pokretanja docker compose komande

```bash
https://github.com/DordeBunic/store-app.git
cd game-hub
docker compose up --build
```

- Aplikacija će biti dostupna na:
  **http://localhost:5173/**

---

### Lokalno (bez Docker-a)

- Ako želite pokrenuti aplikaciju lokalno, potrebno je imati **Node.js 24** i **npm** instalirane.
- Napomena da `.env` mora biti kopiran prije pokretanja nmp run komande

```bash
https://github.com/DordeBunic/store-app.git
cd game-hub
npm install
npm run dev
```

---

## Zaustavljanje docker compose

```bash
docker compose down
```
