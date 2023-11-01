import { axiosInstance } from 'common/api/setAxiosInstance';

export default class CommonService {
  get(url: string, querryParams?: object) {
    return axiosInstance.get(url, { params: querryParams });
  }

  post(url: string, data: object) {
    return axiosInstance.post(url, data);
  }

  put(url: string, data: object) {
    return axiosInstance.put(url, data);
  }

  delete(url: string, data?: any) {
    return axiosInstance.delete(url, { data });
}

}
