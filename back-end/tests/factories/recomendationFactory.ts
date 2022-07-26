import { faker } from "@faker-js/faker";

export default function createRecommendation() {
    const recommendation = {
        name: faker.music.songName(),
        youtubeLink: "https://www.youtube.com/watch?v=mrOWDPkYyP0"
    }

    return recommendation;
}