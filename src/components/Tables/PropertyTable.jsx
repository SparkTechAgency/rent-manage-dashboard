/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Space, Button, Tag, Menu } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GoEye } from "react-icons/go";
import ViewPropertyDetailsModal from "../UI/ViewPropertyDetails";
import { useChangeStatusMutation } from "../../Redux/api/propertyApi";
import { toast } from "sonner";

const PropertyTable = ({ data, pageSize, refetch }) => {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [openPropertyDetailsModal, setOpenPropertyDetailsModal] =
    useState(false);
  const [propertyData, setPropertyData] = useState(data);
  const location = useLocation();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
  });
  const [ownerFilter, setOwnerFilter] = useState(null);
  const [changePropertyStatus] = useChangeStatusMutation();

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const showPropertyDetailsModal = (record) => {
    setCurrentRecord(record);
    setOpenPropertyDetailsModal(true);
  };

  const handleCancel = () => {
    setOpenPropertyDetailsModal(false);
  };

  const handleVerify = async (record) => {
    console.log("record", record);
    try {
      // Show loading feedback
      // message.loading({ content: "Verifying...", key: "verifyLoading" });

      const response = await changePropertyStatus({
        propertyId: record._id,
        status: !record.status,
      }).unwrap();

      console.log("update response", response);

      // const updatedData = propertyData.map((item) =>
      //   item.key === record.key ? { ...item, status: "verified" } : item
      // );
      // setPropertyData(updatedData);

      toast.success("Property verified successfully!");
    } catch (error) {
      toast.error("Failed to verify property");
      console.error("Error verifying property: ", error);
    }
  };

  console.log("propertyData", data);

  const handleOwnerFilter = (value, setSelectedKeys, confirm) => {
    setOwnerFilter(value);
    setSelectedKeys(value ? [value] : []);
    confirm();
  };

  const getEachOwners = () => {
    const owners = data.map((item) => item?.landlordUserId?.fullName);
    // console.log("owners", owners);

    return [...new Set(owners)];
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      responsive: ["md"],
      render: (_, __, index) => index + 1,
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Owner",
      dataIndex: "landlordUserId",
      key: "landlordUserId",
      align: "center",
      render: (landlordUserId) =>
        landlordUserId ? landlordUserId.fullName : "Unknown",
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Menu>
            <Menu.Item
              key="all"
              onClick={() => handleOwnerFilter(null, setSelectedKeys, confirm)}
            >
              All
            </Menu.Item>
            {getEachOwners().map((owner) => (
              <Menu.Item
                key={owner}
                onClick={() =>
                  handleOwnerFilter(owner, setSelectedKeys, confirm)
                }
              >
                {owner}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      ),
      onFilter: (value, record) => {
        console.log(value);
        if (value === null) return true;
        return record?.landlordUserId?.fullName === value;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
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
        </Space>
      ),
    });
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data.filter((item) =>
          ownerFilter ? item.landlordUserId?.fullName === ownerFilter : true
        )}
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
