const walletCap = 100
const leverage = 500

let flag = false

class ScoreBoard {

    score = {
        games: 0,
        wins: 0,
        losses: 0,
    }

    showScore() {

        document.getElementsByClassName('number')[0].textContent = this.score.games
        document.getElementsByClassName('win')[0].textContent = this.score.wins
        document.getElementsByClassName('loss')[0].textContent = this.score.losses
    }
}

class Wallet extends ScoreBoard {

    money = {
        moneyAmt: walletCap
    }

    moneyAmount() {
        document.getElementsByClassName('wallet')[0].textContent = this.money.moneyAmt + '$'
    }
}

class WinOrLooseDetermination extends Wallet {

    winLooseDetermination() {

        const colours = ['rgb(100%,0%,0%)', 'rgb(0%,100%,0%)', 'rgb(0%,0%,100%)']
        const window1 = document.querySelector('section :nth-child(1)')
        const window2 = document.querySelector('section :nth-child(2)')
        const window3 = document.querySelector('section :nth-child(3)')

        window1.style.background = colours[Math.floor(Math.random() * colours.length)]
        window2.style.background = colours[Math.floor(Math.random() * colours.length)]
        window3.style.background = colours[Math.floor(Math.random() * colours.length)]


        if (window1.style.background == window2.style.background && window2.style.background == window3.style.background) {
            this.score.games++
            this.score.wins++
            this.money.moneyAmt = this.money.moneyAmt + leverage * document.getElementById('bid').value
        } else {
            this.score.games++
            this.score.losses++
            this.money.moneyAmt = this.money.moneyAmt - document.getElementById('bid').value
        }

        document.getElementById('bid').value = ""
    }

    determineWinner() {
        if (this.money.moneyAmt < walletCap) {
            document.getElementsByClassName('result')[0].textContent = `You have lost ${walletCap-this.money.moneyAmt}$`
        } else {
            document.getElementsByClassName('result')[0].textContent = `You have won ${this.money.moneyAmt-walletCap}$`
        }
    }
}

class Game extends WinOrLooseDetermination {

    checkValue() {
        if (document.getElementById('bid').value == "") {
            flag = false
            alert('Please place your bid')
        } else if (document.getElementById('bid').value > this.money.moneyAmt) {
            alert('Not enough funds')
            flag = false
        } else {
            flag = true
        }
    }


    startGame() {
        this.winLooseDetermination()
        this.determineWinner()
        this.moneyAmount()
        this.showScore()
    }
}


window.onload = function () {
    const game = new Game()
    document.getElementById('bid').value = ""
    game.moneyAmount()
    game.showScore()

    document.getElementById('start').addEventListener('click', function () {

        game.checkValue()
        if (flag) {
            game.startGame()
        }
    })
}