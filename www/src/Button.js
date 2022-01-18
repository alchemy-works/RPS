import { css } from './modules.js'

const _Button = css`
  box-sizing: border-box;
  display: block;
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 4px;
  font-size: 1.5rem;
  cursor: pointer;
  transition-property: transform;
  transition-duration: 200ms;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;

  :active {
    transform: scale(0.95, 0.95);
  }
`

export default {
    template: `
      <button class="${_Button}" @click="$emit('click', $event)">
      <slot></slot>
      </button>
    `,
    props: {},

}