import { css } from './modules.js'
import Card from './Card.js'
import { PAGE_TYPE, RESULT_TYPE, RPS_LIST } from './constants.js'
import { getGameResultText, getRoundResult, getRoundResultText } from './rps.js'
import { gotoRoutePage } from './router.js'

const _Gaming = css`
  min-height: 100vh;
  position: relative;

  > .head {
    position: absolute;
    left: 0;
    right: 0;
    height: 2rem;
    padding: .25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .head-left {

      > .icon-button:not(:first-child) {
        margin-left: .25rem;
      }

      > .icon-button {
        font-size: 2rem;
        line-height: 2rem;
        user-select: none;
        cursor: pointer;
      }
    }

    > .record {
      font-size: 1.25rem;
      line-height: 1.25rem;
      user-select: none;

      > .count {
        font-weight: bold;
        color: #ef4444;
      }
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
    top: calc(50vh - 128px);
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

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

    > .card:not(:first-child) {
      margin-left: .25rem;
    }
  }
`

export default {
    template: `
      <div @click="handleClickOutside" class="${_Gaming}">
      <div class="head">
        <span class="head-left">
          <span class="icon-button" @click="handleClickBack">↩️</span>
          <span class="icon-button" @click="handleClickRestart">🔁</span>
        </span>
        <span class="record">
          <span>赢</span>
          <span class="count">{{ win }}</span>
          <span>输</span>
          <span class="count">{{ lose }}</span>
          <span>平</span>
          <span class="count">{{ draw }}</span>
        </span>
      </div>
      <div class="result">
        <span v-if="gameResultText">
          <span>游戏结束</span>
          <br>
          <span>{{ gameResultText }}</span>
        </span>
        <span v-else-if="resultText">
          <span>第{{ win + lose + draw }}轮</span>
          <br>
          <span>{{ resultText }}</span>
        </span>
      </div>
      <div class="desk">
        <Card @click="handleClickOutside" :type="hostPlayedCard"/>
        <Card @click="handleClickOutside" :type="playerPlayedCard"/>
      </div>
      <div class="hand">
        <Card v-for="it of cardList"
              :key="it"
              :type="it"
              :selected="it === playerSelectedCard"
              :clickable="!playerPlayedCard"
              @click="handleClickCard(it)"/>
      </div>
      </div>
    `,
    props: {
        gameType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            hostPlayedCard: '',
            playerSelectedCard: '',
            playerPlayedCard: '',
            roundCompleted: false,
            win: 0,
            lose: 0,
            draw: 0,
        }
    },
    computed: {
        gameResultText() {
            return getGameResultText(this.win, this.lose, this.gameType)
        },
        cardList() {
            return RPS_LIST.filter((it) => it !== this.playerPlayedCard)
        },
        resultText() {
            if (!this.roundCompleted) {
                return ''
            }
            const result = getRoundResult(this.playerPlayedCard, this.hostPlayedCard)
            return getRoundResultText(result)
        }
    },
    methods: {
        handleClickCard(it) {
            if (this.gameResultText) {
                return
            }
            if (this.roundCompleted) {
                this.resetRound()
                return
            }
            if (this.playerPlayedCard) {
                return
            }
            if (this.playerSelectedCard === it) {
                this.playerPlayedCard = it
                this.hostPlay().then((card) => {
                    this.hostPlayedCard = card
                    this.roundCompleted = true
                    this.updateResultCount()
                })
            } else {
                this.playerSelectedCard = it
            }
        },
        updateResultCount() {
            const result = getRoundResult(this.playerPlayedCard, this.hostPlayedCard)
            switch (result) {
                case RESULT_TYPE.WIN:
                    this.win = this.win + 1
                    break
                case RESULT_TYPE.LOST:
                    this.lose = this.lose + 1
                    break
                case RESULT_TYPE.DRAW:
                    this.draw = this.draw + 1
                    break
                default:
            }
            this.gameResultText = getGameResultText(this.win, this.lose, this.gameType)
        },
        resetRound() {
            this.hostPlayedCard = ''
            this.playerSelectedCard = ''
            this.playerPlayedCard = ''
            this.roundCompleted = false
        },
        resetGame() {
            this.win = 0
            this.draw = 0
            this.lose = 0
        },
        reset() {
            this.resetRound()
            this.resetGame()
        },
        handleClickRestart() {
            this.reset()
        },
        handleClickBack() {
            this.reset()
            gotoRoutePage(PAGE_TYPE.START)
        },
        hostPlay() {
            return new Promise((resolve) => {
                let i = 0
                let playing = true
                const handle = setInterval(() => {
                    if (playing) {
                        this.hostPlayedCard = RPS_LIST[i % 3]
                        i++
                    } else {
                        clearInterval(handle)
                        const time = new Date().getTime()
                        let card = RPS_LIST[time % 3]
                        if (card === RPS_LIST[i]) {
                            card = RPS_LIST[(i + 1) % 3]
                        }
                        resolve(card)
                    }
                }, 160)
                setTimeout(() => {
                    playing = false
                }, 1600)
            })
        },
        handleClickOutside() {
            if (this.gameResultText) {
                return
            }
            if (this.roundCompleted) {
                this.resetRound()
            } else {
                this.playerSelectedCard = ''
            }
        },
    },
    components: { Card, },
}
