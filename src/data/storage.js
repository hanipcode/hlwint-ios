import { AsyncStorage } from 'react-native';

const USER_DATA_KEY = 'USER_DATA';
const USER_DATA_PICTURE_KEY = 'USER_DATA_PICTURE_KEY';
const TOKEN_DATA_KEY = 'TOKEN_DATA';
const PROMO_DATA_KEY = 'PROMO_DATA';
const SERVER_DATA_KEY = 'SERVER_DATA';
const GIFT_LIST_KEY = 'GIFT_LIST';

export default class Storage {
  static async setUser(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      throw new Error('Error While Saving User Data');
    }
  }
  //  user data content = {
  //   "bot": 0,
  //   "data_usage": null,
  //   "id": 384,
  //   "u_account_status": "active",
  //   "u_biography": null,
  //   "u_city": "Pathein",
  //   "u_coins": 3540,
  //   "u_created_time": "2017-11-13 15:36:22",
  //   "u_date_of_birth": "null",
  //   "u_device_os": "android",
  //   "u_duration": "00:00:00",
  //   "u_email": "null",
  //   "u_facebook_id": "367599367030660",
  //   "u_fan_count": 0,
  //   "u_first_name": "Ko",
  //   "u_follower_count": 0,
  //   "u_full_name": "Ko Kyaw",
  //   "u_gender": "female",
  //   "u_google_id": "null",
  //   "u_income": 0,
  //   "u_ip_address": "119.2.52.244",
  //   "u_key_id": "91600",
  //   "u_larger_profile_pic": null,
  //   "u_last_device": "android test",
  //   "u_last_login_time": "2017-12-13 10:57:33",
  //   "u_last_name": "Kyaw",
  //   "u_nick_name": "ko384",
  //   "u_phone_number": "09",
  //   "u_profile_pic": "https://graph.facebook.com/367599367030660/picture?type=large",
  //   "u_reward_status": 0,
  //   "u_token": "P8HuQaRkHV0j7hKEWvXuP60XYycrqj9IQUBIWLrUVlUbhPys0EEvFMmpnoam",
  //   "u_type": 1,
  // }
  static async getUser() {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return JSON.parse(userData);
    } catch (error) {
      throw new Error('Error While Getting User Data');
    }
  }
  static async setUserPicture(url) {
    try {
      await AsyncStorage.setItem(USER_DATA_PICTURE_KEY, url);
    } catch (error) {
      throw new Error('Error While Setting User Picture');
    }
  }
  static async getUserPicture() {
    try {
      const userPicture = await AsyncStorage.getItem(USER_DATA_PICTURE_KEY);
      return userPicture;
    } catch (error) {
      throw new Error('Error while getting user picture');
    }
  }
  static async setToken(token) {
    try {
      await AsyncStorage.setItem(TOKEN_DATA_KEY, token);
    } catch (error) {
      throw new Error('Error While Saving Token');
    }
  }

  static async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem(TOKEN_DATA_KEY);
      return accessToken;
    } catch (error) {
      throw new Error('Error While getting Token');
    }
  }
  static async setPromoStatus(promotionStatus) {
    try {
      await AsyncStorage.setItem(PROMO_DATA_KEY, promotionStatus);
    } catch (error) {
      throw new Error('Error While Setting Promotion Status');
    }
  }
  static async getPromoStatus() {
    try {
      const promotionData = await AsyncStorage.getItem(PROMO_DATA_KEY);
      return promotionData;
    } catch (error) {
      throw new Error('Error While Getting Promotion Status');
    }
  }
  static async setServerInfo(serverInfo) {
    try {
      await AsyncStorage.setItem(SERVER_DATA_KEY, JSON.stringify(serverInfo));
    } catch (error) {
      throw new Error('Error while setting server info');
    }
  }
  static async getServerInfo() {
    try {
      const serverData = await AsyncStorage.getItem(SERVER_DATA_KEY);
      return JSON.parse(serverData);
    } catch (error) {
      throw new Error('Error while getting server info');
    }
  }
  /* Unused  */
  static async setGiftList(giftList) {
    try {
      await AsyncStorage.setItem(GIFT_LIST_KEY, JSON.stringify(giftList));
    } catch (error) {
      throw new Error('Error while setting gift list');
    }
  }
  /* Unused  */
  static async getGiftList() {
    try {
      const giftList = await AsyncStorage.getItem(GIFT_LIST_KEY);
      return JSON.parse(giftList);
    } catch (error) {
      throw new Error('Error while setting gift list');
    }
  }
}
