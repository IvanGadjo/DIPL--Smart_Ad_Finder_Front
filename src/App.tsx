import React, {useState} from 'react';
import './App.css';
import Layout from './Layout';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { RenderUserInterestsInfoContext } from './utils/contexts/renderUserInterestsInfoContext';


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




  // * UseStates() for the context
  const [category, setCategory] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');
  const [showActiveUserInterests, setShowActiveUserInterests] = useState<boolean>(true);



  

  return (
    <>    
      {/* {console.log(websocketURL)} */}

     <RenderUserInterestsInfoContext.Provider value={{category, setCategory, region, setRegion, showActiveUserInterests, setShowActiveUserInterests}} >

      <Layout/>

     </RenderUserInterestsInfoContext.Provider>

    </>
  );
}

export default App;
