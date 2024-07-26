import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../../components/navbar/Navbar';
import Modal from './Modal';

interface Message {
  id: number;
  text: string;
  isSent: boolean;
  group: string;
}

const ChatPage: React.FC = () => {
  const [groups, setGroups] = useState<string[]>([
    'Code Collab Group',
    'UUID Open-source Group',
    'Flask Open-source Group',
  ]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>('Code Collab Group');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello everyone!', isSent: false, group: 'Code Collab Group' },
    { id: 2, text: 'Hi! How are you?', isSent: true, group: 'Code Collab Group' },
    { id: 3, text: 'Doing great, thanks!', isSent: false, group: 'UUID Open-source Group' },
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleLeaveGroup = () => {
    if (selectedGroup === null) return;
    const groupIndex = groups.indexOf(selectedGroup);
    const newGroups = groups.filter(group => group !== selectedGroup);

    if (newGroups.length > 0) {
      const nextGroupIndex = groupIndex === newGroups.length ? groupIndex - 1 : groupIndex;
      setSelectedGroup(newGroups[nextGroupIndex]);
    } else {
      setSelectedGroup(null);
    }

    setGroups(newGroups);
    setShowModal(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, isSent: true, group: selectedGroup! },
      ]);
      setNewMessage('');
    } else {
      toast.error('You cannot send an empty message', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="mt-10 flex flex-1 overflow-hidden"> {/* Added margin-top here */}
        <div className="bg-gray-800 w-64 h-full flex flex-col p-4">
          <h3 className="text-white mb-4 text-left font-semibold">Groups</h3>
          <div className="space-y-2 text-left">
            {groups.map(group => (
              <p
                key={group}
                className={`text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer p-2 rounded ${
                  selectedGroup === group ? 'bg-gray-700 text-white' : ''
                }`}
                onClick={() => setSelectedGroup(group)}
              >
                {group}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-gray-100">
          {selectedGroup ? (
            <>
              <div className="p-4 bg-white flex items-center justify-between border-b border-gray-300">
                <h2 className="text-xl font-semibold">{selectedGroup}</h2>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setShowModal(true)}
                >
                  Leave
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages
                  .filter(message => message.group === selectedGroup)
                  .map((message) => (
                    <div
                      key={message.id}
                      className={`mb-2 p-2 rounded-full text-sm max-w-xs ${
                        message.isSent ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'
                      }`}
                      style={{ alignSelf: message.isSent ? 'flex-end' : 'flex-start' }}
                    >
                      {message.text}
                    </div>
                  ))}
              </div>
              <div className="p-4 bg-white flex items-center">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-md"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-gray-500">You are not part of any groups</p>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLeaveGroup}
      />
      <ToastContainer />
    </div>
  );
};

export default ChatPage;
