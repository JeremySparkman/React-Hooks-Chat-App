import React, {useState} from 'react'

function NewRoomForm(props) {
  const [roomName, setRoomName] = useState('')

  function handleChange(e) {
    setRoomName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.createRoom(roomName)
    setRoomName('')
  }

  return (
      <div className="new-room-form">
          <form onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                type="text" 
                placeholder="Create a room"
                value={roomName}
                required />
              <button id="create-room-btn" type="submit">+</button>
          </form>
      </div>
  )
}

export default NewRoomForm