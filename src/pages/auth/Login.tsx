import { useState } from 'react'
import Input from '../../components/Input'
import AuthLayout from '../../components/layouts/AuthLayout'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'


const Login = () => {
  const { loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const guest = { email: import.meta.env.VITE_GE, password: import.meta.env.VITE_GP }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateLogin(email, password)) return

    try {
      const userDetails = {
        email,
        password
      }

      await dispatch(login(userDetails)).unwrap()

      toast.success('Loggedin successfully')

      navigate('/dashboard')

    } catch (error: any) {
      return toast.error(error)
    }
  }

  const handleGuestLogin = async () => {
    try {
      await dispatch(login(guest)).unwrap()

      toast.success('Welcome!!')
      navigate('/dashboard')

    } catch (error: any) {
      return toast.error(error)
    }
  }

  const validateLogin = (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill all fields')
      return false
    }

    return true
  }
  return (
    <AuthLayout>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='border shadow-md p-10 bg-white/80 flex items-center rounded-2xl backdrop-blur-3xl flex-col'>
       
          <div className='text-start w-full'>
            <h1 className='text-2xl font-bold'>Welcome!</h1>
            <p className='text-gray-500'>Enter your details to continue</p>
          </div>

          <form onSubmit={handleLogin} className='w-full flex flex-col gap-8 mt-10'>
            <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setEmail(e.target.value))} name='email' type='email' placeholder='email@example.com' label='Email Adress' />
            <Input value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setPassword(e.target.value))} name='password' type='password' placeholder='*********' label='Password' />

            <button className='btn-primary flex justify-center mb-4' disabled={loading}>{loading ? <Loader2 className='animate-spin' /> : 'Login'}</button>
          </form>

          <div className='flex flex-wrap gap-1 mt-auto text-nowrap'>
            <p className='text-gray-600'>If you don't have an account please</p>
            <button onClick={handleGuestLogin} type='button' disabled={loading} className='underline text-blue-500 hover:text-blue-400 transition-colors disabled:opacity-55'>
              enter as a guest
            </button>
          </div>

        </div>
      </div>
    </AuthLayout>
  )
}

export default Login