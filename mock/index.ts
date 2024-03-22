export default [
  {
    url: '/sys/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          accessToken:
            'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjAiLCJuYW1lIjoi566h55CG5ZGYIiwicm9sZXMiOiIxIiwiZXhwIjoxNzExMDI5MTI0fQ.B-smjAkEuq__zVFtcrhP7BaHvQvIiPxYu7UxaZWJNNzCSGsnMJ5MA5I2fLyIvl5uYXW6wO6bVs5s2GGYVwaPpYZsCNO1lO6-Scob6BQLZ0KZH4yHGruG4LdbkformuXnieDQDrXjrxliRsDJVvfnNUkvgHRBtNec8WH8RvQjoVQ'
        }
      }
    }
  }
]
