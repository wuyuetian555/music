import request from '@/utils/request';

export const getWeatherData = () => {
  return request(
    'https://api.seniverse.com/v3/weather/now.json?key=Sku_f0WD2YAmUkwkG&location=ip&language=zh-Hans&unit=c',
    'get'
  );
};
