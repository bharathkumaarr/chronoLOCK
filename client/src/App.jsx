
// // import './App.css'
// import './index.css'


// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Signup from './components/Signup'
// import Login from './components/Login'
// import Caps from './components/Caps'



// function App() {
  

//   return (
//     <BrowserRouter>
//       <div className='min-h-screen bg-black'>
//         <Routes>
//           <Route path='/signup' element={<Signup />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/capsules' element={<Caps />} />
//           <Route path='/' element={<Login />} />
//         </Routes>
        
//       </div>
//     </BrowserRouter>
//   )
// }

// export default App



import React from 'react'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      {/* <Landing /> */}
      <Dashboard />
      
    </div>
  )
}

export default App

