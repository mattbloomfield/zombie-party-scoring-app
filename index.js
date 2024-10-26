const participants = [
    {
        name: 'Deak & Emily',
        points: {
            challenge1: 3,
            challenge2: 1,
            challenge3: 2,
            challenge4: 16,
            challenge5: 8,
            challenge6: 8,
            challenge7: 0,
            challenge8: 12,
        },
    },
    {
        name: 'Doug & Caitlin',
        points: {
            challenge1: 2,
            challenge2: 1,
            challenge3: 2,
            challenge4: 18,
            challenge5: 2,
            challenge6: 0,
            challenge7: 0,
            challenge8: 30,
        },
        advantages: [],
    },
    {
        name: 'Kristina & Betsy',
        points: {
            challenge1: 3,
            challenge2: 1,
            challenge3: 2,
            challenge4: 15,
            challenge5: 8,
            challenge6: 0,
            challenge7: 0,
            challenge8: 5,
        },
    },
    {
        name: 'Eli & Macie',
        points: {
            challenge1: 3,
            challenge2: 1,
            challenge3: 2,
            challenge4: 16,
            challenge5: 8,
            challenge6: 5,
            challenge7: 0,
            challenge8: 34,
        },
    },
    {
        name: 'Matt & Linsey',
        points: {
            challenge1: 6,
            challenge2: 1,
            challenge3: 8,
            challenge4: 17,
            challenge5: 8,
            challenge6: 3,
            challenge7: 0,
            challenge8: 24,
        },
        advantages: [],
    },
    {
        name: 'Craig & Sarah',
        points: {
            challenge1: 4,
            challenge2: 1,
            challenge3: 6,
            challenge4: 21,
            challenge5: 5,
            challenge6: 3,
            challenge7: 0,
            challenge8: 25,
        },
    },
    {
        name: 'Bryce & Jen',
        points: {
            challenge1: 2,
            challenge2: 1,
            challenge3: 2,
            challenge4: 12,
            challenge5: 5,
            challenge6: 3,
            challenge7: 0,
            challenge8: 18,
        },
    },
    {
        name: 'Ren & Emily',
        points: {
            challenge1: 3,
            challenge2: 1,
            challenge3: 4,
            challenge4: 13,
            challenge5: 5,
            challenge6: 3,
            challenge7: 0,
            challenge8: 31,
        },
    },






]

const buildScoreboard = (participants) => {
    const scoreboard = document.getElementById('Scoreboard');
    participants.forEach(participant => {
        const row = document.createElement('div');
        row.classList.add('tr');
        const name = document.createElement('div');
        name.classList.add('td', 'name');
        name.textContent = participant.name;
        row.appendChild(name);
        let completedChallenges = 0;
        Object.keys(participant.points).forEach(key => {
            const cell = document.createElement('div');
            cell.classList.add('td','point', 'invisible');
            if (participant.points[key] === null) {
                cell.classList.add('null');
            }
            cell.textContent = participant.points[key];
            row.appendChild(cell);
            if (participant.points[key] !== null) {
                completedChallenges++;
            }
        });
        const total = document.createElement('div');
        total.classList.add('td', 'total', 'invisible');
        if (completedChallenges === 0) {
            total.classList.add('null');
        }
        total.textContent = Object.values(participant.points).reduce((acc, curr) => acc + curr, 0);
        row.appendChild(total);
        scoreboard.appendChild(row);
    });
    return scoreboard;
}

const displayScoreboard = () => {
    const scoreboard = document.getElementById('Scoreboard');
    // do the above query but ignore if they also have the class .null
    const cells = scoreboard.querySelectorAll('.point:not(.null)');
    // remove invisible class at 1 second intervals
    const pointsDelay = 1000;
    const totalTime = cells.length * pointsDelay;
    cells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.remove('invisible');
            let audio = new Audio('sounds/small-boom.mp3');
            audio.play();
        }, index * pointsDelay);
    });

    // remove invisible class from total at 9 seconds
    setTimeout(() => {
        const totals = scoreboard.querySelectorAll('.total:not(.th):not(.null)');
        totals.forEach((total, index) => {
            setTimeout(() => {
                total.classList.remove('invisible');
                let audio = new Audio('sounds/big-boom.mp3');
                audio.play();
            }, index * 500);
        });
    }, totalTime);
}

const init = () => {
    const scoreboard = buildScoreboard(participants);
    document.body.appendChild(scoreboard);
    displayScoreboard();
}

init();