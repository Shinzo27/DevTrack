import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import { authState } from '@/State/atom'

const ENDPOINT = 'http://localhost:8000'

const Comments = ({projectId}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('')
  const auth = useRecoilValue(authState)
  const userId = auth?.user?.user._id
  const socket = io(ENDPOINT)

  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get(`http://localhost:8000/api/v1/comment/getComments/${projectId}`, {withCredentials: true})
      setComments(data.comments)

      socket.on('newComment', (comment) => {
        setComments(prevComments => [...prevComments, comment]);
      })

      return () => socket.off('newComment')
    }
    getComments()
  },[projectId])

  const addComment = async(e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`http://localhost:8000/api/v1/comment/addComment`, {comment, userId, projectId}, {withCredentials: true})
      socket.emit('newComment', data.comment)
      toast.success(data.message)
      setComment('')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 bg-white p-6 mt-8 rounded-xl shadow-lg max-w-4xl mx-auto mb-5">
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="text-2xl font-bold mb-2">Comments</h2>
          <p className="text-gray-400 mb-4">View all comments</p>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <form method='post' onSubmit={addComment} className='flex items-center gap-5'>
          <div>
              <input type='text' placeholder='Enter your comment' className='border rounded-md p-2 outline-none' onChange={(e)=>setComment(e.target.value)}/>
          </div>
          <div>
            <button value={comment} className="bg-black text-white py-2 px-4 rounded">Add Comment</button>
          </div>
        </form>
      </div>
      <div className="">
        <div className="flex flex-col pt-3">
          {
            comments.map((comment, index) => (
              <div key={index} className="flex flex-col pt-3">
                <div className="">
                  <h3 className="font-semibold">{comment.user.name}</h3>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <span className="ml-4">{comment.content}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Comments