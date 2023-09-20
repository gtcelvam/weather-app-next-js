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

export const blobToBase64 = (blob: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export const getFormatedTime = (value: string) => {
  let time = new Date(value);
  let hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  return hour + ":" + minutes;
};
