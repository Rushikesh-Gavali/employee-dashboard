import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '../api/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').matches(/[@$!%*?&#]/, 'Password must contain a special character').required('Password is required'),
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email:'admin@gmail.com',
            password: 'admin@1'
        }
    });
    const navigate = useNavigate();

   const token= localStorage.getItem('token')
   useEffect(()=>{
    if(token){
        navigate('/home', {replace:true})
    }
   },[token,navigate])

    const onSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            localStorage.setItem('token', response.data.data.token);
            navigate('/home');
        } catch (error) {
            console.error(error.response?.data?.response_message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow dark:bg-gray-900">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="block w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
