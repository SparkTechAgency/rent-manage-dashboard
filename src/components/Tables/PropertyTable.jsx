/* eslint-disable react/prop-types */
import { Table, Space, Button, Tag } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GoEye } from "react-icons/go";
import ViewPropertyDetailsModal from "../UI/ViewPropertyDetails";
// import dayjs from "dayjs";

const PropertyTable = ({ data, pageSize }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [openPropertyDetailsModal, setOpenPropertyDetailsModal] =
    useState(false);
  const [propertyData, setPropertyData] = useState(data);
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

  const showPropertyDetailsModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setOpenPropertyDetailsModal(true);
  };

  const handleCancel = () => {
    setOpenPropertyDetailsModal(false);
  };
  const handleVerify = (record) => {
    // Update the status to Verified
    const updatedData = propertyData.map((item) =>
      item.key === record.key ? { ...item, status: "verified" } : item
    );
    setPropertyData(updatedData); // Update state with the new status
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
        if (status === "verify_request") {
          color = "#F4BB44";
        } else if (status === "verified") {
          color = "success";
        }
        return (
          <Tag color={color}>
            {status === "verify_request"
              ? "Verify Request"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </Tag>
        );
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
          <Button
            style={{
              background: "#FFFFFF",
              border: "none",
              color: "#222222",
            }}
            icon={<GoEye style={{ fontSize: "24px" }} />}
            onClick={() => showPropertyDetailsModal(record)}
          />
          {record.status === "verify_request" && (
            <Button
              style={{
                background: "#FFBF00",
                border: "none",
                color: "#222222",
                fontWeight: "600",
              }}
              onClick={() => handleVerify(record)}
            >
              Verify
            </Button>
          )}

          {/* {record.status === "Verified" && <p>Verified</p>} */}
        </Space>
      ),
    });
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={propertyData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data.length,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={handleTableChange}
      />

      <ViewPropertyDetailsModal
        currentRecord={currentRecord}
        openPropertyDetailsModal={openPropertyDetailsModal}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default PropertyTable;
