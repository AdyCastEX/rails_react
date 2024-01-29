import React from 'react'
	import { Post } from '../types/post'

	export type PostItemProps = {
	  postData: Post
	}

	const PostItem = ({postData}: PostItemProps) => {
	  return(
	    <div className='post'>
	      <h2>{postData.title}</h2>
	      <p>{postData.description}</p>
	    </div>
	  )
	}

	export default PostItem
