export const pluck = (elements, fields) => {
    return elements.map((element) => element[fields]);
}