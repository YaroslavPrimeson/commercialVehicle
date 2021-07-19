const getPosition = new Promise((resolve) => {
  let userPosition = {};
  navigator.geolocation.getCurrentPosition((position) => {
    userPosition.lat = position.coords.latitude;
    userPosition.lon = position.coords.longitude;
    resolve(userPosition);
  });
});

export default getPosition;
