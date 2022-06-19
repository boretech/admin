// Interface data format used to return a unified format

export const resultSuccess = (result, { message = 'ok' } = {}) => ({
  code: 0,
  result,
  message,
  type: 'success',
})

export const pagination = (pageNo, pageSize, array) => {
  const offset = (pageNo - 1) * Number(pageSize)
  const res =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return res
}

export const resultPageSuccess = (
  page,
  pageSize,
  list,
  { message = 'ok' } = {},
) => ({
  ...resultSuccess({
    items: pagination(page, pageSize, list),
    total: list.length,
  }),
  message,
})

export const resultError = (message = 'Request failed', { code = -1, result = null } = {}) => ({
  code,
  result,
  message,
  type: 'error',
})

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export const getRequestToken = ({ headers }) => headers?.authorization