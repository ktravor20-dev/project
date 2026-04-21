import { useEffect, useState } from "react";
import axios from "axios";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/messages/");
      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Messages</h2>

      {loading && <p>Loading messages...</p>}

      {!loading && messages.length === 0 && (
        <p>No messages found</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((msg) => (
          <li
            key={msg.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}
          >
            <p><strong>From:</strong> {msg.sender}</p>
            <p>{msg.content}</p>
            {msg.created_at && (
              <small>{new Date(msg.created_at).toLocaleString()}</small>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Messages;