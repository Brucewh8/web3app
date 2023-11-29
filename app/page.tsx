"use client";

import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: 'autoMint', href: '#', current: true },
  { name: 'Tool 1', href: '#', current: false },
  { name: 'Tool 2', href: '#', current: false },
  { name: 'Tool 3', href: '#', current: false },
  { name: 'Tool 4', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function App() {
  const [key, setKey] = useState(""); // 用于存储输入的key
  const [rpc, setRpc] = useState("");
  const [message, setMessage] = useState(""); // 用于显示响应的消息


  const handleKeyChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setKey(e.target.value);
  };

  const handleRpcChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setRpc(e.target.value);
  };

  const handleClick = () => {
    // 用于处理按钮的点击
    // 发送一个POST请求，指定服务器的ip地址，端口和路由，传递key作为参数
    axios
      .post("http://195.206.235.202:3001/autoMint-serv", {
        key: key,
        rpc: rpc,
      })
      .then((response) => {
        // 处理服务器的响应
        if (response.data.success) {
          // 如果成功，显示结果
          setMessage("执行成功，结果是：" + response.data.result);
        } else {
          // 如果失败，显示错误信息
          setMessage("执行失败，错误信息是：" + response.data.error);
        }
      })
      .catch((error) => {
        // 处理请求的错误
        setMessage("请求失败，错误信息是：" + error.message);
      });
  };


  return (
    <div className="min-h-full">
      <Head >
        <title>Next.js and TailwindCSS Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">autoMint</h1>
        </div>
      </header>
      <main className="bg-white">
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
          <div className="mt-12 space-y-4">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* 私钥 */}
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    私钥
                  </label>
                  <div className="mt-2">
                    {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"> */}
                      <input
                        type="text"
                        placeholder="请输入key"
                        value={key}
                        onChange={handleKeyChange}
                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    {/* </div> */}
                  </div>
                </div>
                {/* RPC */}
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    RPC
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="请输入RPC"
                      value={rpc}
                      onChange={handleRpcChange}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                {/* 重复次数 */}
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    执行次数
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="请输入执行次数"
                      // value={key}
                      // onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                启动脚本
              </button>
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Output
              </label>
              <div className="mt-2">
                <textarea
                  value={message}
                  id="output"
                  name="output"
                  rows={8}
                  className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;