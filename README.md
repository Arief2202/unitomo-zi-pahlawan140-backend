# Backend ZI Pahlawan140

backend yang digunakan oleh web zi pahlawan140 BPS Kabupaten Sidoarjo.

## Tentang Sistem

- **Express JS** : Framework untuk membangun API.
- **Advanced Encryption Standard (AES)**: Digunakan untuk autentikasi dan pengiriman informasi dengan aman.
- **MySQL**: Database yang digunakan API.

## Cara Penggunaan?

**Clone / download repository**

```shell
# Clone Repository
$ git clone https://github.com/Arief2202/unitomo-zi-pahlawan140-backend.git
```

**Masuk ke folder proyek dan install dependensi**

```shell
# install dependency
$ npm install
```

**Setting koneksi database di /config/config.json lalu lakukan create database dan migrate**

```shell
# hapus database apabila sudah tersedia (abaikan jika pertama kali membuat database)
$ npx sequelize-cli db:drop
# create new database sesuai config
$ npx sequelize-cli db:create
# migrate database untuk create table
$ npx sequelize-cli db:migrate
# (optional) generate data dummy untuk testing (jangan dilakukan apabila production)
$ npx sequelize-cli db:seed:all
```

**Jalankan proyek**

```shell
# Pengembangan lokal
$ nodemon index.js
```
```shell
# Pengembangan produksi
$ npm pm2 start index.js --watch
```

## Struktur Proyek

```shell
zi-pahlawan140-backend/
├── config/              # Konfigurasi aplikasi
├── controllers/         # Logic handler untuk setiap route
├── middleware/          # Middleware membantu untuk keamanan route
├── models/              # Model data sequelize MySQL
├── routes/              # Definisi route API
├── migrations/          # Migrasi untuk membangun tabel model
├── seeders/             # Seed untuk mengisi tabel otomatis
├── .env                 # Konfigurasi key AES dan informasi login
├── index.js             # Konfigurasi Express dan entry point aplikasi
├── package-lock.json    # File penguncian dependensi
├── package.json         # File yang berisi metadata proyek dan daftar dependensi
└── README.md
```
