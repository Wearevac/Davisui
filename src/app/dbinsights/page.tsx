"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Dbinsights.module.css';

export default function DbInsights() {
  const [username, setUsername] = useState('');
  const [dbType, setDbType] = useState('');
  const [connectionString, setConnectionString] = useState('');
  // const [hostname, setHostname] = useState('');
  const [dbusername, setdbUsername] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [dbpassword, setPassword] = useState('');
  const [database, setDatabase] = useState(''); 
  // const [dbName, setDbName] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('username');
    router.push('/');
  };
  // Mock simulation
  // const handleDbConnect = () => {
  //   // Simulating DB connection and fetching tables
  //   const mockTables = ['users', 'products', 'orders', 'customers', 'inventory', 'suppliers'];
  //   setTables(mockTables);
  //   setMessages(prev => [...prev, { role: 'system', content: 'Database connected successfully. Please select a table.' }]);
  // };

  const handleDbConnect = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dbType,
          host,
          port,
          dbusername,
          dbpassword,
          database,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the database');
      }

      const data = await response.json();
      setTables(data.tables);
      setMessages(prev => [...prev, { role: 'system', content: 'Database connected successfully. Please select a table.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'system', content: `Error: ${(error as Error).message}` }]);
    }
  };

  const handleTableSelect = (table: string) => {
    setSelectedTable(table);
    setMessages(prev => [...prev, { role: 'system', content: `Table "${table}" connected. You can now ask questions about this table.` }]);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { role: 'user', content: input }]);
      // Here you would typically send the input to your AI and get a response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: `Here's some insight about the "${selectedTable}" table based on your question: "${input}"` }]);
      }, 1000);
      setInput('');
    }
  };

  const filteredTables = tables.filter(table => 
    table.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.title}>DaVis-Explore</div>
        <div className={styles.userInfo}>
          <span>{username}</span>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={`${styles.sidebar} ${isSidebarMinimized ? styles.minimized : ''}`}>
          <button onClick={() => setIsSidebarMinimized(!isSidebarMinimized)} className={styles.minimizeButton}>
            {isSidebarMinimized ? '>' : '<'}
          </button>
          <div className={styles.sidebarContent}>
            <h3 className={styles.sidebarTitle}>Database Connection</h3>
            <select value={dbType} onChange={(e) => setDbType(e.target.value)} className={styles.dbSelect}>
              <option value="">Select DB Type</option>
              <option value="mysql">MySQL</option>
              <option value="oracle">Oracle</option>
              <option value="postgresql">PostgreSQL</option>
            </select>
            {dbType && (
              <div className={styles.connectionForm}>
                          <input
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  placeholder="Host"
                  className={styles.dbInput}
                />
                <input
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  placeholder="Port"
                  className={styles.dbInput}
                />
                <input
                  type="text"
                  value={dbusername}
                  onChange={(e) => setdbUsername(e.target.value)}
                  placeholder="Username"
                  className={styles.dbInput}
                />
                <input
                  type="password"
                  value={dbpassword}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={styles.dbInput}
                />
                <input
                  type="text"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  placeholder="Database Name"
                  className={styles.dbInput}
                />
                <button onClick={handleDbConnect} className={styles.connectButton}>Connect</button>
              </div>
            )}
            {tables.length > 0 && (
              <div className={styles.tableSection}>
                <h3 className={styles.sidebarTitle}>Tables</h3>
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="Search tables..."
                  className={styles.searchInput}
                />
                <div className={styles.tableList}>
                  {filteredTables.map(table => (
                    <button key={table} onClick={() => handleTableSelect(table)} className={styles.tableButton}>
                      {table}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div key={index} className={`${styles.message} ${styles[message.role]}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your data..."
              className={styles.chatInput}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}
