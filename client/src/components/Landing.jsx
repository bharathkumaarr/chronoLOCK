import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Landing() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleTheme = ()=>{
        setIsDarkMode(!isDarkMode)
    }
    useEffect(()=>{
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        } else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode])


  return (
    <main className={`overflow-x-hidden min-h-screen ${isDarkMode ? 'dark' : 'light'}`}>
        <div className='h-screen bg-neutral-300 w-screen text-neutral-800 italiana-regular flex flex-col justify-center items-center relative px-4 select-none'>
            <button className={`absolute top-0 h-5 w-10 mt-8 bg-neutral-800 rounded-2xl hover:scale-125 transition-transform duration-300 ease-in-out flex items-center ${isDarkMode ? 'dark' : 'light'}`} onClick={toggleTheme} ></button>

            <h1 className='text-9xl md:7xl max-w-4xl text-center select-none'>chrono lock</h1>
            <h4 className='text-4xl text-center select-none'>stash your story, share with loved ones, reveal when it’s time!</h4>
            <button className='bg-neutral-800 text-neutral-300 text-4xl w-64  rounded-lg p-1 mt-32 hover:scale-105 transition-transform duration-300 ease-in-out text-center select-none'>start stashing</button>
            <h4 className='text-3xl absolute bottom-5 text-center'>see how it works &darr;</h4>
        </div>
        <div className='h-screen bg-neutral-300 w-screen text-neutral-800 italiana-regular flex flex-col justify-center items-center relative select-none'>
            <div className='flex items-center justify-around text-3xl w-full h-full select-none'>
                <div className='w-56 border border-neutral-800 bg-neutral-300 h-72 rounded-3xl flex items-center justify-center hover:border-neutral-400 transition-colors duration-300 ease-in-out'>
                    <h1 className='w-28 text-center'>stash your story</h1>
                </div>
                <div className='w-56 border border-neutral-800 bg-neutral-300 h-72 rounded-3xl flex items-center justify-center hover:border-neutral-400 transition-colors duration-300 ease-in-out'>
                    <h1 className='w-28 text-center '>pick an open date</h1>
                </div>
                <div className='w-56 border border-neutral-800 bg-neutral-300 h-72 rounded-3xl flex items-center justify-center hover:border-neutral-400 transition-colors duration-300 ease-in-out'>
                    <h1 className='w-28 text-center '>share with loved ones</h1>
                </div>
                <div className='w-56 border border-neutral-800 bg-neutral-300 h-72 rounded-3xl flex items-center justify-center hover:border-neutral-400 transition-colors duration-300 ease-in-out'>
                    <h1 className='w-28 text-center '>let the magic happen</h1>
                </div>
                

            </div >

            <footer className='w-full relative bottom-0 bg-neutral-800 flex justify-around h-64 items-center'> 
                <div className='flex flex-col justify-center items-center text-2xl text-neutral-300 hover:text-white transition-all duration-300 ease-in-out'>
                    <h5 className='text-center'>give it a ⭐️ <br /> <a href="https://github.com/bharathkumaarr" target='_blank' className='hover:underline'>@bharathkumaarr</a></h5>
                </div>
                <a href="https://x.com/bharathkumxr" className='text-2xl text-neutral-300 hover:text-white transition-all duration-300 ease-in-out'><h5>created by <span className='hover:underline ease-in-out'>@bharathkumxr</span></h5></a>
                
                <a href="" className='text-2xl text-neutral-300 hover:text-white transition-all duration-300 ease-in-out'><h5>buy me a coffee ☕️</h5></a>
            </footer>
        </div>

    </main>
    

  )
}

export default Landing
