export default [
  {
    url: '/sys/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: { success: true }
      }
    }
  }
]
