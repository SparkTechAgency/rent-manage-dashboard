import { ConfigProvider } from "antd";
import PropertyTable from "../Tables/PropertyTable";
import { usePropertiesQuery } from "../../Redux/api/propertyApi";

const PropertyComponent = () => {
  const { data: properties, isLoading, error } = usePropertiesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  const propertiesData = properties?.data;

  console.log("Property data", propertiesData);
  // const [data, setData] = useState(propertyData);
  // const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [editingProperty, setEditingProperty] = useState(null);

  // const handleAddProperty = () => {
  //   setIsAddModalVisible(true);
  // };

  // const handleAddSubmit = (values) => {
  //   const newKey = (data.length + 1).toString();
  //   const newProperty = {
  //     key: newKey,
  //     ...values,
  //   };
  //   setData([...data, newProperty]);
  //   setIsAddModalVisible(false);
  //   form.resetFields();
  // };

  // const handleEditSubmit = (values) => {
  //   setData(
  //     data.map((item) =>
  //       item.key === editingProperty.key ? { ...item, ...values } : item
  //     )
  //   );
  //   setIsEditModalVisible(false);
  //   setEditingProperty(null);
  // };

  // const handleEdit = (record) => {
  //   console.log("Edit property:", record);
  //   setEditingProperty(record);
  //   setIsEditModalVisible(true);
  // };

  const showDetails = (record) => {
    console.log("View property details:", record);
  };

  // const handleDelete = (key) => {
  //   setData(data.filter((item) => item.key !== key));
  // };

  // const [form] = Form.useForm();

  return (
    <div className="h-screen p-6">
      <p className="text-3xl font-bold pb-5">Property List</p>
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
          },
        }}
      >
        {/* <Button
          type="primary"
          style={{ marginBottom: 16, height: 40 }}
          onClick={handleAddProperty}
        >
          Add Property
        </Button> */}

        {/* Add Property Modal */}
        {/* <Modal
          title="Add New Property"
          visible={isAddModalVisible}
          onCancel={() => setIsAddModalVisible(false)}
          footer={null}
          height={600}
          width={600}
        >
          <Form
            form={form}
            onFinish={handleAddSubmit}
            layout="vertical"
            initialValues={{ status: "Available" }}
          >
            <Form.Item
              name="title"
              label="Property Title"
              rules={[
                { required: true, message: "Please enter the property title!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please enter the location!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="owner"
              label="Owner"
              rules={[
                { required: true, message: "Please enter the owner's name!" },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Please select the property status!",
                },
              ]}
            >
              <Select className="h-10">
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="Rented">Rented</Select.Option>
                <Select.Option value="Under Maintenance">
                  Under Maintenance
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: 50 }}
              >
                Add Property
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}

        {/* Edit Modal */}
        {/* <Modal
          title="Edit Property"
          visible={isEditModalVisible}
          onCancel={() => setIsEditModalVisible(false)}
          footer={null}
        >
          <Form
            initialValues={editingProperty}
            onFinish={handleEditSubmit}
            layout="vertical"
          >
            <Form.Item name="title" label="Property Title">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="owner" label="Owner">
              <Input className="h-10" />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select className="h-10">
                <Select.Option value="Available">Available</Select.Option>
                <Select.Option value="Rented">Rented</Select.Option>
                <Select.Option value="Under Maintenance">
                  Under Maintenance
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="h-10 w-full">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
      </ConfigProvider>

      {/* Property Table */}
      <PropertyTable
        data={propertiesData}
        // propertiesData={propertiesData}
        // onDelete={handleDelete}
        // onEdit={handleEdit}
        showDetails={showDetails}
        pageSize={8}
      />
    </div>
  );
};

export default PropertyComponent;
