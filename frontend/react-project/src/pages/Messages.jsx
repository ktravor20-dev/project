import {useEffect, useState} from "react";

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/messages/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:8000/api/get_supervisors/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSupervisors(data);
          if (data.length > 0) {
            setSelectedReceiver(data[0].id);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const sendMessage = async () => {
    if (!text.trim() || !selectedReceiver) return;

    const selectedSupervisor = supervisors.find(
      (s) => s.id === Number(selectedReceiver) || s.id === String(selectedReceiver)
    );
    const studentId = selectedSupervisor?.student_id;

    const res = await fetch("http://127.0.0.1:8000/api/messages/send/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        message: text,
        receiver: selectedReceiver,
        student: studentId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessages([...messages, data]); // instantly show new message
      setText("");
    } else {
      console.error("Error sending message:", data);
      alert(data.error || "Failed to send message. Ensure the intern supervisor has an assigned student.");
    }
  };

  // Only show messages where the selected receiver is either the sender or receiver
  const filteredMessages = messages.filter((msg) => {
    if (!selectedReceiver) return false;
    const receiverId = String(selectedReceiver);
    return String(msg.sender) === receiverId || String(msg.receiver) === receiverId;
  });

  const isInternSupervisorLoggedIn = supervisors.length > 0 && supervisors[0].role === 'ACADEMIC_SUPERVISOR';

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Chat</h3>
          {isInternSupervisorLoggedIn ? (
            <span style={{ fontWeight: 'bold', marginLeft: '5px', fontSize: '1.17em' }}>
              with Academic Supervisor
            </span>
          ) : (
            <select
              value={selectedReceiver}
              onChange={(e) => setSelectedReceiver(e.target.value)}
              style={styles.select}
            >
              <option value="" disabled>Select a recipient</option>
              {supervisors.map((supervisor) => (
                <option key={supervisor.id} value={supervisor.id}>
                  {supervisor.first_name} {supervisor.last_name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div style={styles.messages}>
          {filteredMessages.map((msg) => (
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
  header: {
    padding: "15px",
    borderBottom: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    outline: "none",
    maxWidth: "200px",
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