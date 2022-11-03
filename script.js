"use strict";

const startBtn = document.querySelector(".start-game");
const checkBtn = document.querySelector(".check-user-input");
const container = document.querySelector(".container-1");
const userInputBox = document.querySelector(".user-input");
const getFloors = document.querySelector(".user-input__floors");
const getLifts = document.querySelector(".user-input__lifts");

// -----------------------Hiding The Start Button-----------------------------

startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startBtn.setAttribute("class", "hidden");

    if (userInputBox.classList.contains("hidden")) {
      userInputBox.classList.remove("hidden");
    }
  }, 300);

  // ------------------------Show user input------------------------------------
  const getAllInputFields = document.querySelectorAll("input");
  for (let i = 0; i < getAllInputFields.length; i++) {
    getAllInputFields[i].addEventListener("keyup", () => {
      if (getFloors.value && getLifts.value) {
        console.log("complete");
        document.querySelector(".btn-start").removeAttribute("disabled");
      } else {
        document
          .querySelector(".btn-start")
          .setAttribute("disabled", "disabled");
      }
    });
  }
});

// -----------------------Get User Input -----------------------------

checkBtn.addEventListener("click", () => {
  let totalFloors;
  let totalLift;

  if (getFloors.value) {
    //  Check for the max number
    totalFloors = Number(getFloors.value);
  } else {
    alert("enter floors");
  }

  if (getLifts.value) {
    // Check for the max number
    totalLift = Number(getLifts.value);
  } else {
    alert("enter lifts");
  }

  // -----------------------Hiding  User Input & showing Lifts and floors-----------------------------
  if (getFloors.value && getLifts.value) {
    userInputBox.classList.add("hidden");
    container.classList.remove("center-item");
    container.classList.add("container-2");

    // Step 4 Creating Floors an lifts

    // -----------------------Creating Floors-----------------------------
    for (let i = 0; i < totalFloors; i++) {
      // 1 Create a outer div and give it a class

      const floorRow = document.createElement("div");
      floorRow.setAttribute("class", `row row-${i} floor-animated`);

      // 2 Now insert this string inside the above div
      const floor = `      
        <div class="floor__buttons floor__buttons-${i} ">
        <button class="btn button-up button-up-${i}">⬆</button>
        <button class="btn button-down button-down-${i}">⬇</button>
        </div>
        <div class="floor__number floor-${i}">Floor ${i}</div> `;

      floorRow.innerHTML = floor;
      container.append(floorRow);
    }

    // -----------------------Hiding Lift buttons-----------------------------
    document.querySelector(".button-down-0").remove();
    document.querySelector(`.button-up-${totalFloors - 1}`).remove();
    document.querySelector(`.row-0`).style.marginTop = "3.4rem";
    document.querySelector(`.row-${totalFloors - 1}`).style.marginTop =
      "4.5rem";

    // -----------------------Moving Lift on clicking button-----------------------------
    const liftButton = document.querySelectorAll(".btn");
    liftButton.forEach((button) => {
      button.addEventListener("click", (e) => {
        const floorNumber = Number(
          e.target.parentNode.classList[1].split("-")[1]
        );

        const getAllNonMovingLifts = document.querySelectorAll(".not-moving");
        const getFirstNonMovingLift = getAllNonMovingLifts[0];

        //
        // ----------------------Checking floors of lift-----------------------------
        let allLiftDistancesDifference = [];
        for (let i = 0; i < getAllNonMovingLifts.length; i++) {
          const currentFloorOfNonMovingLift = Number(
            getAllNonMovingLifts[i].dataset.currentFloor
          );

          const liftDistance = Number(
            floorNumber - currentFloorOfNonMovingLift
          );

          allLiftDistancesDifference.push(liftDistance); // -> [6, 2, 7, 6]
        }

        console.log(allLiftDistancesDifference);

        const getMinDistanceValue = Math.min(...allLiftDistancesDifference);
        console.log("I'm the least distance value", getMinDistanceValue);

        const leastDistanceIndex =
          allLiftDistancesDifference.indexOf(getMinDistanceValue);
        console.log("I'm the least distance", leastDistanceIndex);

        getAllNonMovingLifts[leastDistanceIndex].classList.remove("not-moving");
        const myLift = getAllNonMovingLifts[leastDistanceIndex];
        getAllNonMovingLifts[leastDistanceIndex].dataset.currentFloor =
          floorNumber;
        myLift.classList.add(`move-my-lift`);
        myLift.style.transform = `translateY(-${17 * floorNumber}rem)`;
        const timeToReachOnFloor = floorNumber * 2;
        myLift.style.transition = `all ${timeToReachOnFloor}s`;

        setTimeout(() => {
          getAllNonMovingLifts[leastDistanceIndex].classList.add("not-moving");
        }, (timeToReachOnFloor + 5) * 1000);
      });
    });

    // Let's Create Lift
    const liftRow = document.createElement("div");
    liftRow.setAttribute("class", `lift__row`);

    for (let i = 0; i < totalLift; i++) {
      // 0 = a, 1 =b  2=c ...
      const lift = `
      <div class="lift lift-${i} not-moving " data-current-floor="0">
        <div class="left-door"></div>
        <div class="right-door"></div>
      </div> `;

      liftRow.innerHTML += lift;
      //   Entering Lift in first row only
      document.querySelector(".row-0").append(liftRow);
    }
  }
});
