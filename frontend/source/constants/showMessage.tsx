import { message } from "antd";

export const showMessageAndContinue = (msg: string, url:string, duration: number = 1500): Promise<void> => {
    return new Promise((resolve) => {
      message.success(msg, duration / 1000); // Hiển thị thông báo, chia cho 1000 để chuyển sang giây
      setTimeout(() => {
        resolve(); // Gọi resolve sau khi thông báo đã hiển thị xong
        window.location.href = url;
      }, duration); // Sử dụng duration để xác định thời gian hiển thị
    });
  };