import {useEffect, useState} from "react";

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReceiver, setSelectedReceiver] = useState("");
  const baseUrl = "http://127.0.0.1:8000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        setLoading(false);
        return;
    }

    const loadData = async () => {
      try {
        // 1. Current User
        const userRes = await fetch(`${baseUrl}/api/current_user/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setCurrentUser(userData);

        // 2. Supervisors
        const supRes = await fetch(`${baseUrl}/api/get_supervisors/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const supData = await supRes.json();
        if (Array.isArray(supData)) {
          setSupervisors(supData);
          if (supData.length > 0) setSelectedReceiver(String(supData[0].id));
        }

        setLoading(false);
      } catch (err) {
        console.error("Load error:", err);
        setLoading(false);
      }
    };

    loadData();

    // 3. Messages Polling
    const fetchMessages = () => {
      fetch(`${baseUrl}/api/messages/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setMessages(data);
        })
        .catch((err) => console.error(err));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = async () => {
    if (!text.trim() || !selectedReceiver) {
        alert("Please select a recipient and type a message.");
        return;
    }

    const selectedSupervisor = supervisors.find(
      (s) => String(s.id) === String(selectedReceiver)
    );
    const studentId = selectedSupervisor?.student_id;

    try {
        const res = await fetch(`${baseUrl}/api/messages/send/`, {
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

        if (res.ok) {
          const data = await res.json();
          setMessages((prev) => [...prev, data]);
          setText("");
        } else {
            const err = await res.json();
            alert(`Send failed: ${err.error || "Unknown error"}`);
        }
    } catch (e) {
        alert("Connection error while sending.");
    }
  };

  const isInternSupervisorLoggedIn = currentUser?.role === 'INTERN_SUPERVISOR';

  const filteredMessages = messages; // Academic and Intern Supervisors both see all messages in this view

  if (loading) return <div style={styles.container}>Connecting to server...</div>;

  return (
    <div style={styles.container}>

      <div style={styles.chatBox}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>Chat</h3>
          <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>
            {isInternSupervisorLoggedIn ? "with Academic Supervisor" : "Group Chat / All Messages"}
          </span>
        </div>

        <div style={styles.messages}>
          {filteredMessages.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888' }}>No messages found in this view.</p>
          ) : (
            filteredMessages.map((msg) => {
              const isMe = String(msg.sender) === String(currentUser?.id);
              
              return (
                <div
                  key={msg.id}
                  style={{
                    ...styles.message,
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe ? "#DCF8C6" : "#fff",
                    border: isMe ? "1px solid #c3e6cb" : "1px solid #ddd",
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '4px', color: isMe ? '#2e7d32' : '#1976d2' }}>
                     {isMe ? "YOU" : (msg.sender_name || "SUPERVISOR")}
                  </div>
                  <p style={{ margin: 0 }}>{msg.message}</p>
                </div>
              );
            })
          )}
        </div>

        {/* ONLY INTERN SUPERVISOR CAN SEND */}
        {isInternSupervisorLoggedIn ? (
          <div style={styles.inputBox}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={styles.button}>
              Send
            </button>
          </div>
        ) : (
          <div style={{ padding: '15px', textAlign: 'center', color: '#666', fontStyle: 'italic', background: '#f9f9f9', borderTop: '1px solid #ddd' }}>
             Academic Supervisor - View Only Mode
          </div>
        )}
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