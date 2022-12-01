import React, {useEffect} from 'react'
import Head from 'next/head'
import styles from '../styles/Dashboard.module.css'
import {useForm} from "react-hook-form";
import axios from 'axios'
import {FirebaseClient} from "../firebase/FirebaseClient";

export default function LoginComponent() {

    const {register, handleSubmit, watch, setError, formState: {errors}} = useForm();

    const watchPassword = watch('password')

    useEffect(() => {

    }, [watch])

    const loginSubmit = async (data) => {
        try {
            await FirebaseClient.signIn(data.email, data.password);
            window.location.href = "/dashboard"
        } catch (e) {
            if (e?.response?.status === 400) {
                setError("password", {
                    type: "manual",
                    message: "Invalid credentials.",
                });
            }
        }
    }

    return (
        <form className={`d-flex flex-column align-items-center ${styles.loginBox}`}
              onSubmit={handleSubmit(loginSubmit)}>
            <div className={`d-flex flex-column w-100 p-4`}>
                <label>Email*</label>
                <input {...register("email", {required: true})} type="email"
                       className={`form-control ${errors?.email ? 'is-invalid' : ''}`}></input>

                <label>Password*</label>
                <input {...register("password", {required: true})} type="password"
                       className={`form-control ${errors?.password ? 'is-invalid' : ''}`}></input>
                <button type="submit" className={`btn-black mt-4`} disabled={!watchPassword}>Submit</button>
            </div>
        </form>
    )

}