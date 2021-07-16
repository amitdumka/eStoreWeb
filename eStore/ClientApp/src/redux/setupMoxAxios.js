export default function setupMoxAxios(axios, store) {
    axios.interceptors.request.use(
      config => {
        const {
          auth: { authToken }
        } = store.getState();
  
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
  
        return config;
      },
      err => Promise.reject(err)
    );
  }
  