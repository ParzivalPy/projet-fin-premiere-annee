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

  defense = parseInt(defense) / 2;
  strategy = parseInt(strategy) / 2 / 100 + 1;
  sessionStorage.setItem("attack", attack);
  sessionStorage.setItem("defense", defense);
  sessionStorage.setItem("strategy", strategy);
}

function enemyAttackFunction() {
  let enemyAttackValue = Math.floor(Math.random() * (enemyAttack - 25)) + 25;
  let enemyDefenseValue = Math.floor(Math.random() * (enemyDefense - 15)) + 10;
  return {
    attack_enemy: enemyAttackValue,
    defense_enemy: enemyDefenseValue,
  };
}

function fight() {
  // boucle de combat
  if (sessionStorage.getItem("player-life") > 0 && sessionStorage.getItem("enemy-life") > 0) {
    console.log("Ca, execute");
    let fight_choose = document.querySelector('input[name="tour"]:checked').id;
    if (fight_choose == "t1r1") {
      enemy = enemyAttackFunction();
      let attack_enemy = enemy.attack_enemy;
      let defense_enemy = enemy.defense_enemy;
      if (attack_enemy - defense > 0) {
        health_fight = sessionStorage.getItem("player-life") - attack_enemy - defense;
        console.log("Enemy attack:", attack_enemy - defense);
      }
      if ((attack + 20) * strategy - defense_enemy > 0) {
        enemyHealth_fight = sessionStorage.getItem("enemy-life") - (attack + 20) * strategy - defense_enemy;
        console.log("Player attack:", (attack + 20) * strategy - defense_enemy);
      }
    }
    sessionStorage.setItem("player-life", health_fight);
    sessionStorage.setItem("enemy-life", enemyHealth);
    window.location.href = "11.html";
    return;
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
  console.log(sessionStorage);
  if (
    (sessionStorage.getItem("player-life") == null ||
      sessionStorage.getItem("enemy-life") == null) &&
    sessionStorage.getItem("can_play") != true
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
}

// ajoute un écouteur d'événement pour le clic sur le lien
document
  .getElementsByTagName("a")[0]
  .addEventListener("click", function (event) {
    console.log("Début addEventListener");
    if (document.querySelector('input[name="tour"]:checked')) {
      event.preventDefault();
      console.log("Fight() va commencer");
      fight();
    } else {
      console.log("Aucun choix de tour sélectionné");
      event.preventDefault();
      alert("Please select an action before proceeding.");
      return;
    }
  });

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

if (window.location.href.includes("10.html")) {
  document
    .getElementsByTagName("a")[0]
    .addEventListener("click", function (event) {
      sessionStorage.setItem("can_play", true);
    });
}

//Loader//

// Quand la page est complètement chargée
window.addEventListener("DOMContentLoaded", function () {
  // On récupère le loader (la boîte qui s'affiche avec la note)
  var loader = document.getElementById("loader");

  // On sélectionne uniquement les liens avec la classe "delayed-link"
  var links = document.querySelectorAll("a.delayed-link");

  // Pour chaque lien concerné
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // On récupère le lien vers lequel on veut aller
      var destination = link.getAttribute("href");

      // Si ce n'est pas un lien valide, on ne fait rien
      if (
        !destination || // lien vide
        destination.startsWith("#") || // ancre interne
        destination.startsWith("mailto:") || // lien email
        destination.startsWith("tel:") // lien téléphone
      ) {
        return; // on laisse le comportement normal
      }

      // On empêche d'aller vers la page immédiatement
      event.preventDefault();

      // On affiche le loader (en flex pour le centrer)
      loader.style.display = "flex";

      // Après 2 secondes, on redirige vers la vraie page
      setTimeout(function () {
        window.location.href = destination;
      }, 2000);
    });
  });
});
