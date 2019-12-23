import { CALL_API } from '../middleware/api';

export const getPublisherApplication = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/applicationBySearch',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["GETAPPBYPUBLISHERID_REQUEST", "GETAPPBYPUBLISHERID_SUCCESS", "GETAPPBYPUBLISHERID_FAILURE"],
      }
    };
  };

  export const getAPPMonetization = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/getAppMonetisation',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["GETAPPMONETIZATION_REQUEST", "GETAPPMONETIZATION_SUCCESS", "GETAPPMONETIZATION_FAILURE"],
      }
    };
  };

  export const AddAppMonetization = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/insertAppMonetisation',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["INSERTAPPMONETIZATION_REQUEST", "INSERTAPPMONETIZATION_SUCCESS", "INSERTAPPMONETIZATION_FAILURE"],
      }
    };
  };

  export const updateAppMonetization = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/updateAppMonetisation',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["UPDATEAPPMONETIZATION_REQUEST", "UPDATEAPPMONETIZATION_SUCCESS", "UPDATEAPPMONETIZATION_FAILURE"],
      }
    };
  };

  
  

  