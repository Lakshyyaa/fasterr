setStart(true)
countdowndiv.current.style.display = 'block'
maindiv.current.style.opacity = '0.2'
timerLoop(3)
fetch('https://api.github.com/repos/Lakshyyaa/testingcsv/contents/words.csv')
    .then(x => x.json())
    .then(y => (atob(y.content)).split('\n'))
    .then(words => {
        let y = [];
        for (let i = 0; i < 2; i++) {
            const x = Math.floor(Math.random() * 1000);
            y.push(words[x].substring(1, words[x].length - 1));
        }
        return y;
    })
    .then(y => {
        setWords(y.join(' '))
    })