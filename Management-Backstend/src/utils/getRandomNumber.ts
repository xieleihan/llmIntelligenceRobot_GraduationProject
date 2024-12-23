const getRandomNumber = (minNumber:number, maxNumber:number) => {
    return Math.floor(Math.random()* (maxNumber - minNumber + 1) + minNumber);
}

export default getRandomNumber;