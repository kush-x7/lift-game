"use strict";

const startBtn = document.querySelector(".start-game");
const checkBtn = document.querySelector(".check-user-input");
const container = document.querySelector(".container-1");
const userInputBox = document.querySelector(".user-input");
const getFloors = document.querySelector(".user-input__floors");
const getLifts = document.querySelector(".user-input__lifts");

// -----------------------Hiding The Start Button And Showing Input Box-----------------------------

startBtn.addEventListener("click", () => {
  hideStartButton_ShowInput();

  // ------------------------Working With Input Fields---------------------------------------------------------
  const checkInputsBtn = document.querySelector(".btn-start");
  const getAllInputFields = document.querySelectorAll("input");
  for (let i = 0; i < getAllInputFields.length; i++) {
    getAllInputFields[i].addEventListener("keyup", () => {
      const isLiftUnderSix = getLifts.value <= 6;
      const isAboveZero = getLifts.value > 0 && getFloors.value > 0;
      if (getFloors.value && getLifts.value && isLiftUnderSix && isAboveZero) {
        checkInputsBtn.removeAttribute("disabled");
      } else {
        // We are disabling because if the user input less value after activating the button
        checkInputsBtn.setAttribute("disabled", "disabled");
      }
    });
  }
});

// -----------------------Get User Input -----------------------------

checkBtn.addEventListener("click", () => {
  let totalFloors;
  let totalLift;

  if (getFloors.value) {
    totalFloors = Number(getFloors.value);
  }

  if (getLifts.value) {
    totalLift = Number(getLifts.value);
  }

  // -----------------------Hiding  User Input & showing Lifts and floors-----------------------------
  if (getFloors.value && getLifts.value) {
    hideInputBox_ShowLiftsAndFLoors();

    // -----------------------Creating Floors-----------------------------
    for (let i = 0; i < totalFloors; i++) {
      // 1 Create a outer div and give it a class

      const floorRow = document.createElement("div");
      floorRow.setAttribute("class", `row row-${i} floor-animated`);

      // 2 Now insert this string inside the above div
      const floor = `      
      <div class="floor__buttons floor__buttons-${i} ">
      <button class="btn button-up button-up-${i} lift-button--disabled" >⬆</button>
      <button class="btn button-down button-down-${i} lift-button--disabled" >⬇</button>
      </div>
      <div class="floor__number floor-${i}">Floor ${i}</div> `;

      floorRow.innerHTML = floor;
      container.append(floorRow);
    }

    // -----------------------Hiding Lift buttons && Add some styling-----------------------------
    hidingFirstAndLastLiftButtons(totalFloors);
    styleFloorMarginAfterRemovingButton(totalFloors);

    // -----------------------Moving Lift on clicking button-----------------------------
    const liftButtons = document.querySelectorAll(".btn");
    liftButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const floorNumber = Number(
          e.target.parentNode.classList[1].split("-")[1]
        );

        // Disabling lift button
        // const bothButtons = e.target.parentNode.children;
        // for (let i = 0; i < bothButtons.length; i++) {
        //   bothButtons[i].setAttribute("disabled", "disabled");

        //   if (bothButtons[i] !== e.target) {
        //     bothButtons[i].classList.add("lift-button__secondary--disabled");
        //   }
        //   console.log(bothButtons[i].classList);
        // }

        const currentLiftButton = e.target;
        currentLiftButton.setAttribute("disabled", "disabled");

        // ----------------------Checking floors of lift-----------------------------

        // GEtting Differences of the closest lift-----------------------------------
        const getAllNonMovingLifts = document.querySelectorAll(".not-moving");
        let allLiftDistancesDifference = [];
        for (let i = 0; i < getAllNonMovingLifts.length; i++) {
          const currentFloorOfNonMovingLift = Number(
            getAllNonMovingLifts[i].dataset.currentFloor
          );

          const liftDistance = Math.abs(
            floorNumber - currentFloorOfNonMovingLift
          );
          allLiftDistancesDifference.push(liftDistance);
        }

        const getMinDistanceValue = Math.min(...allLiftDistancesDifference);
        const leastDistanceIndex =
          allLiftDistancesDifference.indexOf(getMinDistanceValue);
        if (leastDistanceIndex === -1) {
          currentLiftButton.removeAttribute("disabled", "disabled");
        } else {
          getAllNonMovingLifts[leastDistanceIndex].classList.remove(
            "not-moving"
          );

          // Found the closest lift and now working on the closest lift-------------------

          const myLift = getAllNonMovingLifts[leastDistanceIndex];
          myLift.classList.add(`move-my-lift`);
          myLift.style.transform =
            floorNumber !== 0
              ? `translateY(-${17 * floorNumber}rem)`
              : `translateY(0rem)`;

          const closestLift = myLift.dataset.currentFloor;
          const timeToReachOnFloor = Math.abs(floorNumber - closestLift) * 2;
          myLift.style.transition =
            timeToReachOnFloor !== myLift.dataset.currentFloor
              ? `all ${timeToReachOnFloor}s`
              : `all 1s`;

          addLiftAnimation(
            myLift,
            timeToReachOnFloor,

            currentLiftButton
          );
          myLift.dataset.currentFloor = floorNumber;
        }
      });
    });

    // ------------------LEt's create lift -------------------------------------
    const liftRow = document.createElement("div");
    liftRow.setAttribute("class", `lift__row`);

    for (let i = 0; i < totalLift; i++) {
      // 0 = a, 1 =b  2=c ...
      const lift = `
      <div class="lift lift-${i} not-moving " data-current-floor="0">
      <div class="left-door " data-left-door=${i}></div>
      <div class="right-door" data-right-door=${i}></div>
      </div> `;

      liftRow.innerHTML += lift;
      //   Entering Lift in first row only
      document.querySelector(".row-0").append(liftRow);
    }
  }
});

// HELPER FUNCTIONS

function hideStartButton_ShowInput() {
  setTimeout(() => {
    startBtn.setAttribute("class", "hidden");

    if (userInputBox.classList.contains("hidden")) {
      userInputBox.classList.remove("hidden");
    }
  }, 300);
}

function hideInputBox_ShowLiftsAndFLoors() {
  userInputBox.classList.add("hidden");
  container.classList.remove("center-item");
  container.classList.add("container-2");
}

function hidingFirstAndLastLiftButtons(totalFloors) {
  document.querySelector(".button-down-0").remove();
  document.querySelector(`.button-up-${totalFloors - 1}`).remove();
}

function styleFloorMarginAfterRemovingButton(totalFloors) {
  document.querySelector(`.row-0`).style.marginTop = "3.4rem";
  document.querySelector(`.row-${totalFloors - 1}`).style.marginTop = "4.5rem";
}

function addLiftAnimation(myLift, timeToReachOnFloor, currentLiftButton) {
  setTimeout(() => {
    myLift.classList.add("not-moving");
    // currentButton.target.removeAttribute("disabled");
    currentLiftButton.removeAttribute("disabled", "disabled");
    // for (let i = 0; i < bothButtons.length; i++) {
    //   bothButtons[i].removeAttribute("disabled", "disabled");

    //   if (bothButtons[i] !== e.target) {
    //     bothButtons[i].classList.remove("lift-button__secondary--disabled");
    //   }
    //   console.log(bothButtons[i].classList);
    // }
  }, (timeToReachOnFloor + 5) * 1000);

  setTimeout(() => {
    myLift.children[0].classList.add("left-door--animation");
    myLift.children[1].classList.add("right-door--animation");
  }, timeToReachOnFloor * 1000);

  setTimeout(() => {
    myLift.children[0].classList.remove("left-door--animation");
    myLift.children[1].classList.remove("right-door--animation");
  }, (timeToReachOnFloor + 5) * 1000);
}
