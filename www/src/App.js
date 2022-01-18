import { css } from './modules.js'
import Card from './Card.js'
import { RPS } from './constants.js'

const _App = css`
  min-height: 100vh;
  position: relative;

  > .head {
    position: absolute;
    left: 0;
    right: 0;
    height: 2rem;
    text-align: right;
    padding: .25rem;

    > .restart {
      font-size: 2rem;
      line-height: 2rem;
      cursor: pointer;
      user-select: none;
    }
  }

  > .result {
    margin-top: 12vh;
    position: absolute;
    left: 0;
    right: 0;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 10px;
    color: #ef4444;
    text-shadow: 1px 1px 3px rgb(36 37 47 / 25%);
    user-select: none;
  }


  > .desk {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(50vh - 128px - 1rem);
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    // gap: .5rem;
    > .card:not(:first-child) {
      margin-top: .5rem;
    }
  }

  > .hand {
    padding: .25rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;

    // gap: .25rem;
    > .card:not(:first-child) {
      margin-left: .25rem;
    }
  }
`

const CARD_LIST = [RPS.ROCK, RPS.SCISSORS, RPS.PAPER]

export default {
    template: `
      <div class="${_App}">
      <div class="head">
        <span @click="handleClickRestart" class="restart">🔁</span>
      </div>
      <div class="result">{{ resultText }}</div>
      <div class="desk">
        <Card :type="hostCard"/>
        <Card :type="playedCard"/>
      </div>
      <div class="hand">
        <Card v-for="it of cardList"
              :key="it"
              :type="it"
              :selected="it === selectedCard"
              :clickable="!playedCard"
              @click="handleClickCard(it)"/>
      </div>
      </div>
    `,
    data() {
        return this.getInitialData()
    },
    computed: {
        cardList() {
            return CARD_LIST.filter((it) => it !== this.playedCard)
        },
        resultText() {
            if (!this.played) {
                return ''
            }
            const e = this.hostCard
            const u = this.playedCard
            if (!e || !u) {
                return ''
            }
            if (e === u) {
                return '平局！'
            }
            if ((e === RPS.ROCK && u === RPS.PAPER)
                || (e === RPS.PAPER && u === RPS.SCISSORS)
                || (e === RPS.SCISSORS && u === RPS.ROCK)) {
                return '你赢了!'
            }
            return '你输了！'
        }
    },
    methods: {
        getInitialData() {
            return {
                hostCard: '',
                playedCard: '',
                played: false,
                selectedCard: '',
            }
        },
        handleClickCard(it) {
            if (this.playedCard) {
                return
            }
            if (this.selectedCard === it) {
                this.playedCard = it
                this.hostPlay().then(() => {
                    this.played = true
                })
            } else {
                this.selectedCard = it
            }
        },
        handleClickRestart() {
            Object.assign(this, this.getInitialData())
        },
        hostPlay() {
            return new Promise((resolve) => {
                let i = 0
                let playing = true
                const handle = setInterval(() => {
                    if (playing) {
                        this.hostCard = CARD_LIST[i % 3]
                        i++
                    } else {
                        clearInterval(handle)
                        const time = new Date().getTime()
                        let newHostCard = CARD_LIST[time % 3]
                        if (newHostCard === CARD_LIST[i]) {
                            newHostCard = CARD_LIST[(i + 1) % 3]
                        }
                        this.hostCard = newHostCard
                        resolve()
                    }
                }, 160)
                setTimeout(() => {
                    playing = false
                }, 1600)
            })
        },
    },
    components: { Card },
}
