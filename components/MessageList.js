import React, {useEffect} from 'react'
import Message from './Message'

function MessageList(props) {

  const ref = React.createRef()

  useEffect(() => {
    const messageList = ref.current
    const shouldScrollToBottom = messageList.scrollTop + messageList.clientHeight + 200 >= messageList.scrollHeight
    if (shouldScrollToBottom) {
      messageList.scrollTop = messageList.scrollHeight
    }
  })

  return (
      <div className="message-list" ref={ref}>
          {props.messages.map(message => {
              return (
                <Message 
                  key={message.id}
                  text={message.parts[0].payload.content} 
                  username={message.senderId}
                />
              )
          })}
      </div>
  )
}

export default MessageList