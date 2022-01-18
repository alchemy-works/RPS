import { GAME_TYPE, RESULT_TYPE, RPS } from './constants.js'

export function getRoundResult(player, opponent) {
    if (!player || !opponent) {
        return ''
    }
    if (player === opponent) {
        return RESULT_TYPE.DRAW
    }
    if ((opponent === RPS.ROCK && player === RPS.PAPER)
        || (opponent === RPS.PAPER && player === RPS.SCISSORS)
        || (opponent === RPS.SCISSORS && player === RPS.ROCK)) {
        return RESULT_TYPE.WIN
    }
    return RESULT_TYPE.LOST
}

export function getRoundResultText(result) {
    switch (result) {
        case RESULT_TYPE.WIN:
            return '这轮你赢了'
        case RESULT_TYPE.LOST:
            return '这轮你输了'
        case RESULT_TYPE.DRAW:
            return '这轮是平局'
        default:
            return ''
    }
}

export function getGameResultText(win, lose, type) {
    switch (type) {
        case GAME_TYPE.THREE:
            if (win >= 2) {
                return '你赢了！'
            } else if (lose >= 2) {
                return '你输了！'
            } else {
                return ''
            }
        case GAME_TYPE.FIVE:
            if (win >= 3) {
                return '你赢了！'
            } else if (lose >= 3) {
                return '你输了！'
            } else {
                return ''
            }
        default:
            return ''
    }
}