// import {rue} from "./../data/rue";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        username: "admin1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$Frg8wLmTswn7kLTnZE0jBQ$qFsH1qZYYcxMcIWyaGVVHGxiP1LW3cVtkeQ7ruJL+NI",
        isAdmin: true,
      },
      {
        username: "admin2",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$pQhjdWUyRWAtQ0O1vrEhgQ$jO4lAKGmFhBHNLXf7mN5NuRvfc1V/zFYCxvvFZ8fSWQ",
        isAdmin: true,
      },
      {
        username: "user1",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$umgF6NtDxjnCrwvQs9njCA$3mwQEhTYtlNzZT3LudEPOyuTc8Zg/OgEoU2xO4gBLoI",
      },
      {
        username: "user2",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$lO7/Z3/A+3yFfEyFrE4Gww$j1c2+GYbwaGYV1oJxEyVYB04PbEtsklg2OB/C4eNaHQ",
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
