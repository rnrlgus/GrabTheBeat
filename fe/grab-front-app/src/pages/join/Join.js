import React, { useState, useEffect, useCallback } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';
import Header from 'pages/header/Header';

function Join () {
    return (
        <div>
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem'
            }}>
            <ButtonBack />    
            <Header />
            </div>
            <div className="containerJoin">
                <JoinTitle />
                <div>
                    <JoinForm />
                </div>
            </div>
        </div>
    ) 
}

function ButtonBack() {

    return (
        <Link to="/" >
        <button className="backbuttonJoin" >
            <svg className="icon" width="100" height="100" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.83 14.83l-2.83-2.83-12 12 12 12 2.83-2.83-9.17-9.17" fill="#transparent" stroke="#ff99ff" strokeWidth="0.5"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
            BACK
        </button>
        </Link>
    )
}

function JoinTitle () {
    return (
        <div className="titleJoin">JOIN GAME</div>
    )
}

function JoinForm() {
    const [values, setValues] = useState({
        code: "",
        userName: localStorage.getItem('email_alias') || "",
    });

    const [errors, setErrors] = useState({
        code: "",
        userName: "",
    });

    const [touched, setTouched] = useState({
        code: false,
        userName: false,
    });

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };


    const handleFocus = e => {
        setTouched({
            ...touched,
            [e.target.name]: true,
        });

        // 입력 필드에 값이 없을 때만 빈 문자열로 설정하여 placeholder를 숨긴다.
        if (!values[e.target.name]) {
            setValues({
                ...values,
                [e.target.name]: "",
            });
        }
    };


    const handleSubmit = e => {
        e.preventDefault();

        setTouched({
            code: true,
            userName: true,
        });

        const errors = validate();
        setErrors(errors);
        if (Object.values(errors).some((v) => v)) {
            return;
        }

        alert(JSON.stringify(values, null, 2));
    };

    const validate = useCallback(() => {
        const errors = {
            code: "",
            userName: "",
        };

        if (!values.code) {
            errors.code = "코드를 입력하세요";
        }
        if (!values.userName) {
            errors.userName = "이름을 입력하세요";
        }
        return errors;
    }, [values]);

    useEffect(() => {
        validate();
    }, [validate]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="code"
                value={values.code}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleFocus}
                className={`login-form-field ${touched.code && !values.code ? "empty" : ""}`}
                placeholder="ENTER JOIN CODE"
            />
            {touched.code && errors.code && <span><br />{errors.code}</span>}
            <br />
            <input
                type="text"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleFocus}
                className={`login-form-field ${touched.userName && !values.userName ? "empty" : ""}`}
                placeholder="ENTER YOUR NAME"
            />
            {touched.userName && errors.userName && <span><br />{errors.userName}</span>}
            <br />
            <Link to={'/multiplaywaiting'} state={{ from: 'join', code: values.code, name: values.userName }} >
            <button type="submit" className="joinbutton" >JOIN</button>
            </Link>
        </form>
    )
}


export default Join;