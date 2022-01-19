import { css } from './modules.js'

const _Select = css`
  min-width: 5rem;
  background-color: #fff;
  border: 1px solid #111;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1rem;
  padding: .125rem .25rem;
`

export default {
    template: `
      <select class="${_Select}" :value="value" @change="$emit('change', $event.target.value)">
      <option v-for="it of options" :key="it.value" :value="it.value">
        {{ it.label }}
      </option>
      </select>
    `,
    props: {
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
}