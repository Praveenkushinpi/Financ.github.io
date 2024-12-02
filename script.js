function toggleNav() {

    var sidebar = document.getElementById("sidebar");

    if (sidebar.style.width === "250px") {

        sidebar.style.width = "0";

    } else {

        sidebar.style.width = "250px";

    }

}function getWeekNumber(date) {

    const startDate = new Date(date.getFullYear(), 0, 1);

    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    return Math.ceil((days + 1) / 7);

}

function getCurrentMonth() {

    return new Date().getMonth(); // Get current month (0 - 11)

}

function getCurrentYear() {

    return new Date().getFullYear(); // Get current year

}

function resetWeeklyExpenses() {

    const currentWeek = getWeekNumber(new Date());

    const storedWeek = localStorage.getItem("currentWeek");

    if (currentWeek !== storedWeek) {

        localStorage.setItem("weeklyExpenses", JSON.stringify([])); // Reset weekly expenses

        localStorage.setItem("currentWeek", currentWeek);

    }

}

function resetMonthlyExpenses() {

    const currentMonth = getCurrentMonth();

    const currentYear = getCurrentYear();

    const storedMonth = localStorage.getItem("currentMonth");

    const storedYear = localStorage.getItem("currentYear");

    if (currentMonth !== storedMonth || currentYear !== storedYear) {

        localStorage.setItem("monthlyExpenses", JSON.stringify([])); // Reset monthly expenses

        localStorage.setItem("currentMonth", currentMonth);

        localStorage.setItem("currentYear", currentYear);

    }

}

function logExpense() {

    const expenseName = document.getElementById("expense-name").value;

    const expenseAmount = document.getElementById("expense-amount").value;

    const currentDate = new Date();

    const expenseDate = currentDate.toLocaleDateString();

    const weekNumber = getWeekNumber(currentDate);

    const currentMonth = getCurrentMonth();

    if (expenseName && expenseAmount) {

        const expenseData = {

            name: expenseName,

            amount: expenseAmount,

            date: expenseDate,

            week: weekNumber,

            month: currentMonth

        };

        const todaysList = document.getElementById("todays-expenses-list");

        const weeklyList = document.getElementById("weekly-expenses-list");

        const monthlyList = document.getElementById("monthly-expenses-list");

        const expenseItem = document.createElement("li");

        expenseItem.innerHTML = `<b>${expenseName}</b>: $${expenseAmount} on ${expenseDate} (Week ${weekNumber})`;

        todaysList.appendChild(expenseItem);

        let weeklyExpenses = JSON.parse(localStorage.getItem("weeklyExpenses")) || [];

        let monthlyExpenses = JSON.parse(localStorage.getItem("monthlyExpenses")) || [];

        // Add to weekly expenses

        weeklyExpenses.push(expenseData);

        localStorage.setItem("weeklyExpenses", JSON.stringify(weeklyExpenses));

        // Add to monthly expenses

        monthlyExpenses.push(expenseData);

        localStorage.setItem("monthlyExpenses", JSON.stringify(monthlyExpenses));

        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

        expenses.push(expenseData);

        localStorage.setItem("expenses", JSON.stringify(expenses));

        document.getElementById("expense-name").value = "";

        document.getElementById("expense-amount").value = "";

    } else {

        alert("Please enter both expense name and amount.");

    }

}

window.onload = function() {

    resetWeeklyExpenses();

    resetMonthlyExpenses();

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const todaysList = document.getElementById("todays-expenses-list");

    const weeklyList = document.getElementById("weekly-expenses-list");

    const monthlyList = document.getElementById("monthly-expenses-list");

    const today = new Date();

    const currentDate = today.toLocaleDateString();

    const currentWeekNumber = getWeekNumber(today);

    const currentMonth = getCurrentMonth();

    expenses.forEach(expense => {

        const expenseDate = new Date(expense.date);

        if (expenseDate.toLocaleDateString() === currentDate) {

            const expenseItem = document.createElement("li");

            expenseItem.innerHTML = `<b>${expense.name}</b>: $${expense.amount} on ${expense.date} (Week ${expense.week})`;

            todaysList.appendChild(expenseItem);

        }

        if (expense.week === currentWeekNumber) {

            const expenseItem = document.createElement("li");

            expenseItem.innerHTML = `<b>${expense.name}</b>: $${expense.amount} on ${expense.date} (Week ${expense.week})`;

            weeklyList.appendChild(expenseItem);

        }

        if (expense.month === currentMonth) {

            const expenseItem = document.createElement("li");

            expenseItem.innerHTML = `<b>${expense.name}</b>: $${expense.amount} on ${expense.date} (Month ${expense.month + 1})`;

            monthlyList.appendChild(expenseItem); // Updated for monthly expenses

        }

    });

};
function logEarning() {

    const earningName = document.getElementById("earning-name").value;

    const earningAmount = document.getElementById("earning-amount").value;

    const currentDate = new Date();

    const earningDate = currentDate.toLocaleDateString();

    if (earningName && earningAmount) {

        const earningData = {

            name: earningName,

            amount: earningAmount,

            date: earningDate

        };

        const earningsList = document.getElementById("earnings-list");

        const earningItem = document.createElement("li");

        earningItem.innerHTML = `<b>${earningName}</b>: $${earningAmount} on ${earningDate}`;

        earningsList.appendChild(earningItem);

        let earnings = JSON.parse(localStorage.getItem("earnings")) || [];

        earnings.push(earningData);

        localStorage.setItem("earnings", JSON.stringify(earnings));

        document.getElementById("earning-name").value = "";

        document.getElementById("earning-amount").value = "";

    } else {

        alert("Please enter both earning name and amount.");

    }

}

window.onload = function() {

    let earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    const earningsList = document.getElementById("earnings-list");

    earnings.forEach(earning => {

        const earningItem = document.createElement("li");

        earningItem.innerHTML = `<b>${earning.name}</b>: $${earning.amount} on ${earning.date}`;

        earningsList.appendChild(earningItem);

    });

};
function setSavingGoal() {

    const goalAmount = document.getElementById("goal-amount").value;

    if (goalAmount) {

        localStorage.setItem("savingGoal", goalAmount);

        document.getElementById("goal-display").innerText = `Saving Goal: $${goalAmount}`;

        document.getElementById("goal-amount").value = "";

    } else {

        alert("Please enter a goal amount.");

    }

}

function checkGoalProgress() {

    const goalAmount = localStorage.getItem("savingGoal");

    const earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    let totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.amount), 0);

    if (goalAmount) {

        const progress = ((totalEarnings / goalAmount) * 100).toFixed(2);

        document.getElementById("goal-progress").innerText = `Progress: ${progress}% (${totalEarnings} of ${goalAmount})`;

    } else {

        document.getElementById("goal-progress").innerText = "No goal set.";

    }

}

window.onload = function() {

    const goalAmount = localStorage.getItem("savingGoal");

    if (goalAmount) {

        document.getElementById("goal-display").innerText = `Saving Goal: $${goalAmount}`;

    }

    checkGoalProgress();

};
function calculateStats() {

    const expenses = JSON.parse(localStorage.getItem("dailyExpenses")) || [];

    const earnings = JSON.parse(localStorage.getItem("earnings")) || [];

    let totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

    let totalEarnings = earnings.reduce((sum, earning) => sum + parseFloat(earning.amount), 0);

    let savings = totalEarnings - totalExpenses;

    document.getElementById("total-expenses").innerText = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    document.getElementById("total-earnings").innerText = `Total Earnings: $${totalEarnings.toFixed(2)}`;

    document.getElementById("total-savings").innerText = `Total Savings: $${savings.toFixed(2)}`;

}

window.onload = function() {

    calculateStats(); // Calculate stats on load

    // Optional: Call other functions here if needed, e.g., goal progress

};