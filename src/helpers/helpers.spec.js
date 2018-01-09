import * as service from './api';
import { generateStreamLink } from '../data/wowza';

if (!global.fetch) {
  global.fetch = require('node-fetch'); // eslint-disable-line global-require
}
jest.setTimeout(30000);

describe('Hlwint API Service', () => {
  let data;
  let liveList;
  beforeEach(async () => {
    const currentUser = {
      firstName: 'Ko',
      lastName: 'Kyaw',
      gender: 'male',
      dateOfBirth: null,
      email: null,
      phoneNumber: '08',
      profilePic: 'https://graph.facebook.com/367599367030660/picture?type=large',
      facebookId: '367599367030660',
    };
    data = await service.facebookLogin(
      currentUser.firstName,
      currentUser.lastName,
      currentUser.dateOfBirth,
      currentUser.gender,
      currentUser.email,
      currentUser.phoneNumber,
      currentUser.profilePic,
      currentUser.facebookId,
    );
  });
  it('have a correct login service', async () => {
    const blob = await data.json();
    expect(data.status).toEqual(200);
    expect(blob.message).toEqual('success');
    expect(blob).toMatchSnapshot();
  });
  it('have correct data', async () => {
    const blob = await data.json();
    expect(blob.data.u_token.length).toBeGreaterThan(0);
  });

  it('able to upload last device', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const lastDevice = 'android test';
    const deviceOS = 'android';
    const uploadDeviceService = await service.uploadLastDevice(id, lastDevice, deviceOS, u_token);
    const uploadDeviceData = await uploadDeviceService.json();
    expect(uploadDeviceData.message).toEqual('success');
    expect(uploadDeviceService.status).toEqual(200);
    expect(uploadDeviceData).toMatchSnapshot();
  });

  it('able to input task to task log', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const type = 'API_TEST';
    const parameter = null;
    const sendTask = await service.sendTask(id, type, parameter, u_token);
    const sendTaskData = await sendTask.json();
    expect(sendTask.status).toEqual(200);
    expect(sendTaskData.message).toEqual('success');
    expect(sendTaskData).toMatchSnapshot();
  });

  it('able to retrieve live data', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const liveRetrieveData = await service.liveDataRetrieval(id, u_token);
    expect(liveRetrieveData.message).toEqual('success');
    expect(liveRetrieveData).toMatchSnapshot();
    expect(liveRetrieveData.live_lists).toMatchSnapshot();
    liveList = liveRetrieveData;
  });

  it('able to get Broadcast Detail', async () => {
    if (liveList.length === 0) {
      console.warn("Can't test broadcast detail, no available broadcast");
      return;
    }
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const userStream = liveList.live_lists[0];
    const broadcastDetailData = await service.getBroadcastDetail(id, u_token, userStream.id);
    const { hash, b_user_id } = broadcastDetailData.data;
    console.log(generateStreamLink(hash, b_user_id));
    expect(broadcastDetailData).toMatchSnapshot();
  });

  it('able to create broadcast', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const title = 'test title';
    const tags = JSON.stringify({ tags: [{ id: 1 }, { id: 2 }] });
    const createBroadcastData = await service.initBroadcast(id, u_token, title, tags);
    expect(createBroadcastData).toMatchSnapshot();
    expect(createBroadcastData.message).toEqual('success');
  });

  it('able to end broadcast', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const destroyBroadcastData = await service.endBroadcast(id, u_token);
    expect(destroyBroadcastData).toMatchSnapshot();
    expect(destroyBroadcastData.message).toEqual('success');
  });

  it('able to get server info', async () => {
    const serverInfoData = await service.getServerInfo();
    expect(serverInfoData).toMatchSnapshot();
  });

  it('able to get list of gift', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const giftInfoData = await service.getGiftList(id, u_token);
    expect(giftInfoData).toMatchSnapshot();
  });
});
