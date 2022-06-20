import { resultSuccess, resultError } from '../_util.js'
import { ResultEnum } from '../../src/enums/httpEnum.js'

const userInfo = {
  name: 'Allen',
  userid: '00000001',
  email: 'email-name@qq.com',
  signature: 'Be written in JavaScript eventually.',
  introduction: 'A coder with JavaScript.',
  title: 'Full Stack Developer',
  group: 'Boretech Department - Frontend Team',
  tags: [
    {
      key: '0',
      label: 'Father',
    },
    {
      key: '1',
      label: 'Geek',
    },
    {
      key: '2',
      label: 'Coder',
    },
    {
      key: '3',
      label: 'Nice',
    },
    {
      key: '4',
      label: 'Handsome',
    },
    {
      key: '5',
      label: 'Humorous',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  address: 'Wuhan City',
  phone: '027-88888888',
}

export default [
  {
    url: '/basic-api/account/getAccountInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo)
    },
  },
  {
    url: '/basic-api/user/sessionTimeout',
    method: 'post',
    statusCode: 401,
    response: () => {
      return resultError()
    },
  },
  {
    url: '/basic-api/user/tokenExpired',
    method: 'post',
    statusCode: 200,
    response: () => {
      return resultError('Token Expired!', { code: ResultEnum.TIMEOUT })
    },
  },
]