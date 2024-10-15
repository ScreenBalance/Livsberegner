

    // ... rest of the existing code ...
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById('grid');
    const calculateButton = document.getElementById('calculate');
    const ageInput = document.getElementById('age');
    const screenTimeInput = document.getElementById('screenTime');
    const screenTimeContainer = document.getElementById('screenTimeContainer');
    const totalMonths = 1080; // 90 years * 12 months
    const careerMonthsTotal = 125; // Total months spent on career, education, and work (90,000 hours)
    const transportMonthsTotal = 32; // Total months spent on transportation
    const cookingMonthsTotal = 80; // Total months spent on cooking and eating
    const choresMonthsTotal = 68; // Total months spent on chores
    const hygieneMonthsTotal = 34; // Total months spent on hygiene
    const transportFraction = transportMonthsTotal / totalMonths;
    const cookingFraction = cookingMonthsTotal / totalMonths;
    const choresFraction = choresMonthsTotal / totalMonths;
    const hygieneFraction = hygieneMonthsTotal / totalMonths;

    let age = null;
    let gridInitialized = false;

    // Function to create the grid of remaining life months
    function createGrid(monthsLeft) {
        grid.innerHTML = ''; // Clear existing grid
        for (let i = 0; i < monthsLeft; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            grid.appendChild(dot);
        }
    }
    // Function to update the free time counter
    function updateFreeTimeCounter(freeMonths) {
        const freeTimeCounter = document.getElementById('freeTimeCounter');
        freeTimeCounter.textContent = `${freeMonths} months of free time`;
    }

    // Function to color the grid based on the user's input
    function colorGrid(age, screenTime = 0) {
        // ... existing code ...

        // Color free time months (gray)
        const freeMonths = monthsLeft - sleepMonths - careerEducationMonths - transportMonths - cookingMonths - choresMonths - hygieneMonths - screenTimeMonths;
        const freeTimeStartIndex = screenTimeStartIndex + screenTimeMonths;
        for (let i = freeTimeStartIndex; i < monthsLeft; i++) {
            dots[i]?.classList.add('free-time');
        }

        // Update the free time counter
        updateFreeTimeCounter(freeMonths);
    }


    // Function to color the grid based on the user's input
    function colorGrid(age, screenTime = 0) {
        const monthsLived = age * 12;
        const monthsLeft = totalMonths - monthsLived;

        createGrid(monthsLeft);

        const dots = document.querySelectorAll('.dot');

        const futureStartIndex = 0;

        const sleepMonths = Math.round(monthsLeft * (7.5 / 24));
        const careerEducationMonths = Math.round(calculateCareerEducationMonths(age, monthsLeft));

        // Color sleep months (blue)
        for (let i = futureStartIndex; i < futureStartIndex + sleepMonths; i++) {
            dots[i]?.classList.add('sleep');
        }

        // Color career education and work months (orange)
        const careerStartIndex = futureStartIndex + sleepMonths;
        for (let i = careerStartIndex; i < careerStartIndex + careerEducationMonths; i++) {
            dots[i]?.classList.add('career-education');
        }

        // Color transportation months (green)
        const transportMonths = Math.round(monthsLeft * transportFraction);
        const transportStartIndex = careerStartIndex + careerEducationMonths;
        for (let i = transportStartIndex; i < transportStartIndex + transportMonths; i++) {
            dots[i]?.classList.add('transportation');
        }

        // Color cooking and eating months (purple)
        const cookingMonths = Math.round(monthsLeft * cookingFraction);
        const cookingStartIndex = transportStartIndex + transportMonths;
        for (let i = cookingStartIndex; i < cookingStartIndex + cookingMonths; i++) {
            dots[i]?.classList.add('cooking-eating');
        }

        // Color chore months (brown)
        const choresMonths = Math.round(monthsLeft * choresFraction);
        const choresStartIndex = cookingStartIndex + cookingMonths;
        for (let i = choresStartIndex; i < choresStartIndex + choresMonths; i++) {
            dots[i]?.classList.add('chores');
        }

        // Color hygiene months (light blue)
        const hygieneMonths = Math.round(monthsLeft * hygieneFraction);
        const hygieneStartIndex = choresStartIndex + choresMonths;
        for (let i = hygieneStartIndex; i < hygieneStartIndex + hygieneMonths; i++) {
            dots[i]?.classList.add('hygiene');
        }

        // Color screen time months (red)
        const screenTimeMonths = Math.round(monthsLeft * (screenTime / 24));
        const screenTimeStartIndex = hygieneStartIndex + hygieneMonths;
        for (let i = screenTimeStartIndex; i < screenTimeStartIndex + screenTimeMonths; i++) {
            dots[i]?.classList.add('screen-time');
        }

        // Color free time months (gray)
        const freeMonths = monthsLeft - sleepMonths - careerEducationMonths - transportMonths - cookingMonths - choresMonths - hygieneMonths - screenTimeMonths;
        const freeTimeStartIndex = screenTimeStartIndex + screenTimeMonths;
        for (let i = freeTimeStartIndex; i < monthsLeft; i++) {
            dots[i]?.classList.add('free-time');
        }
    }

    // Function to calculate career education months
    function calculateCareerEducationMonths(age, monthsLeft) {
        const retirementAge = 70;
        if (age >= retirementAge) {
            return 0;
        }

        const careerMonthsRemaining = (retirementAge - age) * 12;
        const proportionOfCareerLeft = careerMonthsRemaining / (54 * 12);
        return careerMonthsTotal * proportionOfCareerLeft;
    }

    // Event listener for the calculate button
    calculateButton.addEventListener('click', function () {
        age = parseFloat(ageInput.value);

        if (!isNaN(age)) {
            colorGrid(age);
            screenTimeContainer.style.display = 'block';
            calculateButton.style.display = 'none';
            gridInitialized = true;
        }
    });

    // Event listener for live updating screen time input
    screenTimeInput.addEventListener('input', function () {
        const screenTime = parseFloat(screenTimeInput.value);

        if (!isNaN(screenTime) && !isNaN(age)) {
            colorGrid(age, screenTime);
        } else if (!isNaN(age)) {
            colorGrid(age);
        }
    });

    // Event listener for live updating age input after grid is initialized
    ageInput.addEventListener('input', function () {
        if (gridInitialized) {
            age = parseFloat(ageInput.value);
            const screenTime = parseFloat(screenTimeInput.value);

            if (!isNaN(age)) {
                if (!isNaN(screenTime)) {
                    colorGrid(age, screenTime);
                } else {
                    colorGrid(age);
                }
            } else {
                grid.innerHTML = '';
            }
        }
    });
});
