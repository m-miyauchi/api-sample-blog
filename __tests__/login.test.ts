import axios, { AxiosResponse } from 'axios';
import { PutLoginParams } from '../src/types/api/put_login_params';
import { PutLoginResponse } from '../src/types/api/put_login_response';
// constants
import { SERVER_PORT } from '../src/constants/server_port';

describe('ログイン', () => {
  test('login', async () => {
    const params: PutLoginParams = {
      email: 'charlotte@de.witte',
      password: 'password',
    };

    const r: AxiosResponse<PutLoginResponse> = await axios.post(
      `http://127.0.0.1:${SERVER_PORT}/login`,
      params
    );
    console.log(r);
    expect(r.data.isSuccessLogin).toBeTruthy();
  });
});
