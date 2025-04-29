import { useEffect, useState } from "react";
import { Button, ConfigProvider, Input, Modal, Table, Tag, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useAnnouncementsQuery,
  useChangeAnnouncementStatusMutation,
  useCreateAnnouncementMutation,
} from "../../Redux/api/annuncementApi";
import { toast } from "sonner";

const Announcement = () => {
  const {
    data: announcementsData,
    isLoading,
    isError,
    refetch,
  } = useAnnouncementsQuery();
  const announcements = announcementsData?.data;
  console.log("announcementsData", announcements);

  const [createAnnouncement] = useCreateAnnouncementMutation();
  const [updateAnnouncement] = useChangeAnnouncementStatusMutation();

  const [announcement, setAnnouncement] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (announcements && announcements.length) {
      setAnnouncement(announcements);
    }
  }, [announcements]);

  console.log("announcement", announcement);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showAddModal = () => {
    setCurrentAnnouncement(null);
    setIsAddModalVisible(true);
  };

  // const showEditModal = (announcement) => {
  //   setCurrentAnnouncement(announcement);
  //   setIsEditModalVisible(true);
  // };

  const addAnnouncement = async () => {
    if (currentAnnouncement?.title && currentAnnouncement?.description) {
      try {
        const payload = {
          title: currentAnnouncement.title,
          description: currentAnnouncement.description,
        };
        const res = await createAnnouncement(payload).unwrap();
        setIsAddModalVisible(false);
        toast.success("New announcement created successfully!");
        refetch();
        setAnnouncement((prev) => [...prev, res.data]);
      } catch (error) {
        console.error("Failed to create announcement:", error);
        toast.error("Failed to create announcement. Try again.");
      }
    } else {
      toast.error("Please provide title and description");
    }
  };

  // const editAnnouncement = async () => {
  //   if (currentAnnouncement?._id && currentAnnouncement?.status) {
  //     try {
  //       const payload = {
  //         announcementId: currentAnnouncement._id,
  //         status: currentAnnouncement.status,
  //       };

  //       const res = await updateAnnouncement(payload).unwrap();
  //       console.log(res);

  //       // Update local announcement state after successful API call
  //       setAnnouncement((prev) =>
  //         prev.map((item) =>
  //           item._id === currentAnnouncement._id
  //             ? { ...item, status: currentAnnouncement.status }
  //             : item
  //         )
  //       );

  //       setIsEditModalVisible(false);
  //       toast.success("Announcement status updated successfully!");
  //     } catch (error) {
  //       console.error("Failed to update announcement status:", error);
  //       toast.error("Failed to update status. Try again.");
  //     }
  //   } else {
  //     toast.error("Invalid announcement data");
  //   }
  // };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    // setIsEditModalVisible(false);
    setCurrentAnnouncement(null);
  };

  // const handleDelete = (announcement) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this announcement?",
  //     onOk: () => {
  //       setAnnouncement((prev) =>
  //         prev.filter((item) => item.id !== announcement.id)
  //       );
  //       message.success("Announcement deleted successfully");
  //     },
  //   });
  // };

  const handleStatusChange = async (checked, announcementId) => {
    const newStatus = checked ? "active" : "deActive";

    try {
      const payload = {
        announcementId,
        status: newStatus,
      };

      await updateAnnouncement(payload).unwrap();
      setAnnouncement((prev) =>
        prev.map((item) =>
          item._id === announcementId ? { ...item, status: newStatus } : item
        )
      );

      toast.success(`Announcement status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status. Try again.");
    }
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span>{text.slice(0, 50)}...</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status.toLowerCase() === "active" ? "green" : "red";
        const formattedStatus =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        return (
          <Tag className="h-7 text-base" color={color}>
            {formattedStatus}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Switch
          checked={record.status === "active"}
          onChange={(checked) => handleStatusChange(checked, record._id)}
        />
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "rgb(91,91,91)",
            headerColor: "rgba(255,255,255,0.88)",
          },
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
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              style={{ float: "right", height: 40 }}
              onClick={showAddModal}
            >
              Add New Announcement
            </Button>{" "}
            <Input
              placeholder="Search Announcement..."
              value={searchText}
              onChange={handleSearch}
              style={{ width: "100%", height: 40 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredAnnouncements}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

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
            {/* <h3>Status:</h3>
            <Select
              value={currentAnnouncement?.status || "Active"}
              onChange={handleStatusChange}
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="deActive">Deactive</Select.Option>
            </Select> */}
          </div>
        </Modal>

        {/* Edit Modal */}
        {/* <Modal
          title="Edit Announcement"
          visible={isEditModalVisible}
          onOk={editAnnouncement}
          onCancel={handleCancel}
          width={600}
        >
          <div>
            <h3>Title:</h3>
            <Input
              value={currentAnnouncement?.title || ""}
              readOnly
              onChange={(e) =>
                setCurrentAnnouncement({
                  ...currentAnnouncement,
                  title: e.target.value,
                })
              }
              placeholder="Enter announcement title"
              style={{ marginBottom: 10 }}
            />
            <h3>Description:</h3>
            <Input.TextArea
              value={currentAnnouncement?.description || ""}
              readOnly
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
            <h3>Status:</h3>
            <Select
              value={currentAnnouncement?.status || "active"}
              onChange={handleStatusChange}
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="deActive">Deactive</Select.Option>
            </Select>
          </div>
        </Modal> */}
      </div>
    </ConfigProvider>
  );
};

export default Announcement;
