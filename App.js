import React, { useState, useEffect } from 'react'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import ChatManager from './ChatKit'

function App() {
  const [messages, setMessages] = useState([])
  const [joinableRooms, setJoinableRooms] = useState([])
  const [joinedRooms, setJoinedRooms] = useState([])
  const [roomId, setRoomId] = useState(null)

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = () => {
    ChatManager.connect().then(currentUser => {
        currentUser.getJoinableRooms()
        .then(joinableRooms => {
          setJoinableRooms(joinableRooms)
          setJoinedRooms(currentUser.rooms)
        })
        .catch(err => console.log(`Error getting joinable rooms: ${err}`))
    })
  }

  const subscribeToRoom = (roomId) => {
    setMessages([])
    ChatManager.connect().then(currentUser => {
      currentUser.subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            setMessages(prevMessages => [...prevMessages, message])
          }
        }
      }).then(room => {
        setRoomId(room.id)
        getRooms()
      })
      .catch(err => console.log('error subscribing to room: ', err))
    })
  }

  const sendMessage = text => {
    ChatManager.connect().then(currentUser => {
      currentUser.sendSimpleMessage({
        text,
        roomId: roomId
      })
    })
  }

  const createRoom = (roomName) => {
    ChatManager.connect().then(currentUser => {
      currentUser.createRoom({
        name: roomName
      })
      .then(room => {
        subscribeToRoom(room.id)
      })
      .catch(err => console.log("Error creating new room", err))
    })
  }

  return (
    <div className="app">
      <RoomList 
        roomId={roomId}
        subscribeToRoom={subscribeToRoom}
        rooms={[...joinableRooms, ...joinedRooms]}
      />
      <MessageList messages={messages}/>
      <SendMessageForm sendMessage={sendMessage}/>
      <NewRoomForm createRoom={createRoom}/>
    </div>
  )
}

export default App