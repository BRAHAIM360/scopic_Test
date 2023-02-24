// import {rue} from "./../data/rue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // prisma.user.createMany({
  //   data: [
  //     {
  //       username: "admin1",
  //       password: "password",
  //     },
  //     {
  //       username: "admin2",
  //       password: "password",
  //     },]
  // )};
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
