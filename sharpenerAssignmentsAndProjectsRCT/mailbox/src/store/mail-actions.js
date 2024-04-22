import { restoreMailData } from "./mailSlice";

export const sendMailData = (mailData) => {
  // alert("Sending mail");
  return async () => {
    const updatingMailData = async () => {
      const mailResponse = await fetch(
        `https://mailbody-7480c-default-rtdb.firebaseio.com/mailData.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailData),
        }
      );

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
      const mailResponse = await fetch(
        `https://mailbody-7480c-default-rtdb.firebaseio.com/mailData.json`
      );
      console.log(
        mailResponse,
        "thisl is mail response from the mail action line no 31"
      );
      if (!mailResponse.ok) {
        throw new Error("Fetching mails failed...");
      }
      const mailData = await mailResponse.json();
      console.log(mailData, "from the restore mail data slice...");
      console.log(mailData, "this is mail data from mail actions");
      return mailData;
      // dispatch(restoreMailData(mailData));
    };
    try {
      const data = await fetchingMails();
      if (data) {
        console.log(data, "priting mail data from the get mail slice");
        dispatch(restoreMailData(data));
      }
    } catch (error) {
      alert(error.message);
    }
  };
};
