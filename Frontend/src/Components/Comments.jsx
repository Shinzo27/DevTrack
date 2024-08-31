import React, { useState } from 'react'

const Comments = () => {
  return (
    <div className="flex-1 bg-white p-6 mt-8 rounded-xl shadow-lg max-w-4xl mx-auto mb-5">
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="text-2xl font-bold mb-2">Comments</h2>
          <p className="text-gray-400 mb-4">View all comments</p>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>
            <input type='text' placeholder='Enter your comment' className='border rounded-md p-2 outline-none' />
        </div>
        <div>
          <button className="bg-black text-white py-2 px-4 rounded">Add Comment</button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center pt-3">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold">Shinzo27</h3>
          </div>
          <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
            <span className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit numquam commodi architecto, est deleniti tempora magnam eos rerum! Quia sed temporibus eum ducimus adipisci, saepe voluptatem quasi provident ex numquam!</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-3">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold">Pratham Patel</h3>
          </div>
          <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
            <span className="ml-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit numquam commodi architecto, est deleniti tempora magnam eos rerum! Quia sed temporibus eum ducimus adipisci, saepe voluptatem quasi provident ex numquam!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments