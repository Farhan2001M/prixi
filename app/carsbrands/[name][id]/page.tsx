import React from 'react'
import Header from '../../components/Header';

const page = () => {
  return (
    <div className="flex flex-col">
        <Header/>
        <div className='m-10'>I'm the dynamic Hpage</div>
        <div className='my-2'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea nemo a numquam laboriosam consequuntur eveniet error voluptatum, eos quidem impedit doloribus vitae culpa vel ut veniam suscipit officia voluptatibus?
          </p>
        </div>
        <h1>hello hello</h1>
    </div>
  )
}

export default page