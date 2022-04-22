import React from 'react';
import './App.css';
import Layout from './Layout';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const websocketURL: string = process.env.REACT_APP_WEB_SOCKET_URL as string;


function App() {



  // * Connect to websocket with sockjs-client 
  let sockJSClient = new SockJS(websocketURL);

  let stompClient = Stomp.over(sockJSClient);
  stompClient.debug = () => null;     // ? Disable debugging & message logs in console

  sockJSClient.onopen = function() {
    console.log('open');
  }

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/group', function (message) {     // * Receive messages
      console.log(message);
      //you can execute any function here
    });
 });


  

  return (
    <>    {console.log(websocketURL)}

      <Layout/>
    </>
  );
}

export default App;
