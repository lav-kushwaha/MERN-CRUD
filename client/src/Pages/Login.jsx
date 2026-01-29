import React, { useState } from 'react'

const Login = () => {

    const [isLogin,setIsLogin] = useState(true);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-center mb-6'>
                {isLogin ?"Login":"Signup"}
            </h2>

            {/*Form*/}
            <form className='space-y-4'>
                {!isLogin && (
                  <input type='text' placeholder='username' className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                )}

                <input type="email" placeholder='email' className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'/>
                <input type="password" placeholder='password' className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                <button type='submit' className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
                    {isLogin?"Login":"create account"}
                </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-500 hover:underline font-medium"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
            </p>
        </div>
    </div>
  )
}

export default Login;