import React, { useEffect, useRef, useState } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import socketIOClient, { Socket } from 'socket.io-client';

import ContactList from './src/screens/ContactList';
import ContactChat from './src/screens/ContactChat';

const baseUrl = 'http://localhost:1234';

const socket = socketIOClient(baseUrl);

const Stack = createStackNavigator();

const App = () => {
  const firstLoad = useRef(false);
  const [user, changeUser] = useState({});
  const [chats, changeChats] = useState({});

  useEffect(() => {
    if (firstLoad.current) {
      async function getUser() {
        if (await AsyncStorage.getItem('USER')) {
          changeUser(JSON.parse(await AsyncStorage.getItem('USER')));
          changeChats(JSON.parse(await AsyncStorage.getItem('CHATS')));

          socket.emit('setup', JSON.parse(await AsyncStorage.getItem('USER')));
        } else {
          await fetch(baseUrl + '/register').then((resp) =>
            resp.json().then(async (response) => {
              await AsyncStorage.setItem('USER', JSON.stringify(response));

              await AsyncStorage.setItem('CHATS', JSON.stringify({}));

              changeUser(response);

              socket.emit('setup', response);
            })
          );
        }
      }

      getUser();

      firstLoad.current = false;
    }

    socket.on('chat', async (chat) => {
      let chatHandler = JSON.parse(await AsyncStorage.getItem('CHATS'));

      if (chatHandler[chat.from] === undefined) {
        chatHandler[chat.from] = { chat: [] };
      }

      chatHandler[chat.from]['chat'].push({
        from: chat.from,
        content: chat.content,
      });

      await AsyncStorage.setItem('CHAT', JSON.stringify(chatHandler));
      changeChats(chatHandler);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactList" options={{ headerShown: false }}>
          {(props) => (
            <ContactList
              {...props}
              baseUrl={baseUrl}
              user={user}
              chats={chats}
              onSendNewMessage={async (id, message) => {
                socket.emit('chat', {
                  to: id,
                  content: message,
                });

                let chatHandler = JSON.parse(
                  await AsyncStorage.getItem('CHATS')
                );

                if (chatHandler[id] === undefined) {
                  chatHandler[id] = { chat: [] };
                }

                chatHandler[id]['chat'].push({
                  from: user.id,
                  content: message,
                });

                await AsyncStorage.setItem('CHAT', JSON.stringify(chatHandler));
                changeChats(chatHandler);
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ContactChat" options={{ headerShown: false }}>
          {(props) => (
            <ContactChat
              {...props}
              baseUrl={baseUrl}
              user={user}
              chats={chats}
              onSendChat={async (id, message) => {
                socket.emit('chat', {
                  to: id,
                  content: message,
                });

                let chatHandler = JSON.parse(
                  await AsyncStorage.getItem('CHATS')
                );

                chatHandler[id]['chat'].push({
                  from: user.id,
                  content: message,
                });

                await AsyncStorage.setItem(
                  'CHATS',
                  JSON.stringify(chatHandler)
                );
                changeChats(chatHandler);
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
