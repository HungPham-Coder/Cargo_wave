const CheckToken = () => {
  const timeTokenStr = localStorage.getItem('jwtAccessExpire');
  const timeRefreshTokenStr = localStorage.getItem('jwtRefreshExpire');

  console.log("timeTokenStr", timeTokenStr)
  console.log("timeRefreshTokenStr", timeRefreshTokenStr)

  if (timeTokenStr && timeRefreshTokenStr) {
    const timeToken = new Date(timeTokenStr).getTime();
    const timeRefreshToken = new Date(timeRefreshTokenStr).getTime();
    const timeNow = new Date().getTime();

    if (timeNow < timeToken) {
      return 0;
    } else if (timeNow < timeRefreshToken) {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 2;
  }
};

export default CheckToken;



