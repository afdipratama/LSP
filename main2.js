const readline = require('readline'); // IMPORT MODUL DENGAN REQUIRE , MEMANGGIL MODUL DARI NODE_MODULES
const fs = require('fs');

const rl = readline.createInterface({  // proses pemanggilan kepada readline untuk input dan output nantinya
  input: process.stdin,
  output: process.stdout
});

let numbers = [];

function swapArrayElements(arr, index1, index2) { // functuon swap dengan penamaan fungsi yang deskriptif
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function bubbleSort(arr) { // function soring dengan bubblesort , yaitu dengan membandingkan value antara nilai nilai
  let len = arr.length; // function ini adalah algoritma bubble sort untuk mengurutkan elemen di dalam array
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) { // percabangan yang diperuntukan untuk membandingkan dan mengurutkan nilai nilai di dalam array
      if (arr[i] > arr[i + 1]) {
        swapArrayElements(arr, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

function saveToFile(arr) { // function ini untuk menyimpan angka yang telah di sorting kedalam txt dan disimpan dengan direktori yang sama
  let data = 'Task values: ' + arr.join(', ');
  fs.writeFile('sorted_numbers.txt', data, (err) => { // fs meminta untuk menyimpan hasil ke sorted_numbers.txt
    if (err) throw err;
  });
}

function showMainMenu() { // menampilkan menu menu program 
  console.log('\n\t-----------------------------------');
  console.log('\t\t        MENU            ');
  console.log('\t-----------------------------------');
  console.log('\t1. Input numbers');
  console.log('\t2. Show sorted result');
  console.log('\t3. Exit');
  rl.question('\tEnter your choice [1/2/3]: ', (choice) => { // meminta user untuk memasukan angka sesuai menu
    handleMenuChoice(choice);
  });
}

function handleMenuChoice(choice) { // handler untuk menu dengan percabangan switch case
  switch (choice) {
    case '1': // jika pengguna menginput 1 maka akan menampilkan untuk menginput angka
      showInputMenu();
      break;
    case '2': // opsi percabangan jika pengguna menginput menu 2 
      if (numbers.length === 0) { // jika pengguna tidak menginput , pengguna diminta memasukan nomor lagi dengan sesuai
        console.log('\tYou have not input any numbers.');
        showMainMenu();
      } else {
        bubbleSort(numbers); // jika pengguna menginput data sebelumnya dengan benar , maka akan ditampilkan angka yang telah di sorting
        saveToFile(numbers);
        showResult();
      }
      break;
    case '3': // jika pengguna memasukan nomor 3 maka interface akan mencetak exit , atau keluar dari program
        console.log('\n\t-----------------------------------');
        console.log('\t\t        EXIT            ');
        console.log('\t-----------------------------------');
      process.exit();
      break;
    default:
      console.log('\tInvalid choice. Please choose again.');
      showMainMenu();
      break;
  }
}

function showInputMenu() { // menu input apabila pengguna memilih opsi 1 pada menu utama
  console.log('\n\t-----------------------------------');
  console.log('\t       NUMBER SORTING PROGRAM   ');
  console.log('\t-----------------------------------');
  rl.question('\tEnter the number of values to input: ', (count) => { // permintaan untuk pengguna memasukan angka yang diinginkan untuk di sortir
    enterNumbers(count);
  });
}

function showResult() { // function yang menghasilkan atau menampilkan angka yang telah di sortir
  console.log('\n\t-------------------------'); 
  console.log('\t    SORTED RESULT      ');
  console.log('\t-------------------------');
  console.log('\n\tTask values: ' + numbers.join(', '));
  showMainMenu();
}

function enterNumbers(count) { // function untuk pengguna memasukan angka angka yang ingin di sortir nantinya dan harus diisi
  let numberCount = parseInt(count);

  if (isNaN(numberCount) || numberCount <= 0) {
    console.log('\tNumber of values must be a positive number.');
    showMainMenu();
    return;
  }

  let currentNumber = 1;

  function askNumber() { // function untuk mencetak dan menyuruh pengguna untuk memasukan angka
    rl.question(`\tNumber ${currentNumber}: `, (input) => {
      let parsedInput = parseInt(input);

      if (isNaN(parsedInput)) { // percabangan jika input tidak berupa angka
        console.log('\tInput must be a number.');
        askNumber();
        return;
      }

      numbers.push(parsedInput);

      if (currentNumber < numberCount) { // percabangan ini digunakan untuk memeriksa apakah semua angka yang diinginkan telah dimasukkan oleh pengguna atau belum
        currentNumber++;
        askNumber();
      } else { // jika sudah , program akan melakukan percabangan else untuk menyimpan file kedalam txt
        console.log('\tNumber input complete and saved to sorted_numbers.txt');
        showMainMenu();
      }
    });
  }

  askNumber();
}

function printASCIIArt() { // function print ascii art agar terlihat lebih keren hehe
  console.log("\t    ___     ___     ___     _____  ");
  console.log("\t   / __|   / _ \\   | _ \\   |_   _| ");
  console.log("\t   \\__ \\  | (_) |  |   /     | |   ");
  console.log("\t   |___/   \\___/   |_|_\\    _|_|_  ");
  console.log("\t_|\"\"\"\"\"\"|_|\"\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"|");
  console.log("\t \"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'  ");
}

function clearScreen() { // function clear screen untuk menghapus history layar pada terminal agar terlihat lebih rapih
  console.clear();
}

function restartProgram() { // function jika program direstart maka akan layar akan dibersihkan dan mencetak ascii dan menu lagi
  clearScreen();
  printASCIIArt();
  showMainMenu();
}

restartProgram();
