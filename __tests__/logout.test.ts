import axios, { AxiosResponse } from 'axios';
import { PutLogoutResponse } from '../src/types/api/put_logout_response';
// constants
import { SERVER_PORT } from '../src/constants/server_port';

//  ログインのテストのあとに
describe('ログアウト', () => {
  test('logout', async () => {
    const r: AxiosResponse<PutLogoutResponse> = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/logout`, {}, {
        headers: {
          auth: ''
        }
      }
    );
    console.log(r);
    expect(r.data.success).toBeTruthy();
  });
});
