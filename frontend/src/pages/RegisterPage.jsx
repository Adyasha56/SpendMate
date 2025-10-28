import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useIsMobile } from '../utils/hooks';

const PROFESSIONS = ['Student', 'Teacher', 'Engineer', 'Doctor', 'Business', 'Freelancer', 'Other'];

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profession: 'Student',
    gender: 'Male',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.profession,
      formData.gender
    );

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isMobile ? 'px-4' : 'px-4'}`}>
      <div className={`card ${isMobile ? 'w-full' : 'max-w-md w-full'}`}>
        <h2 
          className={`font-bold text-center mb-6 ${isMobile ? 'text-2xl' : 'text-3xl'}`}
          style={{ color: 'var(--color-primary)' }}
        >
          Join SpendMate
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Profession</label>
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="input-field"
              required
            >
              {PROFESSIONS.map((prof) => (
                <option key={prof} value={prof}>
                  {prof}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm">Female</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                  className="w-4 h-4"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm">Other</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="font-medium" style={{ color: 'var(--color-primary)' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;