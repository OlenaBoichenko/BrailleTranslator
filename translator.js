const alphabet = {
  a: "O.....",
  b: "O.O...",
  c: "OO....",
  d: "OO.O..",
  e: "O..O..",
  f: "OOO...",
  g: "OOOO..",
  h: "O.OO..",
  i: ".OO...",
  j: ".OOO..",
  k: "O...O.",
  l: "O.O.O.",
  m: "OO..O.",
  n: "OO.OO.",
  o: "O..OO.",
  p: "OOO.O.",
  q: "OOOOO.",
  r: "O.OOO.",
  s: ".OO.O.",
  t: ".OOOO.",
  u: "O...OO",
  v: "O.O.OO",
  w: ".OOO.O",
  x: "OO..OO",
  y: "OO.OOO",
  z: "O..OOO",
  " ": "......", //Space
  capital: ".....O", //Capital
  number: ".O.OOO",
};

const numbers = {
  1: "O.....",
  2: "O.O...",
  3: "OO....",
  4: "OO.O..",
  5: "O..O..",
  6: "OOO...",
  7: "OOOO..",
  8: "O.OO..",
  9: ".OO...",
  0: ".OOO..",
};

const englishToBraille = { ...alphabet, ...numbers };

function translateToBraille(input) {
  let brailleOutput = "";
  let isNumberMode = false;

  for (const char of input) {
    if (char >= "A" && char <= "Z") {
      brailleOutput += alphabet["capital"];
      brailleOutput += alphabet[char.toLowerCase()];
    } else if (char >= "0" && char <= "9") {
      if (!isNumberMode) {
        brailleOutput += alphabet["number"];
        isNumberMode = true;
      }
      brailleOutput += numbers[char];
    } else {
      if (char === " ") {
        isNumberMode = false;
      }
      brailleOutput += englishToBraille[char] || "";
    }
  }

  return brailleOutput;
}

function translateToEnglish(input) {
  const brailleChars = input.match(/.{1,6}/g);
  let englishOutput = "";
  let isCapital = false;
  let isNumberMode = false;

  for (const brailleChar of brailleChars) {
    if (brailleChar === alphabet["capital"]) {
      isCapital = true;
      continue;
    }
    if (brailleChar === alphabet["number"]) {
      isNumberMode = true;
      continue;
    }

    const letter = Object.keys(englishToBraille).find(
      (key) => englishToBraille[key] === brailleChar
    );

    if (letter) {
      if (isCapital && !isNumberMode) {
        englishOutput += letter.toUpperCase();
        isCapital = false;
      } else if (isNumberMode) {
        isNumberMode = false;
        englishOutput += letter;
      } else {
        englishOutput += letter;
      }
    }
  }

  return englishOutput;
}

function main() {
  const input = process.argv.slice(2).join(" ");
  if (!input) {
    console.log("Please provide input text.");
    return;
  }

  if (input.includes("O") || input.includes(".")) {
    console.log(translateToEnglish(input));
  } else {
    console.log(translateToBraille(input));
  }

  const validChars = /^[A-Za-z0-9\sO.]+$/;

  if (!validChars.test(input)) {
    console.log(
      "Input contains invalid characters. Please use English letters, numbers, and spaces only."
    );
    return;
  }
}

main();
