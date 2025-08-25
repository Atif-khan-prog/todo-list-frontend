import React, { useState, useEffect } from 'react'

const RightBar = ({ entry, onDelete, onUpdate }) => {
  const [activeField, setActiveField] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Keep local inputs in sync whenever a new entry is selected
  useEffect(() => {
    if (entry) {
      setTitle(entry.title || '');
      setDescription(entry.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [entry]);

  const deleteEntry = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteEntry/${id}`, {
        method: "DELETE",
      });
      console.log(await res.json());
      onDelete?.();
    } catch (err) {
      console.log(err);
    }
  };

  const editEntry = async (id, title, description) => {
    try {
      const res = await fetch('http://localhost:3000/editEntry', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title, description })
      });
      const message = await res.json();
      if (message.ok) {
        console.log('Update successfully');
        setActiveField(false); // exit edit mode after save
      } else {
        console.log('Update failed:', message.message);
      }
      onUpdate();
    } catch (err) {
      console.log(err);
    }
  };

  if (!entry) {
    return <div className="min-h-full w-4/9 bg-gray-100 rounded-2xl p-3"> Slect Entry to see Details</div>;
  }

  const fieldActivate = () => {
    // when entering edit mode, ensure fields are filled from the current entry
    if (!activeField) {
      setTitle(entry.title || '');
      setDescription(entry.description || '');
    }
    setActiveField(!activeField);
  };

  return (
    <div className="min-h-full w-4/9 bg-gray-100 transition-all duration-500 ease-in-out rounded-2xl p-3">
      <h3 className="font-semibold">Task:</h3>
      <div className="mt-3">
        <div className="border-gray-400 border w-full p-1 text-[12px] font-semibold rounded text-gray-600">
          <input
            type="text"
            name="title"
            className="w-full p-1 text-[12px] rounded focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!activeField}
          />
        </div>

        <textarea
          className="border-gray-400 border w-full h-28 mt-2 rounded text-gray-500 text-[12px] font-semibold resize-none outline-none p-1"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          readOnly={!activeField}
        />

        <div className="h-full w-full flex items-end justify-around">
          <button
            onClick={() => deleteEntry(entry._id)}
            className="w-20 mt-2 cursor-pointer h-8 rounded-lg bg-yellow-300 text-sm font-medium shadow-md"
          >
            Delete
          </button>

          <button
            onClick={fieldActivate}
            className={`w-24 mt-2 cursor-pointer transition-all duration-500 ease-in-out ${activeField ? 'bg-green-300' : ' bg-yellow-300'} ml-3 h-8 rounded-lg text-sm font-medium shadow-md`}
          >
            {activeField ? 'Cancel' : 'Edit'}
          </button>

          <button
            onClick={() => editEntry(entry._id, title, description)}
            className={`w-24 mt-2 cursor-pointer transition-all duration-500 ease-in-out ml-3 h-8 rounded-lg text-sm font-medium shadow-md bg-yellow-300 ${activeField ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
          >
            SaveChanges
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
