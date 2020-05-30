import React, { useState, useEffect } from "react";
import mis422 from "../../api/mis-422";

function AccountActivate(props) {
  const [activated, setActivated] = useState(null);
  useEffect(() => {
    (async function activateAccount() {
      await mis422
        .get("/api/activate", {
          params: {
            key: props.match.params.key,
          },
        })
        .then((res) => setActivated(true))
        .catch((err) => setActivated(false));
    })();

    return () => {
      //cleanup
    };
  }, []);

  let message = "Waiting...";

  if (activated === true) {
    message = "Your user account has been activated. Please sign in.";
  } else if (activated === false) {
    message =
      "Your user could not be activated. Please use the registration form to sign up.";
  }

  return <div>{message}</div>;
}

export default AccountActivate;
