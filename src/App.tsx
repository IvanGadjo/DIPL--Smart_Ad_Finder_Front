import React from 'react';
import './App.css';
import Layout from './Layout';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const websocketURL: string = process.env.REACT_APP_WEB_SOCKET_URL as string;


function App() {



  // * Connect to websocket with sockjs-client 
  let sockJSClient = new SockJS(websocketURL);
  let msgCounter: number = 0;

  let stompClient = Stomp.over(sockJSClient);
  stompClient.debug = () => null;     // ? Disable debugging & message logs in console

  sockJSClient.onopen = function() {
    console.log('==> Websocket connection open');
  }

  stompClient.connect({}, (frame) => {
    console.log('===> Connected: ' + frame);

    stompClient.subscribe('/topic/group', (message: Stomp.Message) => {     // * Receive messages

      // console.log(JSON.parse(message.toString()))
      // console.log(JSON.parse(message.body).content)

      console.log('MESSAGE NUMBER: ' + ++msgCounter);
      console.log(JSON.parse(message.body))


    });
 });


  

  return (
    <>    {console.log(websocketURL)}

      <Layout/>
    </>
  );
}

export default App;
