export const getGeoLocation = async () => {
  let data;
  const getData = () =>
    new Promise((res, rej) => {
      const successCallback = (position: object) => res(position);
      const failureCallback = (err: any) => {
        console.log("Error : ", err);
        res({});
      };
      if (global.navigator)
        global.navigator.geolocation.getCurrentPosition(
          successCallback,
          failureCallback
        );
      else res("Geo Location not supported by the browser");
    });
  data = await getData();
  return data;
};

export const fahrenheitToCelcuis = (farh: number) => {
  const value = ((farh - 32) * 5) / 9;
  return value.toFixed(2);
};

export const debounce = (cb: (...args: any) => any, delay: number = 1000) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
