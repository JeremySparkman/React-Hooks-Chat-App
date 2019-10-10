import React, { useState } from 'react'

function SendMessageForm(props) {
  const [message, setMessage] = useState('')

  function handleChange(e) {
    setMessage(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.sendMessage(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="send-message-form">
      <input
        placeholder="Enter a message here"
        type="text" 
        onChange={handleChange}
        value={message}
      />
    </form>
  )
}

export default SendMessageForm