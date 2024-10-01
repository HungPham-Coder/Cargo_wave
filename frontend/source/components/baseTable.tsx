import {
  Col,
  Empty,
  Input,
  PaginationProps,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { TableProps, ColumnType as AntdColumnType } from "antd/es/table";

const { Title, Text } = Typography;

interface FilterOptions {
  label: string | number | string[];
  value: string | number | boolean | string[];
}

interface CustomColumnType<RecordType> extends AntdColumnType<RecordType> {
  filter?: {
    placeholder?: string;
    label?: string;
    multiple?: boolean;
    width?: number | string;
    filterOptions?: FilterOptions[];
  };
}

interface SearchOptions {
  visible?: boolean;
  placeholder?: string;
  width?: number | string;
  onSearch?: (value: string) => void;
}

interface BaseTableProps<RecordType> {
  columns?: CustomColumnType<RecordType>[];
  title?: React.ReactNode;
  dataSource: RecordType[];
  expandable?: TableProps<RecordType>["expandable"];
  searchOptions?: SearchOptions;
  pagination?: false | TableProps<RecordType>["pagination"];
  actions?: React.ReactNode;
  loading?: boolean;
  rowKey?: string | ((record: RecordType) => string);
  reload?: () => void;
  addButton?: React.ReactNode;
}

export const BaseTable = <RecordType extends object>({
  columns = [],
  title,
  dataSource,
  expandable,
  searchOptions = {
    visible: true,
    placeholder: "Search...",
    width: undefined,
    onSearch: () => {},
  },
  pagination,
  actions,
  loading,
  rowKey,
  addButton,
}: BaseTableProps<RecordType>) => {
  const all = useRef<RecordType[]>([]);

  const [list, setList] = useState<RecordType[]>([]);
  const { visible, placeholder, onSearch, width } = searchOptions;

  const filters = columns
    .filter((col) => col.filter)
    .map((item) => ({ ...item.filter, dataIndex: item.dataIndex }));

  useEffect(() => {
    all.current = dataSource;
    setList(dataSource);
  }, [dataSource]);

  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    console.log(current, pageSize);
  };

  return (
    <div style={{ marginLeft: "2%", marginRight: "2%" }}>
      {/* Header */}
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col>
          <Space align="center">
            {title && (
              <Title ellipsis level={3} style={{ margin: 0 }}>
                {title}
              </Title>
            )}
          </Space>
        </Col>
        <Row>
          <Col>{addButton}</Col>
          <Col>{actions}</Col>
        </Row>
      </Row>

      {/* Filters and search */}
      <Row gutter={16} justify="space-between" style={{ marginBottom: 15 }}>
        {visible && (
          <Col>
            <Input.Search
              placeholder={placeholder ?? "Search..."}
              onSearch={onSearch}
              style={{ width: width || 200 }}
            />
          </Col>
        )}
        {filters.length > 0 &&
          filters.map(
            ({
              placeholder,
              dataIndex,
              label,
              multiple,
              width,
              filterOptions,
            }) => {
              let values: (string | number)[] = [];
              let options: FilterOptions[] | undefined;

              if (filterOptions) {
                options = filterOptions;
              } else {
                const allValues = dataSource.map(
                  (item) =>
                    item[dataIndex as keyof RecordType] as string | number
                );
                values = [...allValues];
              }

              return (
                <Col key={String(dataIndex) ?? "default-key"}>
                  {label && <span className="mr-2">{label}: </span>}
                  <Select
                    mode={multiple ? "multiple" : undefined}
                    showSearch
                    allowClear
                    style={{ width: width || 200 }}
                    onClear={() => {
                      setList([...all.current]);
                    }}
                    placeholder={placeholder}
                    options={
                      options ||
                      values.map((v, index) => ({
                        label: v,
                        value: v,
                        key: `${v}-${index}`,
                      }))
                    }
                    onChange={(value) => {
                      if (!value) {
                        setList(all.current);
                        return;
                      }

                      const result = all.current.filter(
                        (item) => item[dataIndex as keyof RecordType] === value
                      );
                      setList(result);
                    }}
                  />
                </Col>
              );
            }
          )}
      </Row>

      {/* Table */}
      <Table<RecordType>
        rowKey={rowKey}
        pagination={
          pagination === false
            ? false
            : { ...pagination, showSizeChanger: false }
        }
        dataSource={list}
        columns={columns}
        loading={loading}
        locale={{
          emptyText: <Empty description={<Text disabled>Empty list</Text>} />,
        }}
        expandable={expandable}
      />
    </div>
  );
};
