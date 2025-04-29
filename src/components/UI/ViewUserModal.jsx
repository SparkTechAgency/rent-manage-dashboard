/* eslint-disable react/prop-types */
import { ConfigProvider, Modal, Table, Tag } from "antd";
import dayjs from "dayjs";
import { getImageUrl } from "../../utils/baseUrl";

const ViewUserModal = ({
  isViewCustomer,
  handleCancel,
  currentRecord,
  // handleBlock,
}) => {
  const imageUrl = getImageUrl();

  return (
    <Modal
      title={
        <div className="">
          <h2 className="text-secondary-color text-2xl ">User Details</h2>
          <hr />
        </div>
      }
      open={isViewCustomer}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className="p-10">
        <div className="">
          <div className="flex justify-center items-center p-4 border-b">
            {/* Avatar */}
            {currentRecord?.image && (
              <img
                src={`${imageUrl}/${currentRecord.image}`}
                // src={currentRecord?.image}
                alt={currentRecord?.fullName}
                className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
              />
            )}
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.fullName}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-4 text-lg">
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Address:</div>
                  <div>{currentRecord?.address}</div>
                </div>
              )}
              {currentRecord?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email:</div>
                  <div>{currentRecord?.email}</div>
                </div>
              )}
              {currentRecord?.phone && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact:</div>
                  <div>{currentRecord?.phone}</div>
                </div>
              )}
              {currentRecord?.createdAt && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Joining Date:</div>
                  <div>{currentRecord?.createdAt}</div>
                </div>
              )}

              {currentRecord?.dateOfBirth && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Date of Birth:</div>
                  <div>
                    {currentRecord?.dateOfBirth
                      ? dayjs(currentRecord?.dateOfBirth).format("DD-MM-YYYY")
                      : "-"}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Display Owned Properties */}
          {currentRecord?.properties && (
            <div className="mt-5">
              <h3 className="text-lg font-bold mb-2">Owned Properties:</h3>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      padding: 5,
                      fontSize: 14,
                    },
                  },
                }}
              >
                <Table
                  bordered
                  dataSource={currentRecord.properties}
                  columns={[
                    {
                      title: "Property Name",
                      dataIndex: "name",
                      key: "name",
                      align: "center",
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      key: "status",
                      align: "center",
                      render: (status) => {
                        let color;
                        if (status === "verify_request") {
                          color = "#f9aa18";
                        } else if (status === "verified") {
                          color = "success";
                        }
                        return (
                          <Tag color={color}>
                            {status === "verify_request"
                              ? "Verify Request"
                              : status.charAt(0).toUpperCase() +
                                status.slice(1)}
                          </Tag>
                        );
                      },
                    },
                    {
                      title: "Location",
                      dataIndex: "address",
                      key: "address",
                      align: "center",
                    },
                  ]}
                  rowKey="name" // Assuming 'name' is unique for each property
                />
              </ConfigProvider>
            </div>
          )}
        </div>
        {/* <button
          onClick={() => handleBlock(currentRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button> */}
      </div>
    </Modal>
  );
};

export default ViewUserModal;
