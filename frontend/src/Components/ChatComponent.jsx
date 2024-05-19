



import React, { useState, useEffect } from 'react';
import Send from "../Assets/send.png";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

function ChatComponent() {
    const [chatEntries, setChatEntries] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Delayed appearance of initial bot message
        const timer = setTimeout(() => {
            // setIsLoading(true)
            setChatEntries([{ type: 'bot', text: "Hey, I'm your recommender bot" }]);
        }, 500); // 2000 milliseconds = 2 seconds

        return () => clearTimeout(timer); // Clean up timer on component unmount
    }, []);

    useEffect(() => {
        // Scroll to bottom of chat when new message is added
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatEntries]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        const trimmedMessage = inputValue.trim();
        if (trimmedMessage !== '') {
            const userMessage = { type: 'user', text: trimmedMessage };
            setChatEntries(prevEntries => [...prevEntries, userMessage]); // Add user message to chat entries
            setInputValue('');
            setIsLoading(true);
            setError(null);
            try {
                const data = await makeRequestAPI(trimmedMessage);
                // Simulate delay before receiving bot response
                await new Promise(resolve => setTimeout(resolve, 1000));
                const botMessage = { type: 'bot', text: data };
                setChatEntries(prevEntries => [...prevEntries, botMessage]); // Add bot response to chat entries
            } catch (err) {
                setError(err.message || "An error occurred");
                console.error("Failed to fetch response:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };


    const makeRequestAPI = async (prompt) => {
        try {
            const res = await axios.post("http://recom-ai.site:6005/generate", { prompt });
            return res.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className='bg-[#F8F8FF] rounded-[40px] border-[4px] border-[#2C0AA0] pr-2 m-auto w-full md:w-2/5 h-[590px] mt-4 flex flex-col'>
            <div id="chat-container" className='scroller h-5/6 p-2 md:p-8 flex flex-col overflow-y-auto'>
                {chatEntries.map((entry, index) => (
                    <div key={index} className={`bg-[#595FF0]  text-[12px] md:text-[18px] font-medium text-white min-w-10 md:min-w-20 max-w-72 p-3 md:p-4 m-1 ${entry.type === 'user' ? 'self-end rounded-t-[15px] rounded-tr-[25px] rounded-br-[0px] rounded-bl-[20px]' : 'self-start rounded-t-[25px] rounded-tr-[15px] rounded-br-[20px] rounded-bl-[0px]'}`}>
                        {entry.text}
                    </div>
                ))}
                {isLoading && <div className="bg-[#595FF0] rounded-t-[15px] rounded-tr-[25px] rounded-br-[0px] rounded-bl-[20px] text-[12px] md:text-[18px] font-medium text-white min-w-20 max-w-72 p-4 m-1 self-start">
                    <ThreeDots
                        visible={true}
                        height="25"
                        width="60"
                        color="#F8F8FF"
                        radius="4"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /></div>}
            </div>
            <div className=' m-2 md:m-5 bg-[#595FF0] rounded-[30px] flex'>
                <input
                    type="text"
                    placeholder='Enter short description to get recommended'
                    className='bg-[#595FF0] rounded-[30px] h-14 p-4 w-10/12 font-medium text-white text-[12px] md:text-[20px] outline-none'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage(e);
                        }
                    }}
                />

                <div className='m-auto p-1 md:p-3 bg-[#F8F8FF] rounded-[12px]' onClick={handleSendMessage}>
                    <img src={Send} alt="" width={20} />
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
