import { Select } from "antd";
import React, { useEffect, useState } from "react";
import PermissionApi from "../apis/permissions";

interface Permission {
  id: string;
  name: string;
}

interface PermissionSelectProps {
  style?: React.CSSProperties;
  value?: string[];
  onChange?: (value: string[] | undefined) => void; 
  allowClear?: boolean;
  permissionName?: string;
  disabled?: boolean;
  onLoaded?: (data: Permission[]) => void;
}

export const PermissionSelect: React.FC<PermissionSelectProps> = ({
  style,
  value,
  onChange,
  allowClear,
  permissionName,
  disabled,
  onLoaded,
}) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  const getPermissions = async () => {
    setLoading(true);
    const data = await PermissionApi.findPermissionEnabled();
    console.log(data);
    setPermissions(data);
    setLoading(false);
    onLoaded && onLoaded(data.data);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const permissionOptions = permissions.map((e) => ({
    value: e.id,
    label: e.name,
  }));

  return (
    <Select
      mode="multiple"
      style={style}
      className={permissionName}
      showSearch
      value={value}
      options={permissionOptions || "undefined"}
      placeholder="Select permissions..."
      optionFilterProp="children"
      loading={loading}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
    />
  );
};
