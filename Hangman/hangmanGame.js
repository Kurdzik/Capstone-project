import {
    Quotes
} from './hangmanquotes.js'


class Game {

    currentStep = 0
    lastStep = 7


    quotes = [{
        text: 'pan tadeusz',
        category: 'Utwór literacki',
    }, {
        text: 'ogniem i mieczem',
        category: 'Utwór literacki',
    }, {
        text: 'star wars',
        category: 'Film',
    }, {
        text: 'encyklopedia',
        category: 'Ksiazka',
    }, {
        text: 'wieza eiffla',
        category: 'Budynek',
    }, {
        text: 'akademia pana kleksa',
        category: 'Film',
    }]


    constructor({
        lettersHolder,
        categoryHolder,
        wordHolder,
        outputHolder
    }) {
        this.lettersHolder = lettersHolder
        this.categoryHolder = categoryHolder
        this.wordHolder = wordHolder
        this.outputHolder = outputHolder

        const {
            text,
            category
        } = this.quotes[Math.floor(Math.random() * this.quotes.length)]
        this.categoryHolder.textContent = category
        this.quote = new Quotes(text)



    }
    guess(letter) {
        event.target.disabled = true
        if (this.quote.guess(letter)) {
            this.drawQuote()

        } else {
            this.currentStep++
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1
            document.getElementsByClassName('step')[this.currentStep - 1].style.opacity = 0.1
            if (this.currentStep == this.lastStep) {
                this.losing()
            }
        }



    }
    drawLetters() {
        for (let i = 0; i < 26; i++) {
            const label = (i + 10).toString(36)
            const btn = document.createElement('button')
            this.lettersHolder.appendChild(btn)
            btn.textContent = label
            btn.addEventListener('click', () =>
                this.guess(label))

        }
    }
    drawQuote() {
        const content = this.quote.getContent()
        this.wordHolder.textContent = content
        if (!content.includes('_')) {
            this.winning()
        }
    }
    start() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1
        this.drawLetters()
        this.drawQuote()



    }
    winning() {
        this.wordHolder.textContent = 'GRATULACJE'
        this.lettersHolder.textContent = ""
        this.categoryHolder.textContent = ""
    }
    losing() {
        this.wordHolder.textContent = 'GAME OVER'
        this.lettersHolder.textContent = ""
        this.categoryHolder.textContent = ""
    }
}




const game = new Game({
    lettersHolder: document.getElementById('letters'),
    categoryHolder: document.getElementById('category'),
    wordHolder: document.getElementById('word'),
    outputHolder: document.getElementById('output')

})
game.start()