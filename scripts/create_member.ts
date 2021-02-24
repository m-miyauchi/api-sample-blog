import MemberModel from '../src/modules/models/member';
import createDbConnection from '../src/modules/create_db_connection';

async function main() {
  await createDbConnection();
  const member = new MemberModel();
  try {
    // パラメータを任意に変えて実行
    await member.register('Charlotte', 'charlotte@de.witte', 'password');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(9);
}
main();
