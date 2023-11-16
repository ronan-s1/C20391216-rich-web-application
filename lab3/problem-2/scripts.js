document.addEventListener("DOMContentLoaded", function () {
    const { interval, fromEvent } = rxjs;
    const { map, takeWhile, tap } = rxjs.operators;

    const hoursElem = document.getElementById("hours");
    const minutesElem = document.getElementById("minutes");
    const secondsElem = document.getElementById("seconds");

    const startTimerBtn = document.getElementById("start-timer");

    const timer$ = interval(1000).pipe(
        map((val) => getTotalSeconds() - val - 1),
        takeWhile((val) => val >= 0),
        tap((val) => {
            const hours = Math.floor(val / 3600);
            const minutes = Math.floor((val % 3600) / 60);
            const seconds = val % 60;

            hoursElem.textContent = formatTime(hours);
            minutesElem.textContent = formatTime(minutes);
            secondsElem.textContent = formatTime(seconds);
        })
    );

    fromEvent(startTimerBtn, "click").subscribe(() => {
        timer$.subscribe();
    });
});

function getTotalSeconds() {
    const inputHours = parseInt(document.getElementById("input-hours").value) || 0;
    const inputMinutes = parseInt(document.getElementById("input-minutes").value) || 0;
    const inputSeconds = parseInt(document.getElementById("input-seconds").value) || 0;

    return inputHours * 3600 + inputMinutes * 60 + inputSeconds;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}
