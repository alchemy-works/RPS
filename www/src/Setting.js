import { css } from './modules.js'
import { WINNING_PROBABILITY } from './constants.js'
import Select from './Select.js'

const _Setting = css`
  min-height: 100vh;
  position: relative;

  > .head {
    height: 2rem;
    text-align: left;
    padding: .25rem;

    > .back {
      font-size: 2rem;
      line-height: 2rem;
      cursor: pointer;
      user-select: none;
    }
  }

  .title {
    padding: .5rem;
    font-size: 2rem;
    user-select: none;
  }

  .settings {
    padding: 2rem .5rem;
    user-select: none;
    font-size: 1rem;
    text-align: center;
  }
`

export default {
    template: `
      <div class="${_Setting}">
      <div class="head">
        <span @click="handleClickBack" class="back">↩️</span>
      </div>
      <div class="title">设置</div>
      <div class="settings">
        <label for="setting-winning-probability">获胜概率：</label>
        <Select id="setting-winning-probability" :value="setting.winningProbability"
                :options="winningProbabilityOptionList"
                @change="handleWinningProbabilityChange"/>
      </div>
      </div>
    `,
    props: {
        setting: {
            type: Object,
            required: true,
        },
    },
    computed: {
        winningProbabilityOptionList: () => ([
            { label: '高', value: WINNING_PROBABILITY.HIGH, },
            { label: '中等', value: WINNING_PROBABILITY.NORMAL, },
            { label: '低', value: WINNING_PROBABILITY.LOW, },
        ])
    },
    methods: {
        handleClickBack() {
            this.$emit('back')
        },
        handleWinningProbabilityChange(ev) {
            this.$emit('change', {
                winningProbability: ev
            })
        },
    },
    components: { Select, }
}