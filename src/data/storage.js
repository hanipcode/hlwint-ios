import { AsyncStorage } from 'react-native';

const USER_DATA_KEY = 'USER_DATA';
const USER_DATA_PICTURE_KEY = 'USER_DATA_PICTURE_KEY';
const TOKEN_DATA_KEY = 'TOKEN_DATA';
const PROMO_DATA_KEY = 'PROMO_DATA';
const SERVER_DATA_KEY = 'SERVER_DATA';

export default class Storage {
  static async setUser(userData) {
    try {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
      throw new Error('Error While Saving User Data');
    }
  }
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
}
