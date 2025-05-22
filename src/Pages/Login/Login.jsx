import React, { useState } from 'react'
import { api } from '~/services/api'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '~/redux/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  function handleLogin(api, email, password, setError, setLoading) {
    setLoading(true)
    setError('')

    api.post('/user/accountAction/login', { email, password })
      .then(response => {
        // handle successful login, e.g., save token, redirect, etc.
        console.log('Login successful:', response.data)
        dispatch(loginSuccess({ user: response.data.data, token: response.data.accessToken }))
        alert('Login successful!')
        setLoading(false)
      })
      .catch(error => {
        setError('Invalid email or password')
        setLoading(false)
      })
  }

  const handleSubmit = () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    handleLogin(api, email, password, setError, setLoading)
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 border-2 border-gray-300 rounded focus:ring-black focus:border-black"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button className="text-black hover:text-gray-700 font-medium underline bg-transparent border-none cursor-pointer">
                  Forgot password?
                </button>
              </div>
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

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="text-black hover:text-gray-700 font-medium underline bg-transparent border-none cursor-pointer">
                Sign up here
              </button>
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>Demo credentials: user@example.com / password</p>
        </div>
      </div>
    </div>
  )
}

export default Login