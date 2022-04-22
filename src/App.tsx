import React from 'react';
import './App.css';
import Layout from './Layout';
// import StompClient from "react-stomp-client";
// import {IMessage} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
// import io from 'socket.io-client';


const websocketURL: string = process.env.REACT_APP_WEB_SOCKET_URL as string;


function App() {

  // * Za so react-stomp-client
  // const onMessageReceived = (msg: any) => {
  // const onMessageReceived = (msg: IMessage) => {
  //   console.log("=== Websocket Message Received", msg);
  // }


  // * Za so sockjs-client ===> Ne prima messages
  // let sockJSClient = new SockJS(websocketURL);     // ? Mislam deka treba plus da ima /topic/group

  // sockJSClient.onopen = function() {
  //   console.log('open');
  //   sockJSClient.send('test');
  // };

  // sockJSClient.onmessage = function(e) {
  //     console.log('message', e.data);
  //     sockJSClient.close();
  // };

  // sockJSClient.onclose = function() {
  //     console.log('close');
  // };

  // * Za so socket.io-client ===> Blocked by CORS
  // let sock = io(websocketURL);
  // sock.on("event://get-message", (msg) => {
  //   console.log(msg)
  // })







  // * Za so sockjs-client 2 obid ===> Raboti !!!
  let sockJSClient = new SockJS(websocketURL);

  let stompClient = Stomp.over(sockJSClient);
  stompClient.debug = () => null;     // ? Disable debugging & message logs in console

  sockJSClient.onopen = function() {
    console.log('open');
  }

  stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/group', function (greeting) {
      console.log(greeting);
      //you can execute any function here
    });
 });


  

  return (
    <>    {console.log(websocketURL)}

      {/* <StompClient
        endpoint={websocketURL}
        topic="/topic/group"
        onMessage={onMessageReceived}
      >
        <Layout/>
      </StompClient> */}


      <Layout/>
    </>
  );
}

export default App;
