import { message } from "antd";
export const successMessage = (content) => {
  message.success({
    content: content,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  });
};
export const errorMessage = (content) => {
  message.error({
    content: content,
    className: 'custom-class',
    style: {
      marginTop: '10vh',
    },
  });
};