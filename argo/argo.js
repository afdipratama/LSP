const readline = require('readline'); // Import modul readline untuk membaca input dari pengguna
const numeral = require('numeral'); // Import modul numeral untuk formatting angka
const fs = require('fs'); // Import modul fs untuk membaca file
const PDFDocument = require('pdfkit'); // Import modul pdfkit untuk membuat PDF nantinya

class Pegawai {
  constructor(nip, nama, tahun_masuk, gaji_pokok) {
    this.nip = nip; // NIP pegawai
    this.nama = nama; // Nama pegawai
    this.tahun_masuk = tahun_masuk; // Tahun masuk pegawai
    this.gaji_pokok = gaji_pokok; // Gaji pokok pegawai
  }

  hitung_gaji_akhir() { // Fungsi untuk menghitung gaji akhir pegawai
    return this.gaji_pokok;
  }
}

class Satpam extends Pegawai {
  constructor(nip, nama, tahun_masuk, gaji_pokok, jam_lembur) {
    super(nip, nama, tahun_masuk, gaji_pokok);
    this.jam_lembur = jam_lembur; // Jumlah jam lembur satpam
  }

  hitung_gaji_akhir() { // Fungsi untuk menghitung gaji akhir satpam
    const honor_lembur = this.jam_lembur * 20000; // Honor lembur satpam
    return this.gaji_pokok + honor_lembur;
  }
}

class Sales extends Pegawai {
  constructor(nip, nama, tahun_masuk, gaji_pokok, jumlah_pelanggan) {
    super(nip, nama, tahun_masuk, gaji_pokok);
    this.jumlah_pelanggan = jumlah_pelanggan; // Jumlah pelanggan sales
  }

  hitung_gaji_akhir() { // Fungsi untuk menghitung gaji akhir sales
    const komisi = this.jumlah_pelanggan * 50000; // Komisi sales
    return this.gaji_pokok + komisi;
  }
}

class Administrasi extends Pegawai {
  constructor(nip, nama, tahun_masuk, gaji_pokok, lama_kerja) {
    super(nip, nama, tahun_masuk, gaji_pokok);
    this.lama_kerja = lama_kerja; // Lama kerja administrasi
  }

  hitung_gaji_akhir() { // Fungsi untuk menghitung gaji akhir administrasi
    let tunjangan = 0; // Tunjangan administrasi

    if (this.lama_kerja >= 5) {
      tunjangan = 0.03 * this.gaji_pokok;
    } else if (this.lama_kerja >= 3) {
      tunjangan = 0.01 * this.gaji_pokok;
    }

    return this.gaji_pokok + tunjangan;
  }
}

class Manajer extends Pegawai {
  constructor(nip, nama, tahun_masuk, gaji_pokok, presentase_penjualan) {
    super(nip, nama, tahun_masuk, gaji_pokok);
    this.presentase_penjualan = presentase_penjualan; // Presentase penjualan manajer
  }

  hitung_gaji_akhir() { // Fungsi untuk menghitung gaji akhir manajer
    let bonus = 0; // Bonus manajer berdasarkan peningkatan penjualan

    if (this.presentase_penjualan > 10) {
      bonus = 0.1 * this.gaji_pokok;
    } else if (this.presentase_penjualan >= 6) {
      bonus = 0.05 * this.gaji_pokok;
    } else if (this.presentase_penjualan >= 1) {
      bonus = 0.02 * this.gaji_pokok;
    }

    return this.gaji_pokok + bonus;
  }
}

const rl = readline.createInterface({ // Membuat objek readline untuk membaca input dari pengguna
  input: process.stdin, // Input dari proses stdin
  output: process.stdout // Output ke proses stdout
});

function getInput(prompt) { // Fungsi untuk membaca input dari pengguna
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

function showAsciiArt() {
  fs.readFile('ascii.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Terjadi kesalahan saat membaca file:', err);
      return;
    }
     
    console.log(data);
    console.log("================================"); // Output string untuk tanda pemisah
    console.log("   Program Perhitungan Gaji"); // Output string judul program
    console.log("       PT Argo Industri"); // Output string nama perusahaan
    console.log("================================"); // Output string untuk tanda pemisah
  });
}

function sleep(ms) { // Fungsi untuk menunda eksekusi dalam milidetik
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() { // Fungsi utama program
  showAsciiArt(); // Tampilkan ASCII art
  await sleep(1200); // Memberi delay selama 1,2 detik agar tidak terjadi bug console

  while (true) {
    // Input data pegawai
    const nip = await getInput("Masukkan NIP pegawai: "); // Input NIP pegawai
    const nama = await getInput("Masukkan nama pegawai: "); // Input nama pegawai
    const tahun_masuk = parseInt(await getInput("Masukkan tahun masuk pegawai: ")); // Input tahun masuk pegawai
    const gaji_pokok = parseFloat(await getInput("Masukkan gaji pokok pegawai: ")); // Input gaji pokok pegawai

    console.log("\nDaftar Jabatan:"); // Output string untuk daftar jabatan
    console.log("1. Satpam"); // Output string pilihan jabatan 1
    console.log("2. Sales"); // Output string pilihan jabatan 2
    console.log("3. Administrasi"); // Output string pilihan jabatan 3
    console.log("4. Manajer"); // Output string pilihan jabatan 4

    const jabatan = parseInt(await getInput("\nPilih jabatan pegawai (1-4): ")); // Input jabatan pegawai

    let pegawai; // Variabel pegawai

    if (jabatan === 1) { // Jika jabatan adalah 1 (Satpam)
      const jam_lembur = parseInt(await getInput("Masukkan jumlah jam lembur: ")); // Input jumlah jam lembur
      pegawai = new Satpam(nip, nama, tahun_masuk, gaji_pokok, jam_lembur); // Buat objek Satpam
    } else if (jabatan === 2) { // Jika jabatan adalah 2 (Sales)
      const jumlah_pelanggan = parseInt(await getInput("Masukkan jumlah pelanggan: ")); // Input jumlah pelanggan
      pegawai = new Sales(nip, nama, tahun_masuk, gaji_pokok, jumlah_pelanggan); // Buat objek Sales
    } else if (jabatan === 3) { // Jika jabatan adalah 3 (Administrasi)
      const lama_kerja = parseInt(await getInput("Masukkan lama kerja (dalam tahun): ")); // Input lama kerja
      pegawai = new Administrasi(nip, nama, tahun_masuk, gaji_pokok, lama_kerja); // Buat objek Administrasi
    } else if (jabatan === 4) { // Jika jabatan adalah 4 (Manajer)
      const presentase_penjualan = parseFloat(await getInput("Masukkan presentase penjualan: ")); // Input presentase penjualan
      pegawai = new Manajer(nip, nama, tahun_masuk, gaji_pokok, presentase_penjualan); // Buat objek Manajer
    } else {
      console.log("Jabatan yang Anda pilih tidak valid.");
      continue;
    }

    const gaji_akhir = pegawai.hitung_gaji_akhir(); // Hitung gaji akhir pegawai

    console.log("\nData Pegawai:"); // Output string untuk data pegawai
    console.log("NIP        : " + pegawai.nip); // Output NIP pegawai
    console.log("Nama       : " + pegawai.nama); // Output nama pegawai
    console.log("Tahun Masuk: " + pegawai.tahun_masuk); // Output tahun masuk pegawai
    console.log("Gaji Pokok : " + numeral(pegawai.gaji_pokok).format('0,0.00')); // Output gaji pokok pegawai
    console.log("Gaji Akhir : " + numeral(gaji_akhir).format('0,0.00')); // Output gaji akhir pegawai

    const buatPDF = await getInput("\nBuat PDF? (y/n): "); // Input apakah ingin membuat PDF atau tidak

    if (buatPDF.toLowerCase() === 'y') {
      const doc = new PDFDocument(); // Membuat objek PDFDocument

      doc.pipe(fs.createWriteStream('gaji_pegawai.pdf')); // Menulis ke file gaji_pegawai.pdf

      doc.font('Helvetica-Bold').fontSize(20).text('Data Pegawai', { align: 'center' });
      doc.font('Helvetica').fontSize(12).text('NIP        : ' + pegawai.nip);
      doc.font('Helvetica').fontSize(12).text('Nama       : ' + pegawai.nama);
      doc.font('Helvetica').fontSize(12).text('Tahun Masuk: ' + pegawai.tahun_masuk);
      doc.font('Helvetica').fontSize(12).text('Gaji Pokok : ' + numeral(pegawai.gaji_pokok).format('0,0.00'));
      doc.font('Helvetica').fontSize(12).text('Gaji Akhir : ' + numeral(gaji_akhir).format('0,0.00'));

      doc.end();

      console.log("PDF telah berhasil dibuat dengan nama file 'gaji_pegawai.pdf'.");
    }

    const lanjut = await getInput("\nIngin menghitung gaji pegawai lagi? (y/n): "); // Input apakah ingin menghitung gaji pegawai lagi

    if (lanjut.toLowerCase() !== 'y') {
      break;
    }

    console.log("================================"); // Output string untuk tanda pemisah
  }

  rl.close(); // Menutup readline
}

main(); // Memanggil fungsi utama
