import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  const [message, setMessage] = useState('')

  async function fetchMessage() {
    const response = await fetch(`http://localhost:5555/`);
    const message = await response.text();
    setMessage(message);
  }

  return (
    <View style={styles.container}>
      <Text>Message will appear below:</Text>
      <Text style={styles.text}>{message}</Text>
      <Button title="Fetch Message" onPress={fetchMessage} />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
