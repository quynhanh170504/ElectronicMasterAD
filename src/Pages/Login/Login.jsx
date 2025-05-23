import React, { useState } from 'react'
import { api } from '~/services/api'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '~/redux/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const token = useSelector(state => state.user.token)
  console.log("check user: ", user)
  console.log("check token: ", token)

  const [email, setEmail] = useState('huynhanh.170504@gmail.com')
  const [password, setPassword] = useState('321321')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    api.post('/user/accountAction/login', { email, password })
      .then(response => {
        // handle successful login, e.g., save token, redirect, etc.
        console.log('Login response:', response.data)
        if (response.data.success === true) {
          console.log('Login successful:', response.data)
          dispatch(loginSuccess({ user: response.data.data, token: response.data.accessToken }))
          navigate('/')
          alert('Login successful!')
        }
        setLoading(false)
      })
      .catch(error => {
        console.log('Login error:', error)
        setError('Invalid email or password')
        setLoading(false)
      })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to your account</p>
        </div>

        <div className="bg-white border-2 border-black rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 text-black placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-black focus:ring-0 transition-colors duration-200 text-black placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-md p-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between">

            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border-2 border-black text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Login