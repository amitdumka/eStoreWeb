import { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

export function UserInfos() {
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      authService.getUser().then((info) => {
        setUserInfo(info);
        //console.log(info);
      });
    }
  }, [authState, authService]); // Update if authState changes

  return userInfo;
}
