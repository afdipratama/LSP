const readline = require('readline'); // Menggunakan penamaan yang jelas dan mudah dimengerti
const fs = require('fs');

const rl = readline.createInterface({ // Menggunakan penamaan yang jelas dan mudah dimengerti
  input: process.stdin,
  output: process.stdout
});

let numbers = [];

function swapArrayElements(arr, index1, index2) { // Menggunakan penamaan fungsi yang deskriptif
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function bubbleSort(arr) {
  let len = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swapArrayElements(arr, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);
}

function saveToFile(arr) {
  let data = 'Task values: ' + arr.join(', ');
  fs.writeFile('sorted_numbers.txt', data, (err) => {
    if (err) throw err;
  });
}

function showMainMenu() {
  console.log('\n\t-----------------------------------');
  console.log('\t\t        MENU            ');
  console.log('\t-----------------------------------');
  console.log('\t1. Input numbers');
  console.log('\t2. Show sorted result');
  console.log('\t3. Exit');
  rl.question('\tEnter your choice [1/2/3]: ', (choice) => {
    handleMenuChoice(choice);
  });
}

function handleMenuChoice(choice) {
  switch (choice) {
    case '1':
      showInputMenu();
      break;
    case '2':
      if (numbers.length === 0) {
        console.log('\tYou have not input any numbers.');
        showMainMenu();
      } else {
        bubbleSort(numbers);
        saveToFile(numbers);
        showResult();
      }
      break;
    case '3':
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

function showInputMenu() {
  console.log('\n\t-----------------------------------');
  console.log('\t       NUMBER SORTING PROGRAM   ');
  console.log('\t-----------------------------------');
  rl.question('\tEnter the number of values to input: ', (count) => {
    enterNumbers(count);
  });
}

function showResult() {
  console.log('\n\t-------------------------');
  console.log('\t    SORTED RESULT      ');
  console.log('\t-------------------------');
  console.log('\n\tTask values: ' + numbers.join(', '));
  showMainMenu();
}

function enterNumbers(count) {
  let numberCount = parseInt(count);

  if (isNaN(numberCount) || numberCount <= 0) {
    console.log('\tNumber of values must be a positive number.');
    showMainMenu();
    return;
  }

  let currentNumber = 1;

  function askNumber() {
    rl.question(`\tNumber ${currentNumber}: `, (input) => {
      let parsedInput = parseInt(input);

      if (isNaN(parsedInput)) {
        console.log('\tInput must be a number.');
        askNumber();
        return;
      }

      numbers.push(parsedInput);

      if (currentNumber < numberCount) {
        currentNumber++;
        askNumber();
      } else {
        console.log('\tNumber input complete and saved to sorted_numbers.txt');
        showMainMenu();
      }
    });
  }

  askNumber();
}

function printASCIIArt() {
  console.log("\t    ___     ___     ___     _____  ");
  console.log("\t   / __|   / _ \\   | _ \\   |_   _| ");
  console.log("\t   \\__ \\  | (_) |  |   /     | |   ");
  console.log("\t   |___/   \\___/   |_|_\\    _|_|_  ");
  console.log("\t_|\"\"\"\"\"\"|_|\"\"\"\"\"\"|_|\"\"\"\"\"|_|\"\"\"\"|");
  console.log("\t \"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-'  ");
}

function clearScreen() {
  console.clear();
}

function restartProgram() {
  clearScreen();
  printASCIIArt();
  showMainMenu();
}

restartProgram();
