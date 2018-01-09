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

// fetch('http://dashboard.imliveapp.com/api/ml/fblogin', {method: 'POST', headers: { Authorization: 'Basic dXNlcjpwYXNzd29yZA=='}}).then(data => data.json().then(dat=> console.log(dat)))
