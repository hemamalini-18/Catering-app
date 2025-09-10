import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; form?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: typeof errors = {}
    if (!name) nextErrors.name = 'Name is required'
    if (!email) nextErrors.email = 'Email is required'
    if (!password) nextErrors.password = 'Password is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrors({ form: (data && (data.error || data.message)) || 'Sign up failed' })
        return
      }
      const data = await res.json()
      localStorage.setItem('token', data.token)
      navigate("/profile")
    } catch (err: any) {
      setErrors({ form: err?.message || 'Sign up failed' })
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/40 via-red-500/30 to-white/30 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-md px-6">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl shadow-orange-300/20 border border-orange-100 p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-300/30 mb-3">
              <span className="text-white text-xl font-bold">FF</span>
            </div>
            <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Create your account
            </h1>
            <p className="text-sm text-gray-600 mt-1">Join FeastFlow in seconds</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white/80"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white/80"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 bg-white/80"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                  Sign in
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-medium bg-gradient-to-r from-orange-500 to-red-500 shadow-lg shadow-orange-300/30 hover:opacity-95 transition"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup


