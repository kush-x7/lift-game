"use strict";

const startBtn = document.querySelector(".start-game");
const checkBtn = document.querySelector(".check-user-input");
const container = document.querySelector(".container-1");
const userInputBox = document.querySelector(".user-input");
const getFloors = document.querySelector(".user-input__floors");
const getLifts = document.querySelector(".user-input__lifts");

// Step 1 Hiding the start button and showing input field

startBtn.addEventListener("click", () => {
  setTimeout(() => {
    startBtn.setAttribute("class", "hidden");

    if (userInputBox.classList.contains("hidden")) {
      userInputBox.classList.remove("hidden");
    }
  }, 300);
});

// Step 2 to get input of user

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

  if (getFloors.value && getLifts.value) {
    userInputBox.classList.add("hidden");

    // Step 3 Add container 2 class and remove flex
    container.classList.remove("center-item");
    container.classList.add("container-2");

    // Step 4 Creating Floors an lifts

    // APPROACH

    for (let i = 0; i < totalFloors; i++) {
      // 1 Create a outer div and give it a class

      const floorRow = document.createElement("div");
      floorRow.setAttribute("class", `row row-${i}`);

      // 2 Now insert this string inside the above div
      const floor = `      
            <div class="floor__buttons ">
                <button class="btn button-up button-up-${i}">⬆</button>
                <button class="btn button-down button-down-${i}">⬇</button>
            </div>
            <div class="floor__number floor-${i}">Floor ${i}</div> `;

      floorRow.innerHTML = floor;
      container.append(floorRow);
    }

    // Now Hide the first and the last floor button
    document.querySelector(".button-down-0").remove();
    document.querySelector(`.button-up-${totalFloors - 1}`).remove();
    document.querySelector(`.row-0`).style.marginTop = "3.4rem";
    document.querySelector(`.row-${totalFloors - 1}`).style.marginTop =
      "4.5rem";

    const liftButton = document.querySelectorAll(".btn");

    liftButton.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("hello");
      });
    });
  }
});
