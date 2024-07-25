import axios from 'axios';

// 创建一个axios实例
const instance = axios.create({
    baseURL: '/api', // 设置基础URL
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }, // 设置请求头
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，比如添加token
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response.data;
    },
    error => {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

// 封装get请求
function get(url, params) {
    return instance.get(url, { params });
}

// 封装post请求
function post(url, data) {
    return instance.post(url, data);
}

// 封装put请求
function put(url, data) {
    return instance.put(url, data);
}

// 封装delete请求
function del(url, params) {
    return instance.delete(url, { params });
}

// 导出封装的请求方法
export { get, post, put, del };
