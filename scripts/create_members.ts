import faker from 'faker';
import MemberModel from '../src/modules/models/member';
import createDbConnection from '../src/modules/create_db_connection';

async function createMember() {
  const member = new MemberModel();

  const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  const email = `${faker.internet.email}`;
  const password = `${faker.internet.password}`;

  await member.register(name, email, password);
}

async function main() {
  await createDbConnection();
  await createMember();
}
main();
