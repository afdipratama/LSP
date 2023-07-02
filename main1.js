// INSTALL MODUL NPM
const readlineSync = require('readline');
const fs = require('fs');

const rl = readlineSync.createInterface({
  input: process.stdin,
  output: process.stdout
});

let angka = [];

function tukar(arr, index1, index2) {
  // Fungsi untuk menukar elemen array pada posisi index1 dan index2
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function urutBubble(arr) {
  // Fungsi untuk mengurutkan array dengan metode Bubble Sort
  let len = arr.length;
  let tertukar;

  do {
    tertukar = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        tukar(arr, i, i + 1);
        tertukar = true;
      }
    }
  } while (tertukar);
}

function simpanKeFile(arr) {
  // Fungsi untuk menyimpan data array ke dalam file
  let data = 'Nilai tugas: ' + arr.join(', ');
  fs.writeFile('angka_urut.txt', data, (err) => {
    if (err) throw err;
  });
}

function tampilMenuUtama() {
  // Menampilkan menu utama program
  console.log('\n\t-----------------------------------');
  console.log('\t\t        MENU            ');
  console.log('\t-----------------------------------');
  console.log('\t1. Input angka');
  console.log('\t2. Tampil hasil pengurutan');
  console.log('\t3. Selesai');
  rl.question('\tMasukkan pilihan [1/2/3]: ', (pilihan) => {
    pilihMenu(pilihan);
  });
}

function pilihMenu(pilihan) {
  // Menangani pilihan menu yang dimasukkan pengguna
  switch (pilihan) {
    case '1':
      tampilMenuInput();
      break;
    case '2':
      if (angka.length === 0) {
        console.log('\tAnda belum menginput angka.');
        tampilMenuUtama();
      } else {
        urutBubble(angka);
        simpanKeFile(angka);
        tampilHasil();
      }
      break;
    case '3':
      console.log('\t-=-=== SELESAI ===-=-');
      process.exit();
      break;
    default:
      console.log('\tPilihan tidak valid. Silakan pilih kembali.');
      tampilMenuUtama();
      break;
  }
}

function tampilMenuInput() {
  // Menampilkan menu untuk meminta jumlah angka yang akan diinput
  console.log('\n\t-----------------------------------');
  console.log('\t       PROGRAM PENGURUTAN   ');
  console.log('\t-----------------------------------');
  rl.question('\tMasukkan jumlah angka yang akan diinput: ', (count) => {
    masukkanAngka(count);
  });
}

function tampilHasil() {
  // Menampilkan hasil pengurutan array
  console.log('\n\t-------------------------');
  console.log('\t    HASIL PENGURUTAN      ');
  console.log('\t-------------------------');
  console.log('\tNilai tugas: ' + angka.join(', '));
  tampilMenuUtama();
}

function masukkanAngka(jumlah) {
  // Meminta pengguna memasukkan angka sebanyak jumlah yang diminta
  let jumlahAngka = parseInt(jumlah);

  if (isNaN(jumlahAngka) || jumlahAngka <= 0) {
    console.log('\tJumlah angka yang dimasukkan harus bilangan positif.');
    tampilMenuUtama();
    return;
  }

  let angkaSaatIni = 1;

  function tanyaAngka() {
    rl.question(`\tAngka ${angkaSaatIni}: `, (input) => {
      let angkaInput = parseInt(input);

      if (isNaN(angkaInput)) {
        console.log('\tInput harus berupa angka.');
        tanyaAngka();
        return;
      }

      angka.push(angkaInput);

      if (angkaSaatIni < jumlahAngka) {
        angkaSaatIni++;
        tanyaAngka();
      } else {
        console.log('\tInput angka selesai dan telah disimpan ke angka_urut.txt');
        tampilMenuUtama();
      }
    });
  }

  tanyaAngka();
}

function cetakASCII() {
  // Menampilkan gambar ASCII
  console.log("\t    ___     ___     ___     _____  ");
  console.log("\t   / __|   / _ \\   | _ \\   |_   _| ");
  console.log("\t   \\__ \\  | (_) |  |   /     | |   ");
  console.log("\t   |___/   \\___/   |_|_\\    _|_|_  ");
  console.log("\t_|\"\"\"\"\"\"|_|\"\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"|");
  console.log("\t \"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'  ");
}

function bersihkanLayar() {
  // Membersihkan layar konsol
  console.clear();
}

function ulangProgram() {
  bersihkanLayar();
  cetakASCII();
  tampilMenuUtama();
}

ulangProgram();
