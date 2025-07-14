import { useState, useRef, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { sendChatMessage } from '../services/api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatbotModalProps {
  open: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setMessages([]);
        setInput('');
        setLoading(false);
      }, 300);
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const data = await sendChatMessage(userMessage.text);
      setMessages((prev) => [...prev, { sender: 'bot', text: data.response || '' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={360}
      className="!p-0"
      style={{ maxWidth: '95vw' }}
      mask={false}
    >
      <div className="flex flex-col h-[420px] md:h-[410px] w-full mt-6">
        <div className="bg-orange-600 text-white text-lg font-bold px-4 py-2 rounded-t-lg text-center">Chatbot AI tư vấn sản phẩm</div>
        <div className="flex-1 bg-gray-100 p-2 overflow-y-auto flex flex-col" style={{ minHeight: 240 }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={
                msg.sender === 'user'
                  ? 'flex justify-end mb-2'
                  : 'flex justify-start mb-2'
              }
            >
              <div
                className={
                  msg.sender === 'user'
                    ? 'bg-gray-200 px-3 py-2 rounded-lg max-w-[70%] text-right break-words'
                    : 'bg-green-100 px-3 py-2 rounded-lg max-w-[70%] text-left break-words'
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-2">
              <div className="bg-green-100 px-3 py-2 rounded-lg max-w-[70%] text-left italic text-gray-500 flex items-center gap-2">
                <Spin size="small" />
                Bot is typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="p-2 flex items-center gap-2 border-t bg-white">
          <Input
            type="text"
            className="flex-1 !rounded-lg !py-2 !px-3"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            size="middle"
            maxLength={200}
            autoFocus
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            className="!rounded-lg flex-shrink-0"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            size="middle"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ChatbotModal; 