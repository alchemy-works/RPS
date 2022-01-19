import { PAGE_TYPE } from './constants.js'

function toHash(page = '') {
    return '#/' + page.toLowerCase()
}

export function getCurrentRoutePage() {
    const url = new URL(location.href)
    switch (url.hash) {
        case toHash(PAGE_TYPE.GAMING):
            return PAGE_TYPE.GAMING
        case  toHash(PAGE_TYPE.SETTING):
            return PAGE_TYPE.SETTING
        case toHash(PAGE_TYPE.START):
        default:
            return PAGE_TYPE.START
    }
}

export function gotoRoutePage(page = '') {
    const url = new URL(location.href)
    url.hash = toHash(page)
    location.href = url.toString()
}
