# Bot Discord untuk Pemberitahuan Donasi

Proyek ini adalah sebuah bot Discord yang dirancang untuk menerima data donasi melalui API dan mengirim pemberitahuan tentang donasi tersebut ke server Discord yang ditentukan. Bot ini terintegrasi dengan aplikasi pihak ketiga bernama Tiptap yang berfungsi sebagai penyedia data donasi.

## Fitur Utama

- Menerima data donasi melalui API.
- Penyimpanan data donasi dalam file `data.json`.
- Pemberitahuan donasi ke server Discord dengan informasi lengkap tentang donasi.
- Thumbnail dinamis berdasarkan jumlah donasi.
- Integrasi dengan Discord.js untuk berinteraksi dengan Discord.

## Teknologi yang Digunakan

- Node.js
- Express
- Discord.js
- fs
- dotenv
- Helmet
- Cors
- morgan

## Cara Menggunakan

1. Pasang dependensi dengan menjalankan perintah `npm install`.
2. Atur konfigurasi lingkungan dengan membuat file `.env` dan mengatur variabel `BOT_TOKEN` dengan token bot Discord Anda.
3. Jalankan bot dengan menjalankan perintah `npm start`.
4. Bot akan aktif dan siap menerima data donasi melalui API dan mengirimkan pemberitahuan ke server Discord yang ditentukan.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1. Fork repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur-baru`).
3. Lakukan perubahan yang diinginkan.
4. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
5. Push ke branch fitur Anda (`git push origin fitur-baru`).
6. Buat permintaan tarik (pull request) ke repositori ini.

## Lisensi

Proyek ini dilisensikan di bawah lisensi [MIT](https://opensource.org/licenses/MIT).
