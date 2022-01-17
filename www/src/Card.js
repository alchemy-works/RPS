import { css, cx } from './modules.js'
import { PAPER_A, PAPER_B, ROCK_A, ROCK_B, RPS, SCISSORS_A, SCISSORS_B } from './constants.js'

const _Card = css`
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  user-select: none;
  height: 8rem;
  width: 6rem;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  bottom: 0;
  transition-property: bottom;
  transition-duration: 200ms;
  border: 1px solid #111;
  background-color: #fff;

  &.clickable {
    cursor: pointer;
  }

  &.selected {
    bottom: 2rem;
  }

  .edge {
    position: absolute;
    top: .5rem;
    left: .25rem;
    font-size: 4rem;
    line-height: 4rem;
  }

  .center {
    position: absolute;
    font-size: 1.5rem;
    line-height: 1.5rem;
    bottom: .5rem;
    right: .25rem;
    background-color: #111;
    color: #fff;
    font-weight: bold;
  }

`

export default {
    template: `
      <div @click="$emit('click')" :class="className">
      <span class="edge">{{ edge }}</span>
      <span class="center">{{ center }}</span>
      </div>
    `,
    props: {
        type: {
            type: String,
            required: false,
            default: '',
        },
        selected: {
            type: Boolean,
            required: false,
            default: () => false,
        },
        clickable: {
            type: Boolean,
            required: false,
            default: () => false,
        },
    },
    computed: {
        className() {
            return cx({
                [_Card]: true,
                selected: this.selected,
                clickable: this.clickable,
            })
        },
        edge() {
            switch (this.type) {
                case RPS.PAPER:
                    return PAPER_A
                case RPS.ROCK:
                    return ROCK_A
                case RPS.SCISSORS:
                    return SCISSORS_A
                default:
                    return '❓'

            }
        },
        center() {
            switch (this.type) {
                case RPS.PAPER:
                    return PAPER_B
                case RPS.ROCK:
                    return ROCK_B
                case RPS.SCISSORS:
                    return SCISSORS_B
                default:
                    return '？'
            }
        },
    },
}
