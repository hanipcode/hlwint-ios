// first_name
// last_name
// date_of_birth
// gender
// email
// phone_number
// profile_pic
// city
// facebook_id

const BASE_URL = 'https://dashboard.imliveapp.com/';

const defaultHeaders = {
  Authorization: 'Basic dXNlcjpwYXNzd29yZA==',
  'Content-Type': 'application/json',
};
export function facebookLogin(
  firstName,
  lastName,
  dateOfBirth,
  gender,
  email,
  phoneNumber,
  profilePic,
  facebookId,
) {
  return fetch(`${BASE_URL}api/ml/fblogin`, {
    method: 'POST',
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      gender,
      email,
      phone_number: phoneNumber,
      profile_pic: profilePic,
      facebook_id: facebookId,
      google_id: 'null',
    }),
    headers: defaultHeaders,
  });
}

/* eslint-disable*/
export function googleLogin(
  firstName,
  lastName,
  dateOfBirth,
  gender,
  email,
  phoneNumber,
  profilePic,
  googleId,
) {}
/* eslint-enable */

export function uploadLastDevice(id, lastDevice, deviceOS, accessToken) {
  return fetch(`${BASE_URL}api/ml/fblogin/device`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      last_device: lastDevice,
      device_os: deviceOS,
      u_token: accessToken,
    }),
    headers: defaultHeaders,
  });
}

export function getUserProfile(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/userprofile`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting current user profile ${response.status}`);
    }
    return response.json();
  });
}

export function getOtherUserProfile(id, accessToken, targetId) {
  return fetch(`${BASE_URL}api/ml/otherprofile`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      other_id: targetId,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting other user profile ${response.status}`);
    }
    return response.json();
  });
}

export function getUserFollowing(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/getfollowing`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting user following ${response.status}`);
    }
    return response.json();
  });
}

export function getUserFollower(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/getfollowers`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting user follower ${response.status}`);
    }
    return response.json();
  });
}

export function addOrRemoveFollowing(id, accessToken, targetId, param) {
  return fetch(`${BASE_URL}api/ml/following`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      other_id: targetId,
      param,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while add or remove follower ${response.status}`);
    }
    return response.json();
  });
}

export function sendTask(id, type, parameter, accessToken) {
  return fetch(`${BASE_URL}api/ml/tasklogs`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      type,
      parameter,
      u_token: accessToken,
    }),
    headers: defaultHeaders,
  });
}

export function liveDataRetrieval(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/livedataretrieval`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error Fetch Data Server Response Code${response.status}`);
    }
    return response.json();
  });
}

export function getBroadcastDetail(id, accessToken, broadcasterId) {
  return fetch(`${BASE_URL}api/ml/checkbroadcast`, {
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      broadcaster_id: broadcasterId,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error Fetch Broadcast Detail Response Code ${response.status}`);
    }
    return response.json();
  });
}

export function initBroadcast(broadcasterId, accessToken, title, tags) {
  const data = JSON.stringify({
    id: broadcasterId,
    u_token: accessToken,
    // title,
    // tag: tags,
  });
  return fetch('https://dashboard.imliveapp.com/api/ml/broadcast', {
    method: 'POST',
    body: JSON.stringify({
      id: broadcasterId,
      u_token: accessToken,
      title: title || 'untitled stream',
      tag: tags,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      response.text().then(text => console.log('here', text));
      throw new Error(`Error creating broadcast with response code ${
        response.status
      } uid is ${broadcasterId} acctoken is ${accessToken}, ${data}`);
    }
    return response.json();
  });
}

export function endBroadcast(broadcasterId, accessToken) {
  return fetch(`${BASE_URL}api/ml/destroyliveended`, {
    method: 'POST',
    body: JSON.stringify({
      id: broadcasterId,
      u_token: accessToken,
    }),
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error destroying broadcastr with response code ${response.status}`);
    }
    return response.json();
  });
}

export function getServerInfo() {
  return fetch(`${BASE_URL}api/ml/server`, {
    headers: defaultHeaders,
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error Server Info with response code ${response.status}`);
    }
    return response.json();
  });
}

export function getGiftList(id, accessToken) {
  console.log(id, accessToken);
  function fetchItem(type) {
    return fetch(`${BASE_URL}api/ml/giftitem`, {
      headers: defaultHeaders,
      method: 'POST',
      body: JSON.stringify({
        id,
        u_token: accessToken,
        item_type: type,
      }),
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(`Error Server Info with response code ${response.status}`);
      }
      return response.json();
    });
  }
  const items = {};
  return fetchItem('basic')
    .then((basicData) => {
      items.basic = basicData.basic;
    })
    .then(() => fetchItem('hot'))
    .then((hotData) => {
      items.hot = hotData.hot;
    })
    .then(() => fetchItem('premium'))
    .then((premiumData) => {
      items.premium = premiumData.premium;
      return items;
    });
}

export function sendGift(id, accessToken, senderId, receiverId, itemId, itemCount, income) {
  return fetch(`${BASE_URL}api/ml/sendgift`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      sender_id: senderId,
      receiver_id: receiverId,
      item_id: itemId,
      item_quantity: itemCount,
      income,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`ERror while sending gift ${response.status}`);
    }
    return response.json();
  });
}

// fetch('http://dashboard.imliveapp.com/api/ml/fblogin', {method: 'POST', headers: { Authorization: 'Basic dXNlcjpwYXNzd29yZA=='}}).then(data => data.json().then(dat=> console.log(dat)))

export function updateBroadcastEndtime(broadcasterId) {
  return fetch(`${BASE_URL}api/ml/modifyendtime`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      user_id: broadcasterId,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while modify endtime ${response.status}`);
    }
    return response.json();
  });
}
export function getBroadcasterLiveEnded(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/liveended`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting broadcastended response code ${response.status}`);
    }
    return response.json();
  });
}

export function joinLive(id, accessToken, broadcasterId) {
  return fetch(`${BASE_URL}api/ml/streamjoin`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      broadcaster_id: broadcasterId,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while joining stream response code ${response.status}`);
    }
    return response.json();
  });
}

export function leaveLive(id, accessToken, broadcasterId) {
  return fetch(`${BASE_URL}api/ml/streamleave`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      broadcaster_id: broadcasterId,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while leaving stream response code ${response.status}`);
    }
    return response.json();
  });
}

export function getViewerList(id) {
  return fetch(`${BASE_URL}api/ml/getviewers?broadcaster_id=${id}`, {
    headers: defaultHeaders,
    method: 'GET',
  }).then((response) => {
    if (response.status !== 200) {
      // response.text().then(text => console.log('nyooh', text));
      // throw new Error(`Error while getting viewers ${response.status}`);
    }
    return response.json();
  });
}

export function getViewerLiveEnded(id, accessToken, broadcasterId) {
  return fetch(`${BASE_URL}api/ml/viewerended`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      broadcaster_id: broadcasterId,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting viewerended response code ${response.status}`);
    }
    return response.json();
  });
}

export function createTag(id, accessToken, tagName) {
  return fetch(`${BASE_URL}api/ml/createtag`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      tag_name: tagName,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while creating tag ${response.status}`);
    }
    return response.json();
  });
}

export function getTagList(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/tag`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      limit: 30,
      count: 1,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting tags list response code ${response.status}`);
    }
    return response.json();
  });
}

export function getStreamByTags(id, accessToken, tagId) {
  return fetch(`${BASE_URL}api/ml/userusetag`, {
    headers: defaultHeaders,
    method: 'POST',
    body: JSON.stringify({
      id,
      u_token: accessToken,
      tag_id: tagId,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting stream by tags response code ${response.status}`);
    }
    return response.json();
  });
}

export function getExploreData(id, accessToken) {
  return fetch(`${BASE_URL}api/ml/explore`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      id,
      u_token: accessToken,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting explore data ${response.status}`);
    }
    return response.json();
  });
}

export function getTopRankData(id, accessToken, limit, offset) {
  return fetch(`${BASE_URL}api/ml/toprank`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      id,
      u_token: accessToken,
      limit,
      offset,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting top rank data ${response.status}`);
    }
    return response.json();
  });
}

export function getNearbyData(id, accessToken, limit, offset) {
  return fetch(`${BASE_URL}api/ml/nearby`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      id,
      u_token: accessToken,
      limit,
      offset,
    }),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Error while getting nearby data ${response.status}`);
    }
    return response.json();
  });
}
