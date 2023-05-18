import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

// const endPoint = 'http://localhost:5550'


// const App = () => {
//   //It is advisible for us not to use the useState hook to set our connection to state as it resets our connection to state whenever we make a change to our app. to prevent this, we can use a useRef hook
//   // const [socket, setSocket] = useState("")
//   let socket = useRef()
//   //useRef will help us get the current value of our connection. We  wouldn't have unnecessary connections and disconnections while using it unlike useEffect

//   //Emitting events in socket.io
//   const [message, setMessage] = useState("")
//   const [receivedMessage, setReceivedMessage] = useState([])
//   useEffect(() => {
//     // setSocket(io(endPoint))
//     socket.current = io(endPoint)
//   }, [])

//   useEffect(() => {
//     //Listening for events in socket.io and receiving messages from the server
//     if (socket.current) { // check if socket.current is not null ie if we have a connection
//       socket.current.on("broadcast", (message) => {
//         console.log(message)
//         setReceivedMessage([...receivedMessage, message])
//       })
//     }
//   })
//   //Since we are not making any request while sending the message, we will be emitting an event to the server. We will be using the socket.emit method to emit an event to the server. The first argument is the name of the event and the second argument is the data we want to send to the server. We will be sending the message to the server. we will be using the .on method to listen for the event we emitted from the server. The first argument is the name of the event and the second argument is a callback function that will be called when the event is emitted from the server.
//   //Also, emit is used to send a message to the client and on is used to receive a message from the client
//   const sendMessage = () => {
//     console.log(message)
//     socket.current.emit("message", message)
//     setMessage("")
//   }
//   return (
//     <div>
//       <h1>React Chat App</h1>
//       <div className="messages">
//         {receivedMessage.map((message, index) => (
//           <p key={index}>{message}</p>
//         ))}
//       </div>

//       <input type='text' onChange={(e) => setMessage(e.target.value)} />
//       <button type="submit" onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default App;


const App = () => {
  const endPoint = 'http://localhost:5550'
  // const [socket, setSocket] = useState("")
  const [message, setMessage] = useState("") //state for the message we want to send
  const [receivedMessage, setReceivedMessage] = useState([]) //state for the message we want to receive
  let socket = useRef()
  // console.log(socket)
  useEffect(() => {
    // setSocket(io(endPoint))
    socket.current = io(endPoint)
    console.log(socket)
  }, [])

  const sendMessage = () => {
    socket.current.emit("message", message)
  }
  useEffect(() => {
    if (receivedMessage) {
      socket.current.on("broadcast", (message)=>{
        setReceivedMessage([...receivedMessage, message])
      })
    }
  }, [receivedMessage])
  return (
    <>
      <h1>React Chat App</h1>
      <div className="messages">
        {
          receivedMessage.map((message, i) => (
            <p key={i}>{message}</p>
          ))
        }
        <input type='text' onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send chat</button>
      </div>

    </>
  )
}
export default App;

