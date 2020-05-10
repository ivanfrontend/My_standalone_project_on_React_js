export const required = value => {
    if(value) return undefined
    return 'Поле не может быть пустым'
}


export const maxLenght = (maxLength) => (value) => {
    if(value.length > maxLength) return `максимальная длиной ${maxLength} символов`
    return undefined
}

