import { CALL_API } from '../middleware/api';

export const sendNotification = (data) => {
    return {
      [CALL_API]: {
        endpoint: 'Notification/sendPushNotification',
        init: {
          method: 'POST',
          body: JSON.stringify(data),
        },
        types: ["SENDPUSHNOTIFICATION_REQUEST", "SENDPUSHNOTIFICATION_SUCCESS", "SENDPUSHNOTIFICATION_FAILURE"],
      }
    };
  };

  