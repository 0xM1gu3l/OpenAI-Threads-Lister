import React, { useState, useEffect } from "react";
import { getThreadList } from "~loadThreads";
import WebFont from 'webfontloader'

function IndexPopup() {
  const storedToken = localStorage.getItem('openai-token');
  const [token, setToken] = useState(storedToken || '');

  const [data, setData] = useState([]);
  const [selectedThread, setSelectedThread] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins']
      }
    });
   }, []);

  useEffect(() => {
    if (!token) {
      const inputToken = window.prompt("First Time Setup: Enter your OpenAI Session Token");
      if (inputToken) {
        setToken(inputToken);
        localStorage.setItem('openai-token', inputToken);
      }
    }
  }, [token]);

  const handleSettingsClick = () => {
    setCurrentPage('settings');
  };

  const handleOpenChat = () => {
    if (selectedThread) {
      console.log(`Thread: ${selectedThread}`)
      window.open(`https://platform.openai.com/playground?thread=${selectedThread}`);
    }
  };

  const handleThreadSelection = (e) => {
    setSelectedThread(e.target.value);
  };

  useEffect(() => {
    if (token) {
      getThreadList(token)
        .then((res) => {
          const threadsArray = res.data.data || [];
          setData(threadsArray);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token]);

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleSaveKey = () => {
    localStorage.setItem('openai-token', token);
    window.location.reload()
    // setCurrentPage('home');
  };

  return (
    <div style={styles.container} className="fontLoader">
      <button style={styles.configButton} onClick={handleSettingsClick}>Configs</button>
      <h2 style={styles.heading}>OpenAI Threads Lister</h2>
      {loading ? (
        <div style={styles.loading}>Loading threads...</div>
      ) : (
        <div style={styles.threads}>
          <select className="threadsList" style={styles.select} onChange={handleThreadSelection}>
            {data.map((thread) => (
              <option key={thread.id} value={thread.id}>
                {`${thread.id} - ${new Date(
                  thread.created_at * 1000
                ).toDateString()}`}
              </option>
            ))}
          </select>
        </div>
      )}
      <button style={styles.openChatButton} onClick={handleOpenChat}>
        Open chat in browser
      </button>
      {currentPage === 'settings' && (
        <div style={styles.settingsContainer}>
          <h2>Settings</h2>
          <div style={styles.settingsContent}>
            <label htmlFor="sessKeyInput" style={styles.label}>Enter your OpenAI Session Token:</label>
            <input
              type="text"
              id="sessKeyInput"
              value={token}
              onChange={handleTokenChange}
              style={styles.input}
              placeholder="Enter your OpenAI Session Token"
            />
            <button style={styles.saveButton} onClick={handleSaveKey}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minWidth: 500,
    minHeight: 450,
    padding: 16,
    fontFamily: 'Poppins, sans-serif',
    // border: '1px solid #ccc',
    // borderRadius: 8,
  },
  configButton: {
    justifyContent: "end",
    marginBottom: 10,
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  heading: {
    fontSize: 20,
    margin: '10px 0',
  },
  loading: {
    fontStyle: 'italic',
    marginBottom: 25,
    color: '#888',
  },
  threads: {
    marginBottom: 20,
  },
  select: {
    width: '100%',
  },
  openChatButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  settingsContainer: {
    marginTop: 20,
    padding: 12,
    border: '1px solid #ccc',
    borderRadius: 8,
  },
  settingsContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
    padding: 8,
    width: '97%',
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default IndexPopup;
