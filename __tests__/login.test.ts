import axios, { AxiosResponse } from 'axios';
import { PutLoginParams } from '../src/types/api/put_login_params';
import { PutLoginResponse } from '../src/types/api/put_login_response';
import { PutLogoutResponse } from '../src/types/api/put_logout_response';
// constants
import { SERVER_PORT } from '../src/constants/server_port';

describe('ログイン・ログアウト', () => {
  let authToken: string;
  test('ログイン正常系', async () => {
    const params: PutLoginParams = {
      email: 'charlotte@de.witte',
      password: 'password',
    };

    const r: AxiosResponse<PutLoginResponse> = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/login`,
      params
    );
    authToken = r.data.token;
    expect(r.data.isSuccessLogin).toBeTruthy();
  });

  test('ログアウト正常系', async () => {
    const r: AxiosResponse<PutLogoutResponse> = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/logout`,
      {},
      {
        headers: {
          auth: authToken,
        },
      }
    );
    expect(r.status).toBe(204);
  });
});
