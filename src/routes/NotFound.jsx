import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-600">
      <h1 className="text-4xl font-bold">404 - 找不到頁面</h1>
      <p className="mt-4">請檢查您的網址是否正確。</p>
    </div>
  );
}