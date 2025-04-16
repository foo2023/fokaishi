import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 確保引入 CSS

export default function toastify(message, status = 'default') {
  const toastType = status;

  toast(message, {
    type: toastType,
    position: "top-right", // 你可以根據需求調整位置
    autoClose: 5000, // 5 秒後自動關閉
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light", // 你可以根據需求調整主題
  });
};