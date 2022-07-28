import { prisma } from "../src/database.js";

async function main() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY;`
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
    await prisma.recommendation.upsert({
        where: { name: "minus5likes" },
        update: {},
        create: {
            name: "minus4likes",
            youtubeLink: "https://www.youtube.com/watch?v=d-tx9D4a8dc",
            score: -5
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test3" },
        update: {},
        create: {
            name: "test3",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 25
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test4" },
        update: {},
        create: {
            name: "test4",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 2
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test5" },
        update: {},
        create: {
            name: "test5",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ"
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test6" },
        update: {},
        create: {
            name: "test6",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ"
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test7" },
        update: {},
        create: {
            name: "test7",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 48
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test8" },
        update: {},
        create: {
            name: "test8",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 25
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test9" },
        update: {},
        create: {
            name: "test9",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 25
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test10" },
        update: {},
        create: {
            name: "test10",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 1234
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test11" },
        update: {},
        create: {
            name: "test11",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 250
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test12" },
        update: {},
        create: {
            name: "test12",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ",
            score: 8
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test13" },
        update: {},
        create: {
            name: "test13",
            youtubeLink: "https://www.youtube.com/watch?v=3pKsxtzfVbQ"
        }
    });
    await prisma.recommendation.upsert({
        where: { name: "test14" },
        update: {},
        create: {
            name: "test14",
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