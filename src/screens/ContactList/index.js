import React, { useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from './styles';

const ContactList = ({
  navigation,
  baseUrl,
  user,
  chats,
  onSendNewMessage,
}) => {
  const [id, changeId] = useState('');
  const [message, changeMessage] = useState('');

  const [modal, toggleModal] = useState(false);

  return (
    <View>
      <Modal transparent visible={modal}>
        <View style={styles.modalBackground}>
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              placeholder="Id do usuário"
              onChangeText={(e) => changeId(e)}
            />
            <TextInput
              style={styles.input}
              placeholder="Messagem"
              onChangeText={(e) => changeMessage(e)}
            />
            <TouchableOpacity onPress={() => onSendNewMessage(id, message)}>
              <Text>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleModal(false)}>
              <Text>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar backgroundColor="#727BFF" style="light" translucent />
      <View style={styles.header}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: baseUrl + '/avatar/' + user.id && user.id + '.jpg' }}
        />
        <Text style={styles.profileId}>{user.id && user.id}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={Object.keys(chats).length > 0 ? Object.keys(chats) : []}
        renderItem={({ item }) => (
          <TouchableOpacity
            styles={styles.contact}
            onPress={() =>
              navigation.navigate('ContactChat', { contact: item })
            }>
            <Image
              style={styles.contactPhoto}
              source={{ uri: baseUrl + '/avatar/' + item + '.jpg' }}
            />
            <Text style={styles.contactId}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => toggleModal(true)}></TouchableOpacity>
    </View>
  );
};

export default ContactList;
