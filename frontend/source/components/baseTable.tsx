import { Col, Empty, Input, Row, Select, Table, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { TableProps, ColumnType as AntdColumnType } from "antd/es/table";

const { Title, Text } = Typography;

interface FilterOptions {
  label: string | number;
  value: string | number | boolean; 
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
  columns: CustomColumnType<RecordType>[];
  title?: React.ReactNode;
  dataSource: RecordType[];
  expandable?: TableProps<RecordType>['expandable'];
  searchOptions?: SearchOptions;
  pagination?: false | TableProps<RecordType>['pagination'];
  actions?: React.ReactNode;
  loading?: boolean;
  rowKey?: string | ((record: RecordType) => string);
  reload?: () => void;
  addButton?: React.ReactNode;
}

export const BaseTable = <RecordType extends object>({
  columns,
  title,
  dataSource,
  expandable,
  searchOptions = {
    visible: true,
    placeholder: "Tìm kiếm...",
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

  return (
    <div>
      {filters.length > 0 && (
        <Row className="mb-4" gutter={16}>
          {filters.map(
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
                const allValues = dataSource.map((item) => item[dataIndex as keyof RecordType] as string | number);
                values = [...allValues];
              }

              return (
                <Col key={String(dataIndex) || "default-key"}>
                  {label && <span className="mr-2">{label}: </span>}
                  <Select
                    mode={multiple ? "multiple" : undefined}
                    showSearch
                    allowClear
                    style={{ width: width }}
                    onClear={() => {
                      setList([...all.current]);
                    }}
                    placeholder={placeholder}
                    options={
                      options
                        ? options
                        : values.map((v) => {
                            return {
                              label: v,
                              value: v,
                            };
                          })
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
      )}
      <Row justify="space-between">
        <Col span={12}>
          {title && (
            <Title ellipsis level={3}>
              {title}
            </Title>
          )}
        </Col>
        <Col span={12}>
          <Row gutter={8} justify="end">
            <Col>{addButton}</Col>
            <Col>
              {visible && (
                <Input.Search
                  className="mb-4"
                  placeholder={placeholder ?? "Tìm kiếm..."}
                  onSearch={onSearch}
                  style={{ width: width }}
                />
              )}
            </Col>
            <Col>{actions}</Col>
          </Row>
        </Col>
      </Row>
      <Table<RecordType>
        rowKey={rowKey}
        pagination={
          pagination === false ? false : { ...pagination, showSizeChanger: false }
        }
        dataSource={list}
        columns={columns}
        loading={loading}
        locale={{
          emptyText: <Empty description={<Text disabled>Chưa có dữ liệu</Text>} />,
        }}
        expandable={expandable}
      />
    </div>
  );
};
