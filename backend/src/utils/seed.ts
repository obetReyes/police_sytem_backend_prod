import { faker } from "@faker-js/faker";
import { User, Group, Role, Report, Summary } from "@prisma/client";
import { prisma } from "./prisma.service.utils";

export function seed() {

const  generateCuip = async() => {
    const randomWords = faker.lorem.words(10); // Generate 10 random words
    const maxLength = 25;
    const randomString = randomWords.split("").slice(0, maxLength).join(" "); // Join the words and limit the length
    const cuip = randomString.replace(/\s/g, ""); // Remove all  
    return cuip;
};

//groups
const groupsSeed = async() => {
    
    const groups = await prisma.group.createMany({
        data:[
            {
            name:"grupo 1",
            area:"zacatal y san jose viejo"
            },
            {
            name:"grupo 2",
            area:"san bernabe y las veredas"
            },
            {
            name:"grupo 3",
            area:"oasis y santa anita"
            },
            {
            name:"grupo 4",
            area:"centro y chamizal"
            },
            {
            name:"grupo 5",
            area:"rosarito y la pablo"
            }
        ]
    });    
    return groups;
};

//officers
const officersSeed = async() => {
    const groups = await prisma.group.findMany();
for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * groups.length);
    const officers = await prisma.user.create({
        data:{
            name: faker.internet.userName(),
            cuip: await generateCuip(),
            password: faker.internet.password(),
            role: Role.OFFICER,
            group: {
                connect: { id: groups[randomIndex].id },
            },
        }
    });
}
};

//dispatchers
const dispatchersSeed = async() => {
for (let i = 0; i < 30; i++) {
    const dispatchers = await prisma.user.create({
        data:{
            name: faker.internet.userName(),
            cuip: await generateCuip(),
            password: faker.internet.password(),
            role: Role.DISPATCHER,
        }
    });
}
};

//reports
const reportsSeed = async() => {
    const  users = await prisma.user.findMany({
        where:{
            role:"OFFICER"
        }
    });
for (let i = 0; i < 900; i++) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const reports = await prisma.report.create({
        data:{
            event:faker.random.words(15),
            actions: faker.random.words(20),
            summary:faker.random.words(25),
            user: {
                connect: { id: users[randomIndex].id },
            },
        }
    });
}
};
//summaries
const summariesSeed = async() => {
    const  users = await prisma.user.findMany({
        where:{
            role:"DISPATCHER"
        }
    });
    for (let i = 0; i < 1200; i++){
        const randomIndex = Math.floor(Math.random() * users.length);
        const summaries = await prisma.summary.create({
            data:{
                callTime: `${faker.random.numeric(2)} minutos y ${faker.random.numeric(2)} segundos `,
                incident:faker.random.words(10),
                location: faker.random.words(5),
                notes:faker.random.words(10),
                phone:faker.phone.number(),
                requestor:faker.internet.userName(),
                user:{
                    connect:{ id: users[randomIndex].id },
                }
            }          
        });
    }
};
    groupsSeed();
    officersSeed();
    dispatchersSeed();
    reportsSeed();
    summariesSeed();

}