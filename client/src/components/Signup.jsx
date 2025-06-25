// import {useState} from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Signup(){
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/api/auth/signup', {
//             email,
//             password,
//             });
//             localStorage.setItem('token', response.data.token);
//             navigate('/capsules');

//         }
//         catch (error) {
//             setError(error.response?.date?.error || 'Signup failed')
//         }
//     }
// return (
//     <div className="flex justify-center items-center min-h-screen">
//       <form onSubmit={handleSubmit} className="bg-black p-6 rounded-xl shadow-md w-full max-w-sm border border-gray-500 border-opacity-50">
//         <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Signup</h2>
//         {error && <p className="text-red-400 mb-4">{error}</p>}
//         <div className="mb-4">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 rounded-xl gray-200"
//             required
//             placeholder='Email'
//           />
//         </div>
//         <div className="mb-4">
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 rounded-xl gray-200"
//             required
//             placeholder='Password'
//           />
//         </div>
//         <button type="submit" className="w-full bg-gray-500 text-gray-200 p-2 rounded-xl hover:bg-gray-600 ">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Signup;