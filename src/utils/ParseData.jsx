function parseTime(time) {
    const date = new Date(time)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const result = `${hours}:${minutes}`
    return result
}

export default parseTime