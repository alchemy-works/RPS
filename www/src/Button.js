import { css } from './modules.js'

const _Button = css`
  position: relative;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 4px;
  font-size: 1.5rem;
  line-height: 1.5rem;
  padding: .5rem;
  user-select: none;
  cursor: pointer;
  transition-property: transform;
  transition-duration: 200ms;
  box-shadow: rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;

  :hover {
    transform: translateY(-0.125rem);
  }

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