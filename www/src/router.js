import { PAGE_TYPE } from './constants.js'

export function getRoutePage() {
    const url = new URL(location.href)
    switch (url.hash) {
        case '#/' + PAGE_TYPE.GAMING.toLowerCase():
            return PAGE_TYPE.GAMING
        case  '#/' + PAGE_TYPE.SETTING.toLowerCase():
            return PAGE_TYPE.SETTING
        case  '#/' + PAGE_TYPE.START.toLowerCase():
        default:
            return PAGE_TYPE.START
    }
}

export function gotoRouterPage(page = '') {
    const url = new URL(location.href)
    url.hash = '#/' + page.toLowerCase()
    location.href = url.toString()

}