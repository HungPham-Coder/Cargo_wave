import { Modal, Typography } from "antd";
import { ModalProps } from "antd/es/modal";
import { ReactNode } from "react";

const { Title } = Typography;

interface BaseModalProps {
  open: boolean;
  onCancel: () => void;
  title: ReactNode;
  children: ReactNode;
  onOk?: () => void;
  okType?: ModalProps["okType"];
  confirmLoading?: boolean;
  okButtonProps?: ModalProps["okButtonProps"];
  cancelButtonProps?: ModalProps["cancelButtonProps"];
  width?: number | string;
  okText?: string;
  footer?: ReactNode;
  style?: React.CSSProperties;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onCancel,
  title,
  children,
  onOk,
  okType,
  confirmLoading,
  okButtonProps,
  cancelButtonProps,
  width,
  okText,
  footer,
  style = {},
}) => {
  return (
    <Modal
      style={style}
      destroyOnClose
      okText={okText ?? "Confirm"}
      cancelText="Cancel"
      open={open}
      onCancel={onCancel}
      title={<Title level={4}>{title}</Title>}
      maskClosable={false}
      onOk={onOk}
      confirmLoading={confirmLoading}
      okType={okType}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      width={width}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
