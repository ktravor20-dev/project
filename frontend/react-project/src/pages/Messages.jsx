import { useEffect, useState } from "react";

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/messages/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));
  }, []);

  // 📤 send message
  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await fetch("http://127.0.0.1:8000/api/messages/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: text,
        receiver: 2, // ⚠️ replace later with dynamic user selection
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessages([...messages, data]); // instantly show new message
      setText("");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <h3>Chat</h3>

        <div style={styles.messages}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                alignSelf: msg.is_sender ? "flex-end" : "flex-start",
                backgroundColor: msg.is_sender ? "#DCF8C6" : "#fff",
              }}
            >
              <p style={{ margin: 0 }}>{msg.message}</p>
            </div>
          ))}
        </div>

        <div style={styles.inputBox}>
          <input
            type="text"
            value={text}
            placeholder="Type a message..."
            onChange={(e) => setText(e.target.value)}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messaging;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  chatBox: {
    width: "400px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    height: "500px",
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #ccc",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};