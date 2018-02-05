import * as service from './api';
import { generateStreamLink } from '../data/wowza';

if (!global.fetch) {
  global.fetch = require('node-fetch'); // eslint-disable-line global-require
}
jest.setTimeout(100000);

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

  it('able to get current user profile', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const getProfileData = await service.getUserProfile(id, u_token);
    expect(getProfileData.message).toEqual('success');
    expect(getProfileData).toMatchSnapshot();
  });

  it('able to follow user', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const doFollowUser = await service.addOrRemoveFollowing(id, u_token, 43);
    expect(doFollowUser.message).toMatch(/success/);
    expect(doFollowUser).toMatchSnapshot();
  });

  it('ablle to get user following', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const userFollowing = await service.getUserFollowing(id, u_token);
    expect(userFollowing.message).toEqual('success');
    expect(userFollowing).toMatchSnapshot();
  });

  it('able to get user follower', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const userFollower = await service.getUserFollower(id, u_token);
    expect(userFollower.message).toEqual('success');
    expect(userFollower).toMatchSnapshot();
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

  it('able to get explore data', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const exploreData = await service.getExploreData(id, u_token);
    expect(exploreData.message).toEqual('success');
    expect(exploreData).toMatchSnapshot();
  });

  it('able to get Top Ranked user', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const topRankData = await service.getTopRankData(id, u_token, 10, 10);
    expect(topRankData.message).toEqual('success');
    expect(topRankData).toMatchSnapshot();
  });

  it('able to get nearby user', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const nearbyData = await service.getNearbyData(id, u_token, 10, 10);
    expect(nearbyData.message).toEqual('success');
    expect(nearbyData).toMatchSnapshot();
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

  it('able to list tags', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const tagList = await service.getTagList(id, u_token);
    expect(tagList.message).toEqual('success');
    expect(tagList).toMatchSnapshot();
  });

  it('able to create tag', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const createTagData = await service.createTag(id, u_token, 'TESTAG');
    expect(createTagData.message).toEqual('success');
    expect(createTagData).toMatchSnapshot();
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

  it('able to get stream by used tags', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const streamByTags = await service.getStreamByTags(id, u_token, 1);
    expect(streamByTags.message).toEqual('success');
    expect(streamByTags).toMatchSnapshot();
  });

  it('able to join stream', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const joinData = await service.joinLive(id, u_token, id);
    expect(joinData).toMatchSnapshot();
    expect(joinData.message).toEqual('success');
  });
  it('able to get viewer list', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const viewerListData = await service.getViewerList(id);
    expect(viewerListData).toMatchSnapshot();
    expect(viewerListData.message).toEqual('success');
  });
  it('able to send gift', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const sendCashData = await service.sendGift(id, u_token, id, 43, 37, 9, 100000);
    expect(sendCashData).toMatchSnapshot();
    expect(sendCashData.message).toEqual('success');
  });
  it('able to get viewer ended', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const viewerEndedData = await service.getViewerLiveEnded(id, u_token, id);
    expect(viewerEndedData).toMatchSnapshot();
    expect(viewerEndedData.message).toEqual('success');
  });
  it('able to leave the stream', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const leaveStreamData = await service.leaveLive(id, u_token, id);
    expect(leaveStreamData).toMatchSnapshot();
    expect(leaveStreamData.message).toEqual('success');
  });
  it('able to modify end time', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const modifyEndTime = await service.updateBroadcastEndtime(id);
    expect(modifyEndTime.message).toEqual('success');
    expect(modifyEndTime).toMatchSnapshot();
  });
  it('able to get broadcaster ended data', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const broadcasterEndedData = await service.getBroadcasterLiveEnded(id, u_token);
    expect(broadcasterEndedData).toMatchSnapshot();
    expect(broadcasterEndedData.message).toEqual('success');
  });

  it('able to end broadcast', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const destroyBroadcastData = await service.endBroadcast(id, u_token);
    expect(destroyBroadcastData).toMatchSnapshot();
    expect(destroyBroadcastData.message).toEqual('success');
  });

  it('able to get top fan', async () => {
    const blob = await data.json();
    const { id, u_token } = blob.data;
    const topFanData = await service.getTopFan(id);
    expect(topFanData).toMatchSnapshot();
    expect(topFanData.message).toEqual('success');
  }
  /* DIsable for testing because very resourceful */
  // it('able to get server info', async () => {
  //   const serverInfoData = await service.getServerInfo();
  //   expect(serverInfoData).toMatchSnapshot();
  // });

  // it('able to get list of gift', async () => {
  //   const blob = await data.json();
  //   const { id, u_token } = blob.data;
  //   const giftInfoData = await service.getGiftList(id, u_token);
  //   expect(giftInfoData).toMatchSnapshot();
  // });
});
