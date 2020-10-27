import MemberModel from '../src/modules/models/member';

function main() {
  const member = new MemberModel();
  member.register('Charlotte', 'charlotte@de.witte', 'password').then((m) => {
    console.log('Member created!');
    console.log(m);
  });
}
main();
