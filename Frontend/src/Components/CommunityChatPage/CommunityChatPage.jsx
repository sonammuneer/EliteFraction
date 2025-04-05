import React, { useState, useEffect } from "react";
import { FiSend, FiMessageSquare, FiSmile, FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import "./CommunityChatPage.css";

const CommunityChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [newReply, setNewReply] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const [userName, setUserName] = useState("You");
    const [userId, setUserId] = useState("mock-user");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showReplyEmojiPicker, setShowReplyEmojiPicker] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editMessageText, setEditMessageText] = useState("");

    // Simple emoji list
    const emojiList = ["😀", "😂", "😍", "👍", "🙏", "🎉", "❤️", "🔥"];

    // Mock API functions - replace with real API calls
    const mockApi = {
        getMessages: async () => {
            return [
                {
                    id: 1,
                    userId: "user1",
                    userName: "John",
                    text: "Hello everyone!",
                    replies: [],
                    createdAt: new Date()
                },
                {
                    id: 2,
                    userId: "mock-user",
                    userName: "You",
                    text: "This is your message",
                    replies: [],
                    createdAt: new Date()
                }
            ];
        },
        sendMessage: async (message) => {
            return {
                ...message,
                id: Math.floor(Math.random() * 1000),
                createdAt: new Date()
            };
        },
        sendReply: async (messageId, reply) => {
            return {
                ...reply,
                id: Math.floor(Math.random() * 1000),
                createdAt: new Date()
            };
        },
        updateMessage: async (messageId, newText) => {
            return { success: true };
        },
        deleteMessage: async (messageId) => {
            return { success: true };
        }
    };

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem("user")) || {
                id: "mock-user",
                name: "You"
            };
            setUserName(user.name || "You");
            setUserId(user.id || "mock-user");
        } catch (error) {
            console.error("Error loading user data:", error);
            setUserName("You");
            setUserId("mock-user");
        }
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const response = await mockApi.getMessages();
            setMessages(response || []);
        } catch (error) {
            console.error("Error loading messages:", error);
            setMessages([]);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        
        try {
            const response = await mockApi.sendMessage({
                userId,
                userName,
                text: newMessage
            });
            
            setMessages([...messages, response]);
            setNewMessage("");
            setShowEmojiPicker(false);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleSendReply = async (messageId) => {
        if (!newReply.trim()) return;
        
        try {
            const response = await mockApi.sendReply(messageId, {
                userId,
                userName,
                text: newReply
            });
            
            const updatedMessages = messages.map(msg => {
                if (msg.id === messageId) {
                    return {
                        ...msg,
                        replies: [...(msg.replies || []), response]
                    };
                }
                return msg;
            });
            
            setMessages(updatedMessages);
            setNewReply("");
            setReplyTo(null);
            setShowReplyEmojiPicker(null);
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    const handleEditMessage = (message) => {
        setEditingMessageId(message.id);
        setEditMessageText(message.text);
    };

    const handleUpdateMessage = async () => {
        if (!editMessageText.trim()) return;
        
        try {
            await mockApi.updateMessage(editingMessageId, editMessageText);
            
            const updatedMessages = messages.map(msg => {
                if (msg.id === editingMessageId) {
                    return {
                        ...msg,
                        text: editMessageText
                    };
                }
                return msg;
            });
            
            setMessages(updatedMessages);
            setEditingMessageId(null);
            setEditMessageText("");
        } catch (error) {
            console.error("Error updating message:", error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await mockApi.deleteMessage(messageId);
                const updatedMessages = messages.filter(msg => msg.id !== messageId);
                setMessages(updatedMessages);
            } catch (error) {
                console.error("Error deleting message:", error);
            }
        }
    };

    const addEmoji = (emoji) => {
        setNewMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const addReplyEmoji = (emoji, messageId) => {
        setNewReply(prev => prev + emoji);
        setShowReplyEmojiPicker(null);
    };

    const cancelEdit = () => {
        setEditingMessageId(null);
        setEditMessageText("");
    };

    return (
        <div className="community-chat-page">
            <main className="chat-container">
                <h1>Community Chat</h1>
                <p className="subtitle">Connect with other members</p>

                {/* Message Input */}
                <div className="message-input-container">
                    <div className="message-input">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Post a new message..."
                            rows="2"
                        />
                        <div className="input-actions">
                            <button 
                                className="emoji-btn"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            >
                                <FiSmile />
                            </button>
                            <button 
                                className="send-btn"
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                            >
                                <FiSend /> Send
                            </button>
                        </div>
                    </div>
                    
                    {showEmojiPicker && (
                        <div className="emoji-picker">
                            {emojiList.map((emoji, index) => (
                                <span 
                                    key={index} 
                                    className="emoji-option"
                                    onClick={() => addEmoji(emoji)}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Messages List */}
                <div className="messages-list">
                    {messages.length === 0 ? (
                        <p className="no-messages">No messages yet. Be the first to post!</p>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id} className="message-card">
                                <div className="message-header">
                                    <div className="user-info">
                                        <div className="avatar">
                                            {(message.userName || "?").charAt(0)}
                                        </div>
                                        <div>
                                            <strong>{message.userName || "Unknown"}</strong>
                                            <small>{message.createdAt ? new Date(message.createdAt).toLocaleString() : ""}</small>
                                        </div>
                                    </div>
                                    <div className="message-actions">
                                        {message.userId === userId && (
                                            <>
                                                <button 
                                                    className="edit-btn"
                                                    onClick={() => handleEditMessage(message)}
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button 
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </>
                                        )}
                                        <button 
                                            className="reply-btn"
                                            onClick={() => {
                                                setReplyTo(replyTo === message.id ? null : message.id);
                                                setNewReply("");
                                            }}
                                        >
                                            <FiMessageSquare /> Reply
                                        </button>
                                    </div>
                                </div>
                                
                                {editingMessageId === message.id ? (
                                    <div className="edit-message-container">
                                        <textarea
                                            value={editMessageText}
                                            onChange={(e) => setEditMessageText(e.target.value)}
                                            rows="2"
                                        />
                                        <div className="edit-actions">
                                            <button 
                                                className="cancel-btn"
                                                onClick={cancelEdit}
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                className="save-btn"
                                                onClick={handleUpdateMessage}
                                                disabled={!editMessageText.trim()}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="message-content">
                                        <p>{message.text}</p>
                                    </div>
                                )}

                                {/* Replies Section */}
                                {message.replies && message.replies.length > 0 && (
                                    <div className="replies-container">
                                        {message.replies.map((reply) => (
                                            <div key={reply.id} className="reply-item">
                                                <div className="reply-header">
                                                    <div className="avatar small">
                                                        {(reply.userName || "?").charAt(0)}
                                                    </div>
                                                    <strong>{reply.userName || "Unknown"}</strong>
                                                    <small>{reply.createdAt ? new Date(reply.createdAt).toLocaleString() : ""}</small>
                                                </div>
                                                <p>{reply.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Reply Input */}
                                {replyTo === message.id && (
                                    <div className="reply-input-container">
                                        <div className="reply-input">
                                            <textarea
                                                value={newReply}
                                                onChange={(e) => setNewReply(e.target.value)}
                                                placeholder="Type your reply..."
                                                rows="2"
                                            />
                                            <div className="input-actions">
                                                <button 
                                                    className="emoji-btn"
                                                    onClick={() => setShowReplyEmojiPicker(
                                                        showReplyEmojiPicker === message.id ? null : message.id
                                                    )}
                                                >
                                                    <FiSmile />
                                                </button>
                                                <button 
                                                    className="send-btn"
                                                    onClick={() => handleSendReply(message.id)}
                                                    disabled={!newReply.trim()}
                                                >
                                                    <FiSend /> Send
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {showReplyEmojiPicker === message.id && (
                                            <div className="emoji-picker">
                                                {emojiList.map((emoji, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="emoji-option"
                                                        onClick={() => addReplyEmoji(emoji, message.id)}
                                                    >
                                                        {emoji}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default CommunityChatPage;