import _ from 'lodash';
import faker from 'faker';

/* eslint-disable */
export function generateLiveList() {
  faker.seed(faker.random.number(100, 150));
  return _(_.range(10))
    .map(() => ({
      id: faker.finance.amount(1, 1000),
      larger_profile_pic: faker.image.people(600, 480),
      last_name: faker.name.lastName(),
      nick_name: faker.internet.userName(),
      profile_pic: faker.internet.avatar(),
      type: 1,
      view_count: faker.finance.amount(30, 2000),
    }))
    .value();
}

/*
 "live_lists": Array [
    Object {
      "first_name": "Ashoka",
      "id": 1314,
      "larger_profile_pic": null,
      "last_name": "Ashoka",
      "nick_name": "ashoka1314",
      "profile_pic": "https://graph.facebook.com/167476340512637/picture?type=large",
      "type": 1,
      "view_count": 11,
    },
  ],
*/
