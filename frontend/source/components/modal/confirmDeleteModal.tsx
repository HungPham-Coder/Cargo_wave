import React from "react";
import BaseModal from "../baseModal";

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  onOk: () => void;
  loading: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onCancel,
  title,
  onOk,
  loading,
}) => {
  return (
    <BaseModal
      children
      open={open}
      onCancel={onCancel}
      title={title}
      okType="danger"
      onOk={onOk}
      confirmLoading={loading}
    ></BaseModal>
  );
};
