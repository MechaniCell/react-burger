import React, { FormEvent, RefObject } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { getLoginEmailInputAction, getLoginPasswordInputAction, userLogin } from '../services/actions/login';
import styles from './page-container.module.css';
import { ILoginPage } from './login-page-types';        

function LoginEmailInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(getLoginEmailInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'E-mail'}
      onChange={onChange}
      icon={undefined}
      value={value}
      name={'name'}
      error={false} 
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />  
  );
} 

function LoginPasswordInput() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value) 
    dispatch(getLoginPasswordInputAction(e.target.value))
  }  
  const inputRef = React.useRef(null) as RefObject<any> | null;
  const onIconClick = () => {
    setTimeout(() => inputRef ? inputRef.current.focus() : null, 0)
    alert('Icon Click Callback')
  }  
  return ( 
    <Input
      type={'text'}
      placeholder={'Пароль'}
      onChange={onChange}
      icon={'ShowIcon'}
      value={value}
      name={'name'}
      error={false} 
      ref={inputRef}
      onIconClick={onIconClick} 
      errorText={'Ошибка'}
      size={'default'}
    />  
  );
} 

export function LoginPage() {
  const location = useLocation<ILoginPage>()
  const dispatch = useDispatch();    
  const history = useHistory(); 
  const { getResult } = useSelector((store: any) => store.profile);    
  const { loginEmailInput,
          loginPasswordInput,
          loginResult,
          logoutResult } = useSelector((store: any) => store.login);  
  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    dispatch(userLogin(loginEmailInput, loginPasswordInput))
  },
  [ dispatch, loginEmailInput, loginPasswordInput]
  ); 
  useEffect(() => {
      if (!logoutResult.success && (loginResult['success'] || getResult.user.email)) { 
        history.replace({ pathname: location.state ? (location.state.from.pathname) : ('/')})
      }
  }, [loginResult['success'], getResult.user.email, history, location.state])

  return (
    <div className={styles.login_container}>
      <h1 className={`text text_type_main-large mb-6`}>Вход</h1>    
      <form onSubmit={(e) => onSubmit(e)} className={styles.login_container}>
        <LoginEmailInput />
        <div className={`text text_type_main-medium mt-6`}>
          <LoginPasswordInput />
        </div>
        <div className={`text text_type_main-medium mt-6`}>
          <Button htmlType='submit' type="primary" size="large">
            Войти
          </Button>
        </div>
      </form>
      <p className={` text text_type_main-medium mt-20`}>Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></p>
      <p className={` text text_type_main-medium mt-4`}>Забыли пароль? <Link to='/forgot'>Восстановить пароль</Link></p>                
    </div>
  );
} 