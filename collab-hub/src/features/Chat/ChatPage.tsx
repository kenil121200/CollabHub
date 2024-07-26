import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pusher from '../../config/PusherService';
import Modal from './Modal';
import { getAuthenticaticatedUser } from "../../context/FetchUser"

interface User {
  username: string;
  name: string;
}

interface Group {
  id: string;
  name: string;
}

interface Message {
  _id: number;
  message: string;
  isSent: boolean;
  groupId: string;
  user: User;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Code Collab Group' },
    { id: '2', name: 'UUID Open-source Group' },
    { id: '3', name: 'Flask Open-source Group' },
  ]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(groups[0]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const user = getAuthenticaticatedUser()
  console.log(user)
  const currentUser: User = { username: user.login, name: user.name };
  console.log(currentUser)

  useEffect(() => {
    if (selectedGroup) {
      // Fetch initial messages
      axios.get(`http://localhost:8081/chat/messages/${selectedGroup.id}`).then(response => {
        console.log(response.data)
        setMessages(response.data);
      });

      // Subscribe to Pusher channels
      const channel = pusher.subscribe(selectedGroup.id);

      channel.bind('message', (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [selectedGroup]);

  const handleLeaveGroup = () => {
    if (selectedGroup === null) return;
    const groupIndex = groups.indexOf(selectedGroup);
    const newGroups = groups.filter(group => group.id !== selectedGroup.id);

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
    if (newMessage.trim() && selectedGroup) {
      const message: Message = {
        _id: messages.length + 1,
        message: newMessage,
        isSent: true,
        groupId: selectedGroup.id,
        user: currentUser,
        timestamp: new Date(),
      };

      axios.post('http://localhost:8081/chat/message', message).then(response => {
        setNewMessage('');
      }).catch(error => {
        toast.error('Error sending message', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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
      <div className="mt-10 flex flex-1 overflow-hidden">
        <div className="bg-gray-800 w-64 h-full flex flex-col p-4">
          <h3 className="text-white mb-4 text-left font-semibold">Groups</h3>
          <div className="space-y-2 text-left">
            {groups.map(group => (
              <p
                key={group.id}
                className={`text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer p-2 rounded ${
                  selectedGroup?.id === group.id ? 'bg-gray-700 text-white' : ''
                }`}
                onClick={() => setSelectedGroup(group)}
              >
                {group.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-gray-100">
          {selectedGroup ? (
            <>
              <div className="p-4 bg-white flex items-center justify-between border-b border-gray-300">
                <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setShowModal(true)}
                >
                  Leave
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages
                  .filter(message => message.groupId === selectedGroup.id)
                  .map((message) => (
                    <div
                      key={message._id}
                      // className={`mb-2 p-2 rounded-full text-sm max-w-xs ${
                      //   message.isSent ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black mr-auto'
                      // }`}
                      // style={{ alignSelf: message.isSent ? 'flex-end' : 'flex-start' }}
                    >
                       <span>{`${message.user.name} (${new Date(message.timestamp).toLocaleString()}): ${message.message}`}</span>
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
