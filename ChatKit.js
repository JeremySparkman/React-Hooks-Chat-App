// Commented out my credentials, feel free to start an account on Chatkit to create your own Chat App!
const tokenUrl = // enter your tokenUrl;
const instanceLocator = //enter your instance locator;

const ChatManager = new Chatkit.ChatManager({
  instanceLocator,
  userId: //enter your unique ID,
  tokenProvider: new Chatkit.TokenProvider({
    url: tokenUrl
  })
})

export default ChatManager