import React from 'react'
import {Link} from "react-router-dom";
import {FaGithub} from "react-icons/fa";
import {CiLinkedin} from "react-icons/ci";
import {RiFundsFill} from "react-icons/ri";

const Footer = () => {
    return (
        <>
            <div className='bg-gray-800/20 h-20 p-6 hidden md:block'>
                <div className="flex justify-between items-center ">
                    <div className='flex w-[40%]'>
                        <RiFundsFill className='' size="30px"/>
                        <Link to='/' className="text-2xl font-serif">
                            Mutualy
                        </Link>
                    </div>
                    <div className="w-[60%]">
                        @tamasrupain02@gmail.com - copyright 2025
                    </div>

                    <div className='flex mx-5 w-[10%] gap-6'>
                        <a href='https://www.linkedin.com/in/tamasrupain/'>
                            <CiLinkedin size='35px'/>
                        </a>

                        <a href='https://github.com/TamasruPain'>
                            <FaGithub size='30px'/>
                        </a>
                    </div>
                </div>
            </div>

            <div className='bg-gray-800/20 h-40 block md:hidden '>
                <div className="flex flex-col justify-center items-center gap-4 ">
                    <div className='flex mt-3'>
                        <RiFundsFill className='' size="30px"/>
                        <Link to='/' className="text-2xl font-serif">
                            Mutualy
                        </Link>
                    </div>
                    <div className=" flex flex-col justify-center items-center ">
                        <p>
                            @tamasrupain02@gmail.com
                        </p>
                        <p>
                            - copyright 2025
                        </p>
                    </div>

                    <div className='flex mx-5 gap-6'>
                        <a href='https://www.linkedin.com/in/tamasrupain/'>
                            <CiLinkedin size='35px'/>
                        </a>

                        <a href='https://github.com/TamasruPain'>
                            <FaGithub size='30px'/>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer
