import Fetch from 'common-utils/fetch';
import { PROFILE } from 'common-constant/api';

const authService = {
  profile() {
    return Fetch.get(PROFILE);
  }
};

export default authService;
