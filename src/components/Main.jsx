import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import RightBar from './RightBar';

const Main = ({onEntrySelect, entries, refreshEntries}) => {
  
  const [descShow, setDescShow] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  const boxRef = useRef(null);

  const newTaskClicked = () => {
    setDescShow(true);
    setButtonShow(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setDescShow(false);
        setButtonShow(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  //fech

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3000/saveNewEntry', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, createdAt: formatTime() })
      });
      setTitle('');
      setDescription('');
      refreshEntries();
      setDescShow(false)
    } catch (err) {
      console.error(err)
    }
  };

  const formatTime = () => {
    const d = new Date();
    const T =  `${String(d.toLocaleDateString([], { hour: '2-digit', minute: '2-digit',hour12: true}))}`
    
    return T.slice(11, T.length);
  }

  const handleEntry = (entry) =>{
    onEntrySelect(entry);
  }

  return (
    <div className='w-3/6 h-full rounded-3xl p-1 bg-white flex flex-col'>
      {/* Header */}
      <h1 className='font-bold text-3xl mb-4'>Today</h1>
      
      {/* Form */}
      <form onSubmit={handleSubmit} ref={boxRef} className="flex flex-col">
        {/* Title Input */}
        <span className='border border-gray-300 rounded-lg px-2 w-full flex items-center h-10 shadow-sm'>
          <FaPlus
            size={12}
            color='gray'
            className='cursor-pointer'
            onClick={newTaskClicked}
          />
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={newTaskClicked}
            className='ml-2 text-gray-600 text-sm w-full focus:outline-none'
            placeholder='Add New Task'
            required
          />
        </span>

        {/* Expandable section (textarea + button) */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${descShow ? 'max-h-52 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
        >
          <textarea
            value={description}
            placeholder='Description (optional)'
            onChange={(e) => setDescription(e.target.value)}
            className='w-full h-28 text-gray-600 border border-gray-300 rounded-lg p-2 text-sm resize-none shadow-sm'
          />
          <button
            type='submit'
            className={`w-20 mt-2 cursor-pointer h-8 rounded-lg bg-yellow-300 text-sm font-medium shadow-md transition-opacity duration-500 ${buttonShow ? 'opacity-100' : 'opacity-0'}`}
          >
            Save
          </button>
        </div>
      </form>

      {/* Entries Section */}
      <> {String(entries)  === '' && <div className='text-gray-400 w-full text-center mt-4'>No Entry To show</div>}</>
      <div className="flex flex-col w-full overflow-y-auto gap-2 mt-4">
        {entries.map((item) => (

          <div
            key={item._id}
            className="cursor-pointer flex items-center justify-between 
             border-b border-l rounded border-gray-400 p-2 pl-2 shadow-sm 
             hover:shadow-md transition-all  duration-300"
             onClick={() =>handleEntry(item)}
          >
            {/* Left side (title) */}
            <div className="font-bold text-[12px] text-gray-600">
              {item.title}
            </div>

            {/* Right side (time + arrow) */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-gray-400">
                {item.createdAt}
              </span>
              <FaArrowRight size={13} className="text-gray-500" />
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Main;
