export function compareData(fristElement, secondElement, toggle) {
    let toggleValue = toggle ? 1 : -1;

    if (fristElement > secondElement) {
        return toggleValue * 1;
    }

    if (fristElement < secondElement) {
        return toggleValue * -1;
    }

    return 0;
}

export function generateActionPayload(type, payload) {
    return { type: type, payload: payload };
}