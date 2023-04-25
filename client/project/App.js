import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [hours, setHours] = useState("");
  const [postal, setPostal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);

  async function fetchMessage() {
    const response = await fetch(`http://localhost:5555/`);
    const message = await response.text();
    setMessage(message);
  }

  async function handleLogin() {
    const response = await fetch(`http://localhost:5555/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const user = await response.json();
    if (user) {
      setIsLoggedIn(true);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCellPhone(user.cellPhone);
      setHours(user.Hours);
      setPostal(user.Postal);
    } else {
      alert("Invalid email or password");
    }
  }

  async function handleNewAccount() {
    const response = await fetch(`http://localhost:5555/new-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        cellPhone,
        hours,
        postal,
      }),
    });
    const user = await response.json();
    if (user) {
      setIsNewAccount(false);
      setIsLoggedIn(true);
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setCellPhone(user.cellPhone);
      setHours(user.hours);
      setPostal(user.postal);
    } else {
      alert("Could not create new account");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setCellPhone("");
    setHours("");
    setPostal("");
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        {isNewAccount ? (
          <>
            <Text>First Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setFirstName(text)}
              value={firstName}
            />
            <Text>Last Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLastName(text)}
              value={lastName}
            />
            <Text>Cell Phone:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCellPhone(text)}
              value={cellPhone}
            />
            <Text>Hours:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setHours(text)}
              value={hours}
            />
            <Text>Postal Address:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPostal(text)}
              value={postal}
            />
            <Button title="Create New Account" onPress={handleNewAccount} />
            <Button title="Cancel" onPress={() => setIsNewAccount(false)} />
          </>
        ) : (
          <>
            <Button title="Login" onPress={handleLogin} />
            <Button
              title="Create New Account"
              onPress={() => setIsNewAccount(true)}
            />
          </>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Welcome, {firstName}!</Text>
        <Text>Email: {email}</Text>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Text>Cell Phone:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCellPhone(text)}
          value={cellPhone}
        />
        <Text>Hours:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setHours(text)}
          value={hours}
        />
        <Text>Postal Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPostal(text)}
          value={postal}
        />
        <Button title="Save Changes" onPress={() => alert("Changes saved!")} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 10,
    width: "80%",
  },
});
