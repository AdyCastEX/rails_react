import React, { useState, useEffect, ChangeEvent } from 'react'

import { PostListAPIResponse, PostAPIResponse, PostBody, Post } from '../types/post'
import {
  fetchPosts as defaultFetchPosts,
  createPost as defaultCreatePost
} from '../api/post'

type PostPanelProps = {
  fetchPosts?: Promise<PostListAPIResponse>
  createPost?: Promise<PostAPIResponse>
}

import PostItem from './PostItem'

const PostPanel = ({
  fetchPosts = defaultFetchPosts,
  createPost = defaultCreatePost
}) => {
  const [posts, setPosts] = useState<Post>([])
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentDescription, setCurrentDescription] = useState('')

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async() => {
    try {
      const response = await fetchPosts()
      const responsePosts = response.data.map((post: PostAPIResponse) => {
        return post.attributes
      })
      setPosts(responsePosts)

    } catch {
      console.error('There was a network error')
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTitle(event.target.value)
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDescription(event.target.value)
  }

  const handleCreatePost = async () => {
    const body = {
      post: {
        title: currentTitle,
        description: currentDescription
      }
    }
    try {
      const response = await createPost(body)
      getPosts()
      setCurrentTitle('')
      setCurrentDescription('')
    } catch {
      console.error('There was an error')
    }
  }

  return(
    <div className='posts-dashboard'>
      <div className='posts'>
        {posts.map((post: Post, index: number) => (
          <PostItem postData={post} key={index} />
        ))}
        <input type='text' value={currentTitle} onChange={handleTitleChange}/>
        <textarea value={currentDescription} onChange={handleDescriptionChange} />
        <button type='button' onClick={handleCreatePost}>Create</button>

      </div>
    </div>
  )
}

export default PostPanel
