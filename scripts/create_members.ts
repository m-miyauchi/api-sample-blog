import faker from 'faker';
import MemberModel from '../src/modules/models/member';
import createDbConnection from '../src/modules/create_db_connection';

const NUM = 500;

async function createMember() {
  const member = new MemberModel();
  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const email = `${faker.internet.email()}`;
  const password = `${faker.internet.password()}`;

  console.log(name, email, password);

  await member.register(name, email, password);
}

async function main() {
  await createDbConnection();

  for (let index = 0; index < NUM; index++) {
    await createMember();
  }
  process.exit(0);
}
main();
