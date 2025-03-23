import { useState, useMemo } from "react";
import { ConfigProvider, Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSubscriptionOrdersQuery } from "../../Redux/api/subscriptionApi";
import moment from "moment";

const PremiumSubscription = () => {
  const [searchText, setSearchText] = useState("");

  const { data: subscriptionOrders, isLoading } = useSubscriptionOrdersQuery();

  console.log(subscriptionOrders?.data.result);

  const subscriptionData = subscriptionOrders?.data.result;

  // Filter data based on search text
  const filteredData = useMemo(() => {
    if (!searchText) return subscriptionData;
    return subscriptionData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [subscriptionData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  return (
    <div>
      <div className="flex justify-between p-6 bg-[#D3E6F9] rounded">
        <h1 className="text-3xl font-bold text-black">
          Premium Subscription Users Lists
        </h1>
        <div className="flex gap-4 items-center">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                  colorBgContainer: "white",
                },
              },
            }}
          >
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold"
              prefix={
                <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
              }
              style={{
                width: 280,
                padding: "8px 16px",
                backgroundColor: "#F3F3F3",
                border: "1px solid white",
                color: "#010515",
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Data table */}
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#F3F3F3",
              headerColor: "black",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerSplitColor: "rgba(151, 198, 234, 1)",
            },
          },
        }}
      >
        <div className="w-full overflow-x-auto border-2 border-none ">
          <Table
            columns={[
              {
                title: "S.ID",
                dataIndex: "index",
                render: (text, record, index) => <span>{index + 1}</span>,
                responsive: ["md"],
              },
              {
                title: "User Name",
                dataIndex: "name",
                render: (text, record) => <span>{record.userId.fullName}</span>,
                responsive: ["sm"],
              },
              {
                title: "Subscription Date",
                dataIndex: "createdAt",
                render: (date) => {
                  return date
                    ? moment(date).format("MMM DD, YYYY, h:mm A")
                    : "N/A";
                },
                responsive: ["md"],
              },
              {
                title: "Subscription Expairdate",
                dataIndex: "expireDate",
                render: (date) => {
                  return date
                    ? moment(date).format("MMM DD, YYYY, h:mm A")
                    : "N/A";
                },
                responsive: ["sm"],
              },
              {
                title: "Status",
                dataIndex: "subscriptionStatus", 
                render: (text) => (
                  <>
                    {text === "active" && (
                      <>
                        <img
                          src="/images/dashboard-logo/subscriberIcon.svg" 
                          alt="status icon"
                          className="inline-block size-6 mr-2"
                        />
                      </>
                    )}
                  </>
                ),
                responsive: ["sm"],
              },
            ]}
            dataSource={filteredData}
            loading={isLoading}
            pagination={{ pageSize: 4 }}
            className="user-table"
            scroll={{ x: true }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default PremiumSubscription;
