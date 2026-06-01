import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { BRAND_NAME } from '../lib/utils'
import toast from 'react-hot-toast'

const ADMIN_IMAGE = '/admin-login.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signIn(email, password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col lg:flex-row">
      {/* Illustration — visible when opening Admin from footer */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative lg:w-1/2 min-h-[40vh] lg:min-h-screen flex items-center justify-center p-6 lg:p-12 bg-accent/40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/60 via-cream to-primary/10 pointer-events-none" />
        <motion.img
          src={ADMIN_IMAGE}
          alt="Cute cats knitting — The Dollies Crochet Studio"
          className="relative z-10 w-full max-w-md lg:max-w-lg rounded-3xl shadow-xl shadow-primary/15 object-cover hero-line-float"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        />
      </motion.div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <p className="text-center text-2xl mb-1">🧶</p>
          <h1 className="font-display text-2xl font-semibold text-center text-dark">{BRAND_NAME}</h1>
          <p className="text-center text-muted text-sm mb-8">Admin Dashboard</p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white/80 border border-accent rounded-[1.5rem] p-6 sm:p-8 shadow-sm"
          >
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>

          <Link
            to="/"
            className="block text-center text-sm text-muted mt-6 hover:text-primary transition-colors"
          >
            ← Back to store
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
