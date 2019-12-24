import { CALL_API } from '../middleware/api';
import * as ACTION from '../constants/auth';

export const login = (auth) => {
  return {
    [CALL_API]: {
      endpoint: 'User/getAuthTokens',
      init: {
        method: 'POST',
        body: JSON.stringify(auth),
      },
      types: [
        ACTION.LOGIN_REQUEST,
        ACTION.LOGIN_SUCCESS,
        ACTION.LOGIN_FAILURE,
      ],
    }
  };
};

export const register = (info) => {
  return {
    [CALL_API]: {
      endpoint: 'AP/registerUsers',
      init: {
        method: 'POST',
        body: JSON.stringify(info),
      },
      types: [
        ACTION.REGISTER_REQUEST,
        ACTION.REGISTER_SUCCESS,
        ACTION.REGISTER_FAILURE,
      ],
    }
  };
};


export const ForgotPassword = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'User/forgotPassword',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["FORGOTPASSWORD_REQUEST", "FORGOTPASSWORD_SUCCESS", "FORGOTPASSWORD_FAILURE"],
    }
  };
};


export const changepassword = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'User/changePassword',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["CHANGEPASSWORD_REQUEST", "CHANGEPASSWORD_SUCCESS", "CHANGEPASSWORD_FAILURE"],
    }
  };
};


export const getUser = (id) => {
  return {
    [CALL_API]: {
      endpoint: 'User/currentUser',
      init: {
        method: 'POST',
        body: JSON.stringify({id: id}),
      },
      types: ["PROFILE_REQUEST", "PROFILE_SUCCESS", "PROFILE_FAILURE"],
    }
  };
};

export const avatarUpload = (data) => {
  console.log("avatarUpload data", data)
  return {
    [CALL_API]: {
      endpoint: 'User/uploadUserImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["AVATAR_REQUEST", "AVATAR_SUCCESS", "AVATAR_FAILURE"],
    }
  };
};

export const updateprofile = (data) => {
  console.log("updateprofile data", data)
  return {
    [CALL_API]: {
      endpoint: 'User/updateUserDetailsById',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["UPDATE_PROFILE_REQUEST", "UPDATE_PROFILE_SUCCESS", "UPDATE_PROFILE_FAILURE"],
    }
  };
};

export const getUserRoleId = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'UserRole/searchUserRole',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["SEARCHUSERROLEID_REQUEST", "SEARCHUSERROLEID_SUCCESS", "SEARCHUSERROLEID_FAILURE"],
    }
  };
};


export const removeImage = (data) => {
  return {
    [CALL_API]: {
      endpoint: 'User/removeUserImage',
      init: {
        method: 'POST',
        body: JSON.stringify(data),
      },
      types: ["REMOVEUSERIMAGE_REQUEST", "REMOVEUSERIMAGE_SUCCESS", "REMOVEUSERIMAGE_FAILURE"],
    }
  };
};

export const updateProfileData = () => {
  return {
    types: ["UPDATEPROFILE"]
  };
};





export const logout = () => {
  return {
    [CALL_API]: {
      endpoint: '/auth/logout',
      init: {
        method: 'GET',
      },
      types: [
        ACTION.LOGOUT_REQUEST,
        ACTION.LOGOUT_SUCCESS,
        ACTION.LOGOUT_FAILURE,
      ],
    }
  };
};
