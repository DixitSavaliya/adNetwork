import { CALL_API } from '../middleware/api';

export const getPublisherApplication = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Application/insertApplication',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["CREATEAPP_REQUEST", "CREATEAPP_SUCCESS", "CREATEAPP_FAILURE"],
      }
    };
  };

 