let attack = 0;
let defense = 0;
let strategy = 0;
let health = 100;

function updateStats() {
  let question1 = document.querySelector('input[name="question1"]:checked').id;
  if (question1 === "q1r1") {
    attack += 5;
    defense += 10;
    strategy += 10;
  } else if (question1 === "q1r2") {
    attack += 10;
    defense += 10;
    strategy += 5;
  } else if (question1 === "q1r3") {
    attack += 15;
    defense += 5;
    strategy += 10;
  } else {
    console.error("Invalid answer for question 1");
  }

  let question2 = document.querySelector('input[name="question2"]:checked').id;
  if (question2 === "q2r1") {
    attack += 5;
    defense += 15;
    strategy += 10;
  } else if (question2 === "q2r2") {
    attack += 10;
    defense += 10;
    strategy += 5;
  } else if (question2 === "q2r3") {
    attack += 5;
    defense += 10;
    strategy += 15;
  } else {
    console.error("Invalid answer for question 2");
  }

  let question3 = document.querySelector('input[name="question3"]:checked').id;
  if (question3 === "q3r1") {
    attack += 5;
    defense += 5;
    strategy += 20;
  } else if (question3 === "q3r2") {
    attack += 5;
    defense += 10;
    strategy += 15;
  } else if (question3 === "q3r3") {
    attack += 20;
    defense += 5;
    strategy += 5;
  } else {
    console.error("Invalid answer for question 3");
  }

  let question4 = document.querySelector('input[name="question4"]:checked').id;
  if (question4 === "q4r1") {
    attack += 10;
    defense += 15;
    strategy += 5;
  } else if (question4 === "q4r2") {
    attack += 20;
    defense += 5;
    strategy += 5;
  } else if (question4 === "q4r3") {
    attack += 5;
    defense += 10;
    strategy += 15;
  } else {
    console.error("Invalid answer for question 4");
  }
}

updateStats();