import { Button, ButtonSet, Form, Stack, TextInput, Theme } from '@carbon/react'
import { useState } from 'react'
import style from '../style/login.module.scss'
import { Toaster } from 'react-hot-toast'

const Login = () => {
  const [theme, setTheme] = useState('light')
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  })

  const onchageId = (e) => {
    setLoginForm({
      ...loginForm,
      id: e.target.value,
    })
  }

  const onchagePw = (e) => {
    setLoginForm({
      ...loginForm,
      password: e.target.value,
    })
  }

  const fetchLogin = async () => {
    await fetch('https://pluto3.shutupandtakemy.codes/login', {
      method: 'POST',
      body: JSON.stringify({
        id: loginForm.id,
        password: loginForm.password,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem('token', data.token)
          window.location.href = '/'
        } else {
          // id , pw 틀림
        }
      })
  }

  return (
    <div className={style.container}>
      <Theme id="theme">
        <div className="login-form">
          <Form method="POST">
            <Stack gap={4}>
              <h1>로그인</h1>
              <TextInput
                if="id"
                labelText="ID를 입력하세요."
                type="text"
                size="md"
                onChange={(e) => onchageId(e)}
              />
              <TextInput
                if="pw"
                labelText="PW를 입력하세요."
                type="password"
                size="md"
                onChange={(e) => onchagePw(e)}
              />
              <Stack gap={3}>
                <ButtonSet>
                  <Button
                    kind="primary"
                    disabled={false}
                    size="md"
                    type="button"
                    onClick={fetchLogin}
                  >
                    로그인
                  </Button>
                  <Button
                    kind="secondary"
                    disabled={false}
                    size="md"
                    type="reset"
                  >
                    취소
                  </Button>
                </ButtonSet>
                <p> 아이디/비밀번호 분실 시 관리자에게 문의해주세요.</p>
              </Stack>
            </Stack>
          </Form>
        </div>
      </Theme>
    </div>
  )
}

export default Login
