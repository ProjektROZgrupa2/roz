import axios, { AxiosError } from 'axios';
import {useEffect, useState} from "react";

export const registerUser = async (email: string, password: string) => {

    try {
        const response = await axios.post('http://localhost:8000/api/register/', { username: email, password }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNREFUSED') {
                return { error: true, message: 'Błąd połączenia z serwerem.' };
            }
            return { error: true, message: error.response?.data.message || 'Wystąpił błąd podczas łączenia z systemem.' };
        }
        return { error: true, message: 'Wystąpił błąd podczas łączenia z systemem.' };
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:8000/api/login/', { username: email, password }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        if (response.data.token) {
            localStorage.clear();
            localStorage.setItem('access_token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            return { success: true };
        } else {
            return { success: false, message: response.data.detail || 'Network Error.1' };
        }
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                return { success: false, message: 'Network Error.2' };
            }
            return { success: false, message: error.response?.data.detail || 'Network Error3.' };
        }
        return { success: false, message: 'Network Error4.' };
    }
};

export const logoutUser = async () => {
    try {
        const token = localStorage.getItem('access_token');
        console.log('Sending request with headers:', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
        await axios.post('http://localhost:8000/api/logout/', {}, {
            headers: { 
                'Content-Type': 'application/json' ,
                'Authorization': `Token ${token}`
            },
            
        });
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
    } catch (e) {
        console.log('logout not working', e);
    }
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const token = localStorage.getItem('access_token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.post('http://localhost:8000/api/change_password/', { old_password: oldPassword, new_password: newPassword }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                return { success: false, message: 'Network Error' };
            }
            return { success: false, message: error.response.data.detail || 'Error while changing password' };
        }
        return { success: false, message: 'Error while changing password' };
    }
};