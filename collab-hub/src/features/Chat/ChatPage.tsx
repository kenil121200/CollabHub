import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pusher from '../../config/PusherService';
import Modal from './Modal';
import { getAuthenticaticatedUser } from "../../context/FetchUser";

interface User {
  username: string;
  name: string;
}

interface Group {
  _id: string;
  projectName: string;
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
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(groups[0]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const user = getAuthenticaticatedUser();
  const currentUser: User = { username: user.login, name: user.name };

  useEffect(() => {
    if (selectedGroup) {
      // Fetch initial messages
      axios.get(`http://localhost:8081/chat/messages/${selectedGroup._id}`).then(response => {
        setMessages(response.data);
      }).catch(err => {
        console.log("No chat history exists for this chat group")
      });

      // Subscribe to Pusher channels
      const channel = pusher.subscribe(selectedGroup._id);

      channel.bind('message', (newMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [ selectedGroup]);

  useEffect(() => {
    if (groups.length === 0) {
      axios.post(`http://localhost:8081/contributedProjects/fetchProjects`, 
        { contributorEmail: currentUser.username }
      ).then(response => {
        setGroups(response.data);
        setSelectedGroup(response.data[0]);
      });
    }
  }, [])

  const handleLeaveGroup = () => {
    if (selectedGroup === null) return;

    const leaveMessage: Message = {
      _id: messages.length + 1,
      message: `${currentUser.username} has left the group`,
      isSent: false,
      groupId: selectedGroup._id,
      user: { username: 'system', name: 'System' },
      timestamp: new Date(),
    };

    axios.post('http://localhost:8081/chat/leave', {
      groupId: selectedGroup._id,
      username: currentUser.username,
      message: leaveMessage
    }).then(response => {
      const groupIndex = groups.indexOf(selectedGroup);
      const newGroups = groups.filter(group => group._id !== selectedGroup._id);

      if (newGroups.length > 0) {
        const nextGroupIndex = groupIndex === newGroups.length ? groupIndex - 1 : groupIndex;
        setSelectedGroup(newGroups[nextGroupIndex]);
      } else {
        setSelectedGroup(null);
      }

      setGroups(newGroups);
      setShowModal(false);
      setMessages(prevMessages => [...prevMessages, leaveMessage]);
    }).catch(error => {
      toast.error('Error leaving the group', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const message: Message = {
        _id: messages.length + 1,
        message: newMessage,
        isSent: true,
        groupId: selectedGroup._id,
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
      <div className="flex flex-1 overflow-hidden">
        <div className="bg-gray-800 w-64 h-full flex flex-col p-4">
          <h3 className="text-white mb-4 text-left font-semibold">Groups</h3>
          <div className="space-y-2 text-left">
            {groups.map(group => (
              <p
                key={group._id}
                className={`text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer p-2 rounded ${
                  selectedGroup?._id === group._id ? 'bg-gray-700 text-white' : ''
                }`}
                onClick={() => setSelectedGroup(group)}
              >
                {group.projectName}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-gray-100 relative">
          {selectedGroup ? (
            <>
              <div className="sticky top-0 left-0 right-0 p-4 bg-white flex items-center justify-between border-b border-gray-300 z-10">
                <h2 className="text-xl font-semibold">{selectedGroup.projectName}</h2>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={() => setShowModal(true)}
                >
                  Leave
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500">Start the conversation...</div>
                ) : (
                  messages
                    .filter(message => message.groupId === selectedGroup._id)
                    .map((message) => (
                      <div
                        key={message._id}
                        className={`mb-2 p-2 rounded-lg text-sm max-w-xs ${
                          message.user.username === 'system'
                            ? 'bg-gray-600 text-white text-center mx-auto'
                            : message.user.username === currentUser.username
                            ? 'bg-gray-900 text-white ml-auto'
                            : 'bg-gray-800 text-white mr-auto'
                        }`}
                        style={{ alignSelf: message.user.username === 'system' ? 'center' : message.user.username === currentUser.username ? 'flex-end' : 'flex-start' }}
                      >
                        <div>{message.message}</div>
                        {message.user.username !== 'system' && (
                          <div className="text-xs text-gray-400 mt-1">
                            <div>{new Date(message.timestamp).toLocaleTimeString()}</div>
                            <div>{message.user.username}</div>
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
              <div className="p-4 bg-white border-t border-gray-300 flex items-center">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 p-2 border border-gray-300 rounded-md mr-2"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  className="p-2 bg-blue-700 text-white rounded-md"
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
