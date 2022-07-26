import { prisma } from "../src/database.js";

async function main() {
    await prisma.recommendation.upsert({
        where: { name: "test1" },
        update: {},
        create: {
            name: "test1",
            youtubeLink: "https://www.youtube.com/watch?v=d-tx9D4a8dc"
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test2" },
        update: {},
        create: {
            name: "test2",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ"
        }
    });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
})