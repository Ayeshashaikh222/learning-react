import React, { useState, useEffect, useReducer, useContext } from 'react';
import classes from './Login.module.css';
import Card from '../components/UI/Card/Card';
import Button from '../components/UI/Button/Button';
import AuthContext from '../context/auth-context';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val , isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val , isValid: action.val.trim().length > 6 };
  }
  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
    return { value: '', isValid: false };
};

const collegeNameReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value: action.val , isValid: action.val.trim().length > 0 };
  }
  if(action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
    return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollegeName, setenteredCollegeName] = useState('');
  // const [collegeNameIsValid, setCollegeNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const [collegeNameState, dispatchCollegeName] = useReducer(collegeNameReducer, {
    value: '',
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState;
  const {isValid: collegeNameIsValid } = collegeNameState;

  useEffect(()=>{
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      // side effect function
      setFormIsValid(
        emailIsValid && passwordIsValid && collegeNameIsValid
      ); 
    }, 500);

    // cleanup process function
    return () => {
      console.log('CLEAN UP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, collegeNameIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.value.includes('@') && passwordState.isValid &&  collegeNameState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6 && collegeNameState.isValid
    // );
  };

  const CollegeNameChangeHandler = (event) => {
    // setenteredCollegeName(event.target.value);
    dispatchCollegeName({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid && event.target.value.trim().length > 0
    // );
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const validateCollegeNameHandler = () => {
    // setCollegeNameIsValid(enteredCollegeName.trim().length > 0);
    dispatchCollegeName({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeNameState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid  === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${collegeNameState.isValid  === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="collegeName"
            value={collegeNameState.value}
            onChange={CollegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
