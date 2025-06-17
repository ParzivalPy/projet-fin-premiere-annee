let attack = 0;
let defense = 0;
let strategy = 0;
let health = 100;

let enemyAttack = 50;
let enemyDefense = 35;
let enemyHealth = 250;

if (sessionStorage.getItem("attack")) {
  attack = parseInt(sessionStorage.getItem("attack"));
}
if (sessionStorage.getItem("defense")) {
  defense = parseInt(sessionStorage.getItem("defense"));
}
if (sessionStorage.getItem("strategy")) {
  strategy = parseFloat(sessionStorage.getItem("strategy"));
}

console.log("Initial Stats:");
console.log("Attack:", attack);
console.log("Defense:", defense);
console.log("Strategy:", strategy);

function updateStats() {
  attack = 0;
  defense = 0;
  strategy = 0;

  if (sessionStorage.getItem("attack")) {
    sessionStorage.removeItem("attack");
  }
  if (sessionStorage.getItem("defense")) {
    sessionStorage.removeItem("defense");
  }
  if (sessionStorage.getItem("strategy")) {
    sessionStorage.removeItem("strategy");
  }

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
  }

  strategy = parseInt(strategy) / 2 / 100 + 1;
  sessionStorage.setItem("attack", attack);
  sessionStorage.setItem("defense", defense);
  sessionStorage.setItem("strategy", strategy);
}

function enemyAttackFunction() {
  let enemyAttackValue = Math.floor(Math.random() * enemyAttack) + 1;
  let enemyDefenseValue = Math.floor(Math.random() * enemyDefense) + 1;
  return {
    attack_enemy: enemyAttackValue,
    defense_enemy: enemyDefenseValue,
  };
}

function fight() {
  // boucle de combat
  if (health > 0 && enemyHealth > 0) {
    let fight_choose = document.querySelector('input[name="tour"]:checked');
    if (fight_choose == "t1r1") {
      enemy = enemyAttackFunction();
      let attack_enemy = enemy.attack_enemy;
      let defense_enemy = enemy.defense_enemy;
      if (attack_enemy - defense * strategy > 0) {
        health -= attack_enemy - defense * strategy;
      }
      if (attack * strategy - defense_enemy > 0) {
        enemyHealth -= (attack + 20) * strategy - defense_enemy;
      }
    }
    sessionStorage.setItem("player-life", health);
    sessionStorage.setItem("enemy-life", enemyHealth);
  } else if (health <= 0) {
    window.location.href = "12.html";
  } else if (health < 30) {
    window.location.href = "13.html";
  } else {
    window.location.href = "14.html";
  }
}

if (window.location.href.includes("11.html")) {

  // créé les variables de sessionStorage si elles n'existent pas
  if (
    sessionStorage.getItem("player-life") == null ||
    sessionStorage.getItem("enemy-life") == null
  ) {
    sessionStorage.setItem("player-life", health);
    sessionStorage.setItem("enemy-life", enemyHealth);
  }

  // attribue les valeurs de sessionStorage aux éléments HTML
  document.getElementById("player-attack").textContent =
    sessionStorage.getItem("attack");
  document.getElementById("player-defense").textContent =
    sessionStorage.getItem("defense");
  document.getElementById("player-strat").textContent =
    sessionStorage.getItem("strategy");
  document.getElementById("player-life").textContent =
    sessionStorage.getItem("player-life");

  document.getElementById("enemy-life").textContent =
    sessionStorage.getItem("enemy-life");

  // ajoute un écouteur d'événement pour le clic sur le lien
  document
    .getElementsByTagName("a")[0]
    .addEventListener("click", function (event) {
      if (document.querySelector('input[name="tour"]:checked')) {
        fight();
      } else {
        event.preventDefault();
        alert("Please select an action before proceeding.");
        return;
      }
    });
}

if (window.location.href.includes("09.html")) {
  document
    .getElementsByTagName("a")[0]
    .addEventListener("click", function (event) {
      if (
        document.querySelector('input[name="question1"]:checked') &&
        document.querySelector('input[name="question2"]:checked') &&
        document.querySelector('input[name="question3"]:checked') &&
        document.querySelector('input[name="question4"]:checked')
      ) {
        updateStats();
      } else {
        event.preventDefault();
        alert("Please answer all questions before proceeding.");
        return;
      }
    });
}


