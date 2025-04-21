/* eslint-disable react/prop-types */
import { ConfigProvider, Modal, Table } from "antd";
import dayjs from "dayjs";
// import { getImageUrl } from "../../utils/baseUrl";

const ViewUserModal = ({
  isViewCustomer,
  handleCancel,
  currentRecord,
  // handleBlock,
}) => {
  // const imageUrl = getImageUrl();

  return (
    <Modal
      title={
        <div className="">
          <h2 className="text-secondary-color text-2xl ">User Details</h2>
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
                // src={`${imageUrl}/${currentRecord.image}`}
                src={currentRecord?.image}
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
              {currentRecord?.serviceName && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Service name:</div>
                  <div>{currentRecord?.serviceName}</div>
                </div>
              )}
              {currentRecord?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email:</div>
                  <div>{currentRecord?.email}</div>
                </div>
              )}
              {currentRecord?.joiningDate && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Joining Date:</div>
                  <div>{currentRecord?.joiningDate}</div>
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
              {currentRecord?.contactNumber && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div>{currentRecord?.contactNumber}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div>{currentRecord?.address}</div>
                </div>
              )}
            </div>
          </div>
          {/* Display Owned Properties */}
          {currentRecord?.ownedProperties &&
            currentRecord?.ownedProperties.length > 0 && (
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
                    dataSource={currentRecord.ownedProperties}
                    columns={[
                      {
                        title: "Property Name",
                        dataIndex: "name",
                        key: "name",
                        align: "center",
                      },
                      {
                        title: "Property Type",
                        dataIndex: "type",
                        key: "type",
                        align: "center",
                      },
                      {
                        title: "Location",
                        dataIndex: "location",
                        key: "location",
                        align: "center",
                      },
                      {
                        title: "Value",
                        dataIndex: "value",
                        key: "value",
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
