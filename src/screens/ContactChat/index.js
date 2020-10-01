import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import styles from './styles';

const ContactChat = ({
  route,
  navigation,
  baseUrl,
  user,
  chats,
  onSendChat,
}) => {
  const [message, changeMessage] = useState('');

  return (
    <View style={styles.App}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBack}
          onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          style={styles.contactPhoto}
          source={{ uri: baseUrl + '/avatar/' + route.params?.contact }}
        />
        <Text style={styles.contactId}>{route.params?.contact}</Text>
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={{ alignItems: 'center' }}
        data={chats[route.params?.contact]['chat']}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.message,
              justifyContent: item.from === user.id ? 'flex-end' : 'flex-start',
            }}>
            <View
              style={{
                ...styles.balloon,
                backgroundColor: item.from === user.id ? '#d2d2d2' : '#727bff',
              }}>
              <Text>{item.content}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item + Math.random()}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => changeMessage(e)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => onSendChat(route.params?.contact, message)}>
          <Text style={{ color: '#fff' }}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactChat;
