import { useState } from "react";
import { Button, ConfigProvider, Input, Modal, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useAnnouncementsQuery,
  useCreateAnnouncementMutation,
} from "../../Redux/api/annuncementApi";
import { toast } from "sonner";
import dayjs from "dayjs";

const PAGE_SIZE = 5;

const Announcement = () => {
  const {
    data: announcementsData,
    isLoading,
    isError,
    refetch,
  } = useAnnouncementsQuery();
  const announcements = announcementsData?.data || [];

  const [createAnnouncement] = useCreateAnnouncementMutation();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAnnouncements = announcements.filter((announce) =>
    announce?.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate paginated announcements for current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // reset to page 1 on new search
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const showAddModal = () => {
    setCurrentAnnouncement(null);
    setIsAddModalVisible(true);
  };

  const addAnnouncement = async () => {
    if (currentAnnouncement?.title && currentAnnouncement?.description) {
      try {
        const payload = {
          title: currentAnnouncement.title,
          description: currentAnnouncement.description,
        };
        const res = await createAnnouncement(payload).unwrap();
        console.log("response", res);
        setIsAddModalVisible(false);
        toast.success("New announcement created successfully!");
        refetch();
      } catch (error) {
        console.error("Failed to create announcement:", error);
        toast.error("Failed to create announcement. Try again.");
      }
    } else {
      toast.error("Please provide title and description");
    }
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setCurrentAnnouncement(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "rgb(91,91,91)",
            colorPrimaryHover: "rgb(118,118,118)",
            colorPrimaryActive: "rgb(62,62,62)",
          },
          Select: {
            colorBorder: "rgb(124,124,124)",
          },
        },
      }}
    >
      <div className="p-5 h-screen">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold text-[#333]">Announcements</h1>
          <div
            className="flex items-center gap-2"
            style={{ width: "100%", maxWidth: 400 }}
          >
            <Button
              type="primary"
              style={{ height: 40 }}
              onClick={showAddModal}
            >
              Add New Announcement
            </Button>
            <Input
              placeholder="Search Announcement..."
              value={searchText}
              onChange={handleSearch}
              style={{ height: 40, flex: 1 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        <div className="space-y-4">
          {paginatedAnnouncements.length === 0 ? (
            <p>No announcements found.</p>
          ) : (
            paginatedAnnouncements.map(
              ({ _id, title, description, createdAt }) => (
                <div
                  key={_id}
                  className="flex items-center justify-between p-4 border rounded shadow-sm bg-white"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <p className="text-gray-700">{description}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {dayjs(createdAt).format("MMM D, YYYY h:mm A")}
                  </p>
                </div>
              )
            )
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={filteredAnnouncements.length}
            onChange={onPageChange}
            showSizeChanger={false}
          />
        </div>

        <Modal
          title="Add New Announcement"
          visible={isAddModalVisible}
          onOk={addAnnouncement}
          onCancel={handleCancel}
          width={600}
        >
          <div>
            <h3>Title:</h3>
            <Input
              value={currentAnnouncement?.title || ""}
              onChange={(e) =>
                setCurrentAnnouncement({
                  ...currentAnnouncement,
                  title: e.target.value,
                })
              }
              placeholder="Enter announcement title"
              style={{ marginBottom: 10, height: 40 }}
            />
            <h3>Description:</h3>
            <Input.TextArea
              value={currentAnnouncement?.description || ""}
              onChange={(e) =>
                setCurrentAnnouncement({
                  ...currentAnnouncement,
                  description: e.target.value,
                })
              }
              rows={4}
              placeholder="Enter announcement description"
              style={{ marginBottom: 10 }}
            />
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Announcement;
