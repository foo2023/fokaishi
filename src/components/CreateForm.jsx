import React, { useContext, useEffect, useRef, useState } from 'react'
import SharedContext from '../context/SharedContext';
import Modal from './Modal';
import TextEditor from './text-editor/TextEditor';

const CreateForm = () => {
  const [ inputDesc, setInputDesc ] = useState();
  const [ inputTitle, setInputTitle ] = useState();

  function onTitleInputHandler(data) {
    setInputTitle(data);
  }

  function onDescInputHandler(data) {
    setInputDesc(data);
  }

  const ctx = useContext(SharedContext);
  function onCancel() {
    ctx.toggleDisplayCreateForm();
  }

  function submitHandler(event) {
    event.preventDefault();
    const newData = {
      id: Math.round(Math.random() * 10000000000000),
      title: inputTitle,
      description: inputDesc,
      randomCover: `/random_cover/${Math.round(Math.random() * (8 - 0) + 0)}.jpg`,
    };
    ctx.addData(newData);
    onCancel();
  }
  return (
    <>
      <Modal>
        <h1 className="text-center text-4xl font-bold">創建新項目</h1>
        <form className="grid gap-3" onSubmit={submitHandler}>
          <p className="grid gap-1.5">
            <label htmlFor="body">標題</label>
            <TextEditor onChange={onTitleInputHandler} content={inputTitle} type="title"/>
            {/* <input ref={titleInputRef} className="rounded-xs border-amber-600 border-1 bg-amber-100/50 p-2.5" placeholder="輸入標題" type="text" required /> */}
          </p>
          <p className="grid gap-1.5">
            <label htmlFor="name">内容</label>
            <TextEditor onChange={onDescInputHandler} content={inputDesc} type="desc"/>
          </p>
          <p className="flex justify-center">
            <button className="bg-amber-600 text-white py-2.5 px-6 rounded-md mx-4 cursor-pointer" type="button" onClick={onCancel}>
              取消
            </button>
            <button className="bg-amber-600 text-white py-2.5 px-6 rounded-md mx-4 cursor-pointer">創建</button>
          </p>
        </form>
      </Modal>      
    </>
  )
}

export default CreateForm;