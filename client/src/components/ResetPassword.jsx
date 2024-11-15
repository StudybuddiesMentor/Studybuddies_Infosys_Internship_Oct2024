import { useState } from 'react'; 
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { id, token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setError('');
        setSuccess('');

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:9000/api/users/reset-password/${id}/${token}`, { password });

            console.log('Response:', response.data); 
            setSuccess('Password reset successful. Redirecting to login...');
            
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } catch (err) {
            console.error("Error occurred:", err);
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Reset Password</h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="mb-2 font-bold text-gray-800">New Password:</label>
                    <input
                        type="password"
                        placeholder='Enter New Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-3 mb-5 rounded border border-gray-300 text-lg"
                    />
                    <label className="mb-2 font-bold text-gray-800">Confirm Password:</label>
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="p-3 mb-5 rounded border border-gray-300 text-lg"
                    />
                    <button
                        type="submit"
                        className="py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600 active:bg-green-700 transition duration-300 ease-in-out"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
