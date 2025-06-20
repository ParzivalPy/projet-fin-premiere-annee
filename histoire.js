let attack = 0;
let defense = 0;
let strategy = 0;
let health = 100;

let enemyAttack = 50;
let enemyDefense = 35;
let enemyHealth = 300;

if (sessionStorage.getItem("attack")) {
  attack = parseInt(sessionStorage.getItem("attack"));
}
if (sessionStorage.getItem("defense")) {
  defense = parseInt(sessionStorage.getItem("defense"));
}
if (sessionStorage.getItem("strategy")) {
  strategy = parseFloat(sessionStorage.getItem("strategy"));
}

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

let roundCounter = sessionStorage.getItem("round-counter")
  ? parseInt(sessionStorage.getItem("round-counter"))
  : 1; // Initialisation du compteur de rounds

function fight(event) {
  // Récupérer les valeurs actuelles de vie du joueur et de l'ennemi
  let playerLife = parseInt(sessionStorage.getItem("player-life"));
  let enemyLife = parseInt(sessionStorage.getItem("enemy-life"));

  if (playerLife > 0 && enemyLife > 0) {
    console.log("Début du combat");

    // Vérifier le choix du joueur pour le tour
    const fightChoose = document.querySelector('input[name="tour"]:checked').id;
    if (fightChoose == "t1r1") {
      const enemy = enemyAttackFunction();
      const attackEnemy = enemy.attack_enemy;
      const defenseEnemy = enemy.defense_enemy;

      console.log("Enemy attack:", attackEnemy);
      console.log("Enemy defense:", defenseEnemy);

      // Calcul des dégâts infligés au joueur
      if (attackEnemy - defense > 0) {
        playerLife -= attackEnemy - defense;
        console.log("Dégâts subis par le joueur :", attackEnemy - defense);
      }

      // Calcul des dégâts infligés à l'ennemi
      if ((attack + 20) * strategy - defenseEnemy > 0) {
        enemyLife -= (attack + 20) * strategy - defenseEnemy;
        console.log(
          "Dégâts infligés à l'ennemi :",
          (attack + 20) * strategy - defenseEnemy
        );
      }
      sessionStorage.setItem("player-life", Math.round(playerLife));
      sessionStorage.setItem("enemy-life", Math.round(enemyLife));

      console.log("Vie du joueur après le combat :", playerLife);
      console.log("Vie de l'ennemi après le combat :", enemyLife);

      // Vérifier les conditions de fin de combat
      if (playerLife <= 0) {
        console.log("Le joueur a perdu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "12.html"; // Page de défaite
      } else if (playerLife < 30 && enemyLife <= 0) {
        console.log("Le joueur est gravement blessé !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "13.html"; // Page de blessure critique
      } else if (enemyLife <= 0) {
        console.log("L'ennemi a été vaincu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "14.html"; // Page de victoire
      } else {
        console.log("Le combat continue !");
        window.location.href = "11.html"; // Retour à la page de combat
      }
    } else if (fightChoose == "t1r2") {
      console.log("Début du combat");
      const enemy = enemyAttackFunction();
      const attackEnemy = enemy.attack_enemy;
      const defenseEnemy = enemy.defense_enemy;

      console.log("Enemy attack:", attackEnemy);
      console.log("Enemy defense:", defenseEnemy);

      // Calcul des dégâts infligés au joueur
      if (attackEnemy - (defense + 10) > 0) {
        playerLife -= attackEnemy - (defense + 10);
        console.log(
          "Dégâts subis par le joueur :",
          attackEnemy - (defense + 10)
        );
      }

      // Calcul des dégâts infligés à l'ennemi
      if ((attack - 10) * strategy - defenseEnemy > 0) {
        enemyLife -= (attack - 10) * strategy - defenseEnemy;
        console.log(
          "Dégâts infligés à l'ennemi :",
          (attack - 10) * strategy - defenseEnemy
        );
      }
      sessionStorage.setItem("player-life", Math.round(playerLife));
      sessionStorage.setItem("enemy-life", Math.round(enemyLife));

      console.log("Vie du joueur après le combat :", playerLife);
      console.log("Vie de l'ennemi après le combat :", enemyLife);

      // Vérifier les conditions de fin de combat
      if (playerLife <= 0) {
        console.log("Le joueur a perdu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "12.html"; // Page de défaite
      } else if (playerLife < 30 && enemyLife <= 0) {
        console.log("Le joueur est gravement blessé !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "13.html"; // Page de blessure critique
      } else if (enemyLife <= 0) {
        console.log("L'ennemi a été vaincu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "14.html"; // Page de victoire
      } else {
        console.log("Le combat continue !");
        window.location.href = "11.html"; // Retour à la page de combat
      }
    } else if (fightChoose == "t1r3") {
      if (roundCounter < 3) {
        alert(
          "Vous devez encore attendre " +
            (3 - roundCounter) +
            " tour(s) avant de pouvoir utiliser cette stratégie."
        );
        event.preventDefault();
        return;
      }
      roundCounter = 0;
      sessionStorage.setItem("round-counter", roundCounter);
      console.log("Début du combat");
      const enemy = enemyAttackFunction();
      const attackEnemy = enemy.attack_enemy;
      const defenseEnemy = enemy.defense_enemy;

      console.log("Enemy attack:", attackEnemy);
      console.log("Enemy defense:", defenseEnemy);

      // Calcul des dégâts infligés au joueur
      if (attackEnemy - defense > 0) {
        playerLife -= attackEnemy - defense;
        console.log("Dégâts subis par le joueur :", attackEnemy - defense);
      }

      // Calcul des dégâts infligés à l'ennemi
      if ((attack + 50) * strategy - defenseEnemy > 0) {
        enemyLife -= (attack + 50) * strategy - defenseEnemy;
        console.log(
          "Dégâts infligés à l'ennemi :",
          (attack + 50) * strategy - defenseEnemy
        );
      }
      sessionStorage.setItem("player-life", Math.round(playerLife));
      sessionStorage.setItem("enemy-life", Math.round(enemyLife));

      console.log("Vie du joueur après le combat :", playerLife);
      console.log("Vie de l'ennemi après le combat :", enemyLife);

      // Vérifier les conditions de fin de combat
      if (playerLife <= 0 && enemyLife > playerLife) {
        console.log("Le joueur a perdu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "12.html"; // Page de défaite
      } else if (playerLife < 30 && enemyLife <= 0) {
        console.log("Le joueur est gravement blessé !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "13.html"; // Page de blessure critique
      } else if (enemyLife <= 0 && playerLife > enemyLife) {
        console.log("L'ennemi a été vaincu !");
        sessionStorage.removeItem("player-life");
        sessionStorage.removeItem("enemy-life");
        window.location.href = "14.html"; // Page de victoire
      } else {
        console.log("Le combat continue !");
        window.location.href = "11.html"; // Retour à la page de combat
      }
    } else {
      console.error(
        "Le combat ne peut pas commencer : vie du joueur ou de l'ennemi invalide."
      );
      sessionStorage.setItem("player-life", health);
      sessionStorage.setItem("enemy-life", enemyHealth);
      window.location.href = "11.html";
    }
    roundCounter++;
    sessionStorage.setItem("round-counter", roundCounter);
  } else {
    roundCounter = 0; // Réinitialiser le compteur de rounds si le combat est terminé
    sessionStorage.setItem("round-counter", roundCounter);
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
if (window.location.href.includes("11.html")) {
  liste = [
    "Agh'Zarr bondit vers toi avec une vitesse inhumaine.",
    "Les yeux d'Agh'Zarr luisent d'une lueur maléfique alors qu'il charge, sa silhouette massive emplissant l'espace.",
    "Agh'Zarr brandit son arme colossale, l'abattant avec une force capable de pulvériser la pierre.",
    "En un éclair, Agh'Zarr disparaît dans un voile de ténèbres, prêt à frapper là où tu t'y attends le moins.",
    "Agh'Zarr marque le sol d'un symbole étrange, son aura imposant un silence glacial autour de lui.",
    "D'un geste lent, Agh'Zarr ramasse un éclat de pierre, le réduisant en poussière entre ses doigts massifs.",
  ];
  const randomIndex = Math.floor(Math.random() * liste.length);
  document.getElementById("fight-p").innerText = liste[randomIndex];
  document
    .getElementsByTagName("a")[0]
    .addEventListener("click", function (event) {
      console.log("Début addEventListener");
      if (document.querySelector('input[name="tour"]:checked')) {
        event.preventDefault();
        console.log("Fight() va commencer");
        fight(event);
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

if (window.location.href.includes("10.html")) {
  document
    .getElementsByTagName("a")[0]
    .addEventListener("click", function (event) {
      sessionStorage.setItem("can_play", true);
    });
}

// ------------------------------------------------
//
//                 Musique
//
// ------------------------------------------------

if (window.location.href.includes("11.html")) {
  const audio = new Audio("../ASSETS/mp3/ivars_wrath.mp3");
  audio.play();

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("audioTime2", audio.currentTime);
  });

  window.addEventListener("load", () => {
    const audio = new Audio("../ASSETS/mp3/ivars_wrath.mp3");
    const savedTime = sessionStorage.getItem("audioTime2");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }
    audio.play();
  });
} else {
  const audio = new Audio("../ASSETS/mp3/son_viking.mp3");
  audio.play();

  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("audioTime", audio.currentTime);
  });

  window.addEventListener("load", () => {
    const audio = new Audio("../ASSETS/mp3/son_viking.mp3");
    const savedTime = sessionStorage.getItem("audioTime");
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
    }
    audio.play();
  });

  if (window.location.href.includes("15.html")) {
    setTimeout(() => {
      window.location.href = "00.html";
    }, 30000);
  }
}
