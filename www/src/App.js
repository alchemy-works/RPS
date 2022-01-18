import { GAME_TYPE, PAGE_TYPE, WINNING_PROBABILITY } from './constants.js'
import Start from './Start.js'
import Setting from './Setting.js'
import Gaming from './Gaming.js'

export default {
    template: `
      <div>
      <Start v-if="page === PAGE_TYPE.START"
             @play="handlePlay"
             @setting="handleSetting"/>
      <Gaming v-if="page === PAGE_TYPE.GAMING" :gameType="type" @back="handleBack"/>
      <Setting v-if="page === PAGE_TYPE.SETTING"
               :setting="setting"
               @back="handleBack"
               @change="handleSettingChange"/>
      </div>
    `,
    data() {
        return {
            page: PAGE_TYPE.START,
            type: GAME_TYPE.FIVE,
            setting: {
                winningProbability: WINNING_PROBABILITY.NORMAL
            },
        }
    },
    computed: {
        PAGE_TYPE: () => PAGE_TYPE,
    },
    methods: {
        handlePlay(gameType) {
            this.page = PAGE_TYPE.GAMING
            this.type = gameType
        },
        handleBack() {
            this.page = PAGE_TYPE.START
        },
        handleSetting() {
            this.page = PAGE_TYPE.SETTING
        },
        handleSettingChange(ev) {
            this.setting = ev
        },
    },
    components: {
        Start,
        Setting,
        Gaming,
    },
}