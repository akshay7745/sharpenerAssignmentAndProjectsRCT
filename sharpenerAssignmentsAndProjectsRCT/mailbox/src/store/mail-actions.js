import { restoreMailData } from "./mailSlice";
const databaseUrl = process.env.REACT_APP_DATABASE_URL;
export const sendMailData = (mailData) => {
  return async () => {
    const updatingMailData = async () => {
      const mailResponse = await fetch(`${databaseUrl}/mailData.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });

      if (!mailResponse.ok) {
        throw new Error("Sending mail data failed...");
      }
    };
    try {
      await updatingMailData();
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getMails = () => {
  return async (dispatch) => {
    const fetchingMails = async () => {
      const mailResponse = await fetch(`${databaseUrl}/mailData.json`);

      if (!mailResponse.ok) {
        throw new Error("Fetching mails failed...");
      }
      const mailData = await mailResponse.json();

      return mailData;
    };
    try {
      const data = await fetchingMails();
      if (data) {
        dispatch(restoreMailData(data));
      }
    } catch (error) {
      alert(error.message);
    }
  };
};
