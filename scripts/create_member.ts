import MemberModel from '../src/modules/models/member';
import createDbConnection from '../src/modules/create_db_connection';

async function main() {
  await createDbConnection();
  const member = new MemberModel();
  // パラメータを任意に変えて実行
  member.register('Charlotte', 'charlotte@de.witte', 'password').then((m) => {
    console.log('Member created!');
    console.log(m);
  });
}
main();
