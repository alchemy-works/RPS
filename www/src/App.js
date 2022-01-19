import { GAME_TYPE, PAGE_TYPE, WINNING_PROBABILITY } from './constants.js'
import Start from './Start.js'
import Setting from './Setting.js'
import Gaming from './Gaming.js'
import { getCurrentRoutePage, gotoRoutePage } from './router.js'

export default {
    template: `
      <div>
      <Start v-if="page === PAGE_TYPE.START"
             @play="handlePlay"/>
      <Gaming v-if="page === PAGE_TYPE.GAMING" :gameType="type"/>
      <Setting v-if="page === PAGE_TYPE.SETTING"
               :setting="setting"
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
    mounted() {
        window.addEventListener('popstate', () => {
            this.page = getCurrentRoutePage()
        })
        this.page = getCurrentRoutePage()
    },
    methods: {
        handlePlay(gameType) {
            this.type = gameType
            gotoRoutePage(PAGE_TYPE.GAMING)
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