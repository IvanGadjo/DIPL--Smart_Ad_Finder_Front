import React, { useEffect } from 'react';
import './App.css';
import Layout from './Layout';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useUI_ZustandStore } from "./utils/zustandStores/userInterestsStore";
import shallow from 'zustand/shallow';



const websocketURL: string = process.env.REACT_APP_WEB_SOCKET_URL as string;





function App() {

  const [ setUserInterests, 
          addUserInterest, 
          addFoundAdvert,
          userInterests ] = useUI_ZustandStore(state => [state.setUserInterests, state.addUserInterest, state.addFoundAdvert, state.userInterests], shallow);

         

  useEffect(() => {

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

        addFoundAdvert(JSON.parse(message.body));     // * Dobro se polnat

      });
    });
  }, []);


  (function(){
    console.log('EDNASKA')
  }());
  
  




  return (
    <>    
    
      <Layout/>

    </>
  );
}

export default App;
