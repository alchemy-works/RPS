import { css } from './modules.js'
import { GAME_TYPE } from './constants.js'
import Button from './Button.js'

const _Start = css`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 30vh 0;
  position: relative;

  > .head {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2rem;
    text-align: right;
    padding: .25rem;

    > .setting {
      font-size: 2rem;
      line-height: 2rem;
      cursor: pointer;
      user-select: none;
    }
  }

  > .title {
    text-align: center;

    > span {
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
      background-color: #111;
      user-select: none;
    }
  }

  > .button-3 {
    margin: 2rem auto 0;
  }

  > .button-5 {
    margin: 1rem auto 0;
  }
`

export default {
    template: `
      <div class="${_Start}">
      <div class="head">
        <span @click="handleClickSetting" class="setting">⚙️</span>
      </div>
      <div class="title">
        <span>石头剪刀布</span>
      </div>
      <Button class="button-3" @click="handleClickPlayGame(GAME_TYPE.THREE)">3️⃣ 三局两胜</Button>
      <Button class="button-5" @click="handleClickPlayGame(GAME_TYPE.FIVE)">5️⃣ 五局三胜</Button>
      </div>
    `,
    computed: {
        GAME_TYPE: () => GAME_TYPE,
    },
    methods: {
        handleClickPlayGame(gameType) {
            this.$emit('play', gameType)
        },
        handleClickSetting() {
            this.$emit('setting')
        }
    },
    components: { Button, },
}