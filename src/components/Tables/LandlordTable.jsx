/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Space, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";
import { getImageUrl } from "../../utils/baseUrl";

const LandlordTable = ({
  data,
  loading,
  showCustomerViewModal,
  pageSize = 0,
}) => {
  const imageUrl = getImageUrl();

  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      align: "center",
      responsive: ["md"],
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (text, record) => (
        <div className="flex items-center justify-center">
          {record?.image && (
            <img
              src={`${imageUrl}/${record.image}`}
              alt={text}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Joining date",
      dataIndex: "joiningDate",
      key: "joiningDate",
      align: "center",
      render: (date) => (date ? dayjs(date).format("DD-MM-YYYY") : "-"),
    },
    {
      title: "Owned Properties",
      dataIndex: "ownedProperties",
      key: "ownedProperties",
      align: "center",
      render: (ownedProperties) => ownedProperties?.length || 0,
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#222222",
                }}
                onClick={() => showCustomerViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip>
            {/* <Tooltip placement="left" title="Delete this User">
              <Button
                className="!p-0"
                style={{
                  background: "#FFFFFF",
                  border: "none",
                  color: "#F5382C",
                }}
                onClick={() => showDeleteModal(record)}
              >
                <RiDeleteBin6Line style={{ fontSize: "24px" }} />
              </Button>
            </Tooltip> */}
          </Space>
        </>
      ),
    },
  ];
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(91,91,91)",
              headerColor: "rgba(255,255,255,0.88)",
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={pageSize > 0 ? { pageSize } : false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </ConfigProvider>
    </div>
  );
};

export default LandlordTable;
