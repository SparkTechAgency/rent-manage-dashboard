/* eslint-disable react/prop-types */
import { Table, Space, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// import dayjs from "dayjs";

const PropertyTable = ({ data, onDelete, onEdit, pageSize }) => {
  const location = useLocation();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
  });

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      render: (_, __, index) => index + 1, // Serial number based on row index
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "Available") {
          color = "green";
        } else if (status === "Rented") {
          color = "geekblue";
        } else {
          color = "volcano";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
    //       <Button
    //         icon={<DeleteOutlined />}
    //         danger
    //         onClick={() => onDelete(record.key)} // Trigger delete confirmation
    //       />
    //     </Space>
    //   ),
    // },
  ];
  if (location.pathname === "/properties") {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.key)} // Trigger delete confirmation
          />
        </Space>
      ),
    });
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: data.length,
        showTotal: (total) => `Total ${total} items`,
      }}
      onChange={handleTableChange}
    />
  );
};

export default PropertyTable;
