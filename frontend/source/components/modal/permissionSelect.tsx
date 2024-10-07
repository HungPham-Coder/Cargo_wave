import React, { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import PermissionApi from "../../apis/permissions";
import type { SelectProps } from "antd";

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

const PermissionSelect: React.FC<PermissionSelectProps> = ({
  style,
  value,
  onChange,
  allowClear = false,
  permissionName,
  disabled = false,
  onLoaded,
}) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch permissions from the API
  const getPermissions = async () => {
    setLoading(true);
    try {
      const data = await PermissionApi.findAll();
      setPermissions(data);
      console.log("permissions: ", permissions)
      onLoaded?.(data); // Use optional chaining
    } catch (error) {
      console.error("Failed to load permissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  // Prepare options for the Select component
  const permissionOptions = permissions.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  // Custom tag rendering
  const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={"blue"} // Use the value as the color
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 6, marginTop: 7, marginBottom: 7 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Select
      mode="multiple"
      style={style}
      className={permissionName}
      showSearch
      value={value}
      options={permissionOptions}
      placeholder="Select permissions..."
      optionFilterProp="children"
      loading={loading}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      tagRender={tagRender} // Pass the custom tag render function
    />
  );
};

export default PermissionSelect;
