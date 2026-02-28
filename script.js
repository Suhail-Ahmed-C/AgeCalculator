const btnEl = document.getElementById("btn");
const birthday = document.getElementById("birthday");
const result = document.getElementById("result");
const nextBirthday = document.getElementById("nextBirthday");
const liveCounterEl = document.getElementById("liveCounter");
const themeToggle = document.getElementById("themeToggle");

let interval;

/* ===============================
   HELPER: Singular / Plural
================================ */
function formatUnit(value, singular, plural) {
    return value === 1 ? `${value} ${singular}` : `${value} ${plural}`;
}

/* ===============================
   DARK / LIGHT MODE
================================ */
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
};

/* ===============================
   BUTTON CLICK
================================ */
btnEl.addEventListener("click", () => {
    if (!birthday.value) {
        alert("Please select your date of birth");
        return;
    }

    clearInterval(interval);
    calculateAge();
    interval = setInterval(updateLiveCounter, 1000);
});

/* ===============================
   AGE CALCULATION (Y / M / D)
================================ */
function calculateAge() {
    const birthDate = new Date(birthday.value);
    const now = new Date();

    if (birthDate > now) {
        alert("Birth date cannot be in the future");
        return;
    }

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    result.textContent = `🎉 You are 
${formatUnit(years, "year", "years")}, 
${formatUnit(months, "month", "months")}, 
${formatUnit(days, "day", "days")} old`;

    /* 🎂 Next Birthday */
    let nextBDay = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (nextBDay < now) {
        nextBDay.setFullYear(now.getFullYear() + 1);
    }

    const diffDays = Math.ceil(
        (nextBDay - now) / (1000 * 60 * 60 * 24)
    );

    nextBirthday.textContent = `🎂 Next birthday in ${formatUnit(
        diffDays,
        "day",
        "days"
    )}`;
}

/* ===============================
   LIVE AGE COUNTER (H / M / S)
================================ */
function updateLiveCounter() {
    const birthDate = new Date(birthday.value);
    const now = new Date();
    const diff = now - birthDate;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

    liveCounterEl.textContent = `⏱️ Live Age: 
${formatUnit(hours, "hour", "hours")} 
${formatUnit(minutes, "minute", "minutes")} 
${formatUnit(seconds, "second", "seconds")}`;
}