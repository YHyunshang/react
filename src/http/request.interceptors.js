
/**
 * axios 请求拦截器
 */
export function withAuthHeader({ headers = {}, ...restConfig }) {
  const token = localStorage.getItem('token')
  return {
    ...restConfig,
    headers: {
      'login-token': token,
      'x-token': token,
      ...headers,
    },
  }
}

/**
 * 添加额外数据域
 * @param {object} param0 axios request configuration
 */
export function extraConfigField({ meta = {}, ...restConfig }) {
  return { ...restConfig, meta }
}
