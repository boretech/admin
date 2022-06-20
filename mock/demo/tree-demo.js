import { resultSuccess } from '../_util.js'

const demoTreeList = (keyword) => {
  const result = {
    list: [],
  };
  for (let index = 0; index < 5; index++) {
    let children = []
    for (let j = 0; j < 3; j++) {
      children.push({
        title: `${keyword ?? ''}选项${index}-${j}`,
        value: `${index}-${j}`,
        key: `${index}-${j}`,
      })
    }
    result.list.push({
      title: `${keyword ?? ''}选项${index}`,
      value: `${index}`,
      key: `${index}`,
      children,
    })
  }
  return result
};

export default [
  {
    url: '/basic-api/tree/getDemoOptions',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { keyword } = query
      console.log(keyword)
      return resultSuccess(demoTreeList(keyword))
    },
  },
]
