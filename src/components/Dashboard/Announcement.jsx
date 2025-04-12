import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  message,
  Tag,
  Select,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch data from JSON (you can change this to an API endpoint if needed)
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const response = await axios.get("data/announcementData.json"); // Replace with your API endpoint
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements", error);
        message.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Filter announcements based on search text
  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showAddModal = () => {
    setCurrentAnnouncement(null); // Reset current announcement for adding new
    setIsAddModalVisible(true);
  };

  const showEditModal = (announcement) => {
    setCurrentAnnouncement(announcement);
    setIsEditModalVisible(true);
  };

  const handleAddOk = () => {
    if (currentAnnouncement?.title && currentAnnouncement?.description) {
      const newAnnouncement = { ...currentAnnouncement, id: Date.now() };
      setAnnouncements([...announcements, newAnnouncement]);
      setIsAddModalVisible(false);
      message.success("New announcement added successfully");
    } else {
      message.error("Please provide title and description");
    }
  };

  const handleEditOk = () => {
    if (currentAnnouncement?.title && currentAnnouncement?.description) {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === currentAnnouncement.id ? currentAnnouncement : item
        )
      );
      setIsEditModalVisible(false);
      message.success("Announcement updated successfully");
    } else {
      message.error("Please provide title and description");
    }
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
  };

  const handleDelete = (announcement) => {
    Modal.confirm({
      title: "Are you sure you want to delete this announcement?",
      onOk: () => {
        setAnnouncements((prev) =>
          prev.filter((item) => item.id !== announcement.id)
        );
        message.success("Announcement deleted successfully");
      },
    });
  };

  const handleStatusChange = (value) => {
    setCurrentAnnouncement({
      ...currentAnnouncement,
      status: value,
    });
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
        let color = status === "Active" ? "green" : "gray";
        return (
          <Tag className="h-7 text-base" color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </span>
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
          <h1 className="text-3xl font-bold text-[#333]">
            Announcements
          </h1>
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
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

        {/* Add Modal */}
        <Modal
          title="Add New Announcement"
          visible={isAddModalVisible}
          onOk={handleAddOk}
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
            <h3>Status:</h3>
            <Select
              value={currentAnnouncement?.status || "Active"}
              onChange={handleStatusChange}
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Archived">Archived</Select.Option>
            </Select>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          title="Edit Announcement"
          visible={isEditModalVisible}
          onOk={handleEditOk}
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
              style={{ marginBottom: 10 }}
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
            <h3>Status:</h3>
            <Select
              value={currentAnnouncement?.status || "Active"}
              onChange={handleStatusChange}
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Archived">Archived</Select.Option>
            </Select>
          </div>
        </Modal>
      </div>
    </ConfigProvider>
  );
};

export default Announcement;
