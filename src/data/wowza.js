import _ from 'lodash';
import * as service from '../helpers/api';

export const WOWZA_HOST_OLD = '52.221.111.204';
export const WOWZA_HOST = '43.243.203.165';
export const WOWZA_PORT = '1935';
export const WOWZA_USERNAME = 'shwejogja';
export const WOWZA_PASSWORD = 'asxz4521';
export const WOWZA_APPLICATION = 'live';

// export function getWowzaIdList() {
//   return fetch(
//     'http://52.221.111.204:8087/v2/servers/_defaultServer_/vhosts/_defaultVHost_/applications/live/instances',
//     {
//       headers: {
//         Accept: 'application/json',
//       },
//     },
//   )
//     .then(response => response.json())
//     .then((data) => {
//       const { instanceList } = data;
//       const current = instanceList[0];
//       const { incomingStreams } = current;
//       const filtered = _.filter(incomingStreams, stream => !/local\s/.test(stream.sourceIp));
//       return _.map(filtered, streamInfo => ({
//         id: parseInt(streamInfo.name.split('-')[1], 10),
//         streamName: streamInfo.name,
//       }));
//     });
// }

export function generateStreamLink(serverInfo, streamName) {
  const { ip_address } = serverInfo;
  return `http://${ip_address}/${WOWZA_APPLICATION}/ngrp:${streamName}_all/playlist.m3u8`;
}
