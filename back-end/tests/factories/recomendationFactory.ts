import { faker } from "@faker-js/faker";

function createRecommendation() {
    const recommendation = {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=mrOWDPkYyP0"
    }

    return recommendation;
}

function getAmount(){
    let min = 2
    let max = 14
    return Math.floor(Math.random() * (max - min) + min);
}

export const factory = {
    getAmount,
    createRecommendation
}