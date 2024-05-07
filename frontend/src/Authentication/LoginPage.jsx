import React, { useState } from 'react'
import authImage from '../Assets/auth-image.png'
import Google from "../Assets/google.png"
import { useNavigate } from 'react-router-dom'

function LoginPage({googleClick}) {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleGoogleLogin = () => {
        // Redirect to backend route for Google OAuth
        window.open("http://localhost:6005/auth/google/callback","_self")
        // localStorage
        googleClick()
        
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // Send form data to backend for login
        try {
            const response = await fetch('http://localhost:6005/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Redirect to dashboard after successful login
                const data = await response.json(); // Parse response body as JSON
                console.log(data)
                // const { message, user } = response.data;
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.token) {
                    document.cookie = `token=${data.token}; path=/;`;
                    window.location.href = '/recommenders';
                } else {
                    console.error('Token not received in response');
                }
            } else {
                // Handle error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

  return (
    <div className='flex m-14'>
        <div className='w-1/2 text-white m-5 space-y-'>
            <div className='font-extrabold text-[40px] text-center'>Hey, Welcome Back!</div>
            <div className='text-center text-[16px] font-semibold'>Fill in the details to get started and explore.</div>
            <div className='w-4/5 m-auto mt-5 text-[16px] font-extralight space-y-2'>
                <div className='  '>Email Address</div>
                <input type="text" className='bg-[#16161D] border-none w-full font-medium outline-none'  name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
                <p className='border-[2px] border-[#7F75A2] w-full'></p>
                <div className='mt-2'>Password</div>
                <input type="password" className='bg-[#16161D] border-none w-full outline-none'  name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
                <p className='border-[2px] border-[#7F75A2] w-full'></p>
                <div className='flex mt-4 place-content-between font-medium text-[14px]'>
                    <div >Forgot Password?</div>
                    <div className='text-[#1A8FE3] underline'>Remind password</div>
                </div>
            </div>
            <button className='m-auto flex mt-8 w-3/4 place-content-center p-3 bg-[#674CC4] rounded-[30px] font-bold text-[21px] hover:opacity-80' onClick={handleSubmit} >Login</button>
            <div className='flex mt-8 w-4/5 m-auto'>
            <p className='w-1/2 m-auto' ><p className='border-[2px] border-[#7F75A2] w-full'></p></p>
            <p className='text-[14px] font-medium pr-2 pl-2'>OR</p>
            <p className='w-1/2 m-auto' ><p className='border-[2px] border-[#7F75A2] w-full'></p></p>
            </div>
            <button className='m-auto flex mt-7 w-3/4 place-content-center p-3 bg-[#29293C] rounded-[30px] font-bold text-[21px] space-x-4 hover:opacity-80'  onClick={handleGoogleLogin}><img src={Google} alt="" /> <p>Continue with Google</p> </button>
            <div className='w-4/5 m-auto mt-9 text-[16px] font-medium flex place-content-between'>
                <div> Don't have an account yet?</div>
                <button onClick={()=>{navigate("/signup")}} className='text-[#1A8FE3]'>Create an account</button>
            </div>
        </div>
        <div className='w-1/2'>
            <img src={authImage} alt="" />
        </div>
    </div>
  )
}

export default LoginPage