import * as service from '../helpers/api';

export const WOWZA_HOST_OLD = '52.221.111.204';
export const WOWZA_HOST = '43.243.203.165';
export const WOWZA_PORT = '1935';
export const WOWZA_USERNAME = 'shwejogja';
export const WOWZA_PASSWORD = 'asxz4521';
export const WOWZA_APPLICATION = 'live';

export function generateStreamLink(serverInfo, hash, broadcasterId) {
  const { ip_address } = serverInfo;
  return `http://${ip_address}:${WOWZA_PORT}/${WOWZA_APPLICATION}/ngrp:${hash}-${broadcasterId}_all/playlist.m3u8`;
}
