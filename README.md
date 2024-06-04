# Aplikacja do Zarządzania Domem Dziecka

<p align="center">
  <img src="./frontend/src/assets/GuardianVaultLogo.png" alt="Logo aplikacji" width="200"/>
</p>

## Opis Projektu

Aplikacja do Zarządzania Domem Dziecka została stworzona w celu ułatwienia opiekunom zastępczym fundacji ROZ zarządzania dokumentacją dzieci, którymi się opiekują. Dzięki tej aplikacji opiekunowie mogą łatwo dodawać, przeglądać, edytować i usuwać informacje o dzieciach oraz ich dokumentację.

## Technologie

Projekt został stworzony przy użyciu następujących technologii:

- Frontend:
  - React.js
  - CSS (z wykorzystaniem JSS)
- Backend:
  - Django
  - Django REST Framework
  - PostgreSQL
- Docker

## Konfiguracja

Aby uruchomić ten projekt lokalnie, należy skonfigurować plik `.env`. Plik `.env.example` w głównym katalogu projektu zawiera przykładową strukturę tego pliku.

1. Skopiuj plik `.env.example` i zmień nazwę na `.env`.
2. Wypełnij plik `.env` lokalnymi danymi. Opis poszczególnych kluczy:

- `DEBUG`: `True` dla trybu deweloperskiego. `False` dla trybu produkcyjnego.
- `SECRET_KEY`: Sekretny klucz dla aplikacji Django.
- `DJANGO_ALLOWED_HOSTS`: Lista hostów, na których może działać aplikacja Django.
- `DATABASE_NAME`: Nazwa lokalnej bazy danych.
- `DATABASE_USER`: Nazwa użytkownika lokalnej bazy danych.
- `DATABASE_PASSWORD`: Hasło do lokalnej bazy danych.
- `DATABASE_HOST`: Host lokalnej bazy danych.
- `DATABASE_PORT`: Port lokalnej bazy danych.
- `PGADMIN_DEFAULT_EMAIL`: Domyślny email PgAdmin.
- `PGADMIN_DEFAULT_PASSWORD`: Domyślne hasło PgAdmin.
- `PGADMIN_PORT`: Port dla PgAdmin.
- `BACKEND_PORT`: Port dla backendu aplikacji.
- `FRONTEND_PORT`: Port dla frontendu aplikacji.

**Przykład**:

- `DEBUG`: `True` for development mode. `False` for production mode.
- `SECRET_KEY`: `mysecretkey123`
- `DJANGO_ALLOWED_HOSTS`: `localhost, example.com`
- `DATABASE_NAME`: `mydatabase`
- `DATABASE_USER`: `myusername`
- `DATABASE_PASSWORD`: `mypassword`
- `DATABASE_HOST`: `localhost`
- `DATABASE_PORT`: `5432`
- `PGADMIN_DEFAULT_EMAIL`: `admin@example.com`
- `PGADMIN_DEFAULT_PASSWORD`: `adminpassword`
- `PGADMIN_PORT`: `5050:80`
- `BACKEND_PORT`: `8000`
- `FRONTEND_PORT`: `3000`

Po wypełnieniu pliku `.env` można uruchomić projekt zgodnie z instrukcjami w sekcji "Uruchomienie projektu".

## Uruchomienie projektu

Korzystając z Dockera, uruchom polecenie `docker-compose up --build`.

**Uwagi dotyczące uruchomienia projektu bez dockera**

1. Sklonuj repozytorium na swoje lokalne urządzenie używając polecenia `git clone <https://github.com/ProjektROZgrupa2/roz>`.
2. W katalogu frontend zainstaluj wszystkie wymagane pakiety za pomocą polecenia `npm install`.
3. Uruchom serwer React za pomocą polecenia `npm start`.
4. W katalogu backend zainstaluj wymagane pakiety za pomocą polecenia `pip install -r requirements.txt`.
5. Uruchom migracje bazy danych za pomocą polecenia `python manage.py makemigrations` i `python manage.py migrate`.
6. Uruchom serwer deweloperski za pomocą polecenia `python manage.py runserver`.

## Status

Projekt jest w trakcie realizacji
