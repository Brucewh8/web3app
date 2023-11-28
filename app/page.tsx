"use client";

import React, { useState } from 'react';
import Head from 'next/head';

function Home() {
  const [key, setKey] = useState('');

  const handleChange = (e) => {
    setKey(e.target.value);
  };

  const handleClick = () => {
    // 调用另一台服务器上的mint.js脚本，传递key参数
    fetch('http://example.com/mint.js?key=' + key)
      .then((response) => response.json())
      .then((data) => {
        // 处理返回的数据
        console.log(data);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Next.js and TailwindCSS Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Next.js and TailwindCSS Demo</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="请输入key"
            value={key}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleClick}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            启动脚本
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;