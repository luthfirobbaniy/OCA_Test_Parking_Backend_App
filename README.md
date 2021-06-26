# OCA Test - Parking Backend App

## Specification
- Node.js
- Express.js

## Installation

### Install App
`npm i`

### Jalankan App
`node .`

## Documentation

### A) Enter Parking

Post - `http://localhost:2000/parking/enter`

#### Request Body:
- `plat_nomor` (String)
- `warna` (String)
- `tipe` (String)

#### Contoh:
`{ "plat_nomor": "B123456B", "warna": "Putih", "tipe": "SUV" }`

#### Catatan:
`tipe` hanya menerima input `"MPV"` atau `"SUV"`

### B) Exit Parking
Post - `http://localhost:2000/parking/exit`

#### Request Body:
- `plat_nomor` (String)

#### Contoh:
`{ "plat_nomor": "B123456B" }`

### C) Total Vehicles by Type

Post - `http://localhost:2000/parking/total-by-type`

#### Request Body:
- `tipe` (String)

#### Contoh:
`{ "tipe": "SUV" }`

### D) List Vehicles by Color

Post - `http://localhost:2000/parking/list-by-color`

#### Request Body:
`warna` (String)

#### Contoh:
`{ "warna": "Putih" }`
