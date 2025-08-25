import React, { useState, useEffect } from 'react'
import SideBar from './components/SideBar'
import Main from './components/Main'
import RightBar from './components/RightBar'

const App = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries1, setEntries] = useState([]);
  
  const isUpdated = () => {
    fetchEntries();
  }


  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:3000/getEntries');
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className=' overflow-hidden h-screen w-full flex items-center justify-center bg-cyan-600'>
      <div className="h-[90%] gap-3 w-3/4 p-3 rounded-2xl bg-white flex flex-row">

        <SideBar />
        <Main onEntrySelect={setSelectedEntry} refreshEntries={fetchEntries} entries={entries1} />
        <RightBar entry={selectedEntry} onDelete={fetchEntries} onUpdate={isUpdated}/>
      </div>
    </div>
  )
}

export default App