import { Form, Input, Radio, Button, ConfigProvider, Spin } from "antd";
import { useAddPeopleMutation } from "../../Redux/api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function AddPeople() {
  const [addPeople, { isLoading }] = useAddPeopleMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log("Form values: ", values);

      const response = await addPeople(values).unwrap();

      if (response?.success) {
        toast.success("Person added successfully!");
        localStorage.setItem("refetchStoreData", "true");
        navigate(`/${values.role}`);
        form.resetFields();
      } else {
        toast.error("Failed to add the person.");
      }
    } catch (err) {
      console.error("Error adding person: ", err);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading About Us..." />
      </div>
    );
  }

  return (
    <div className="h-[90vh]  flex items-center justify-center">
      <ConfigProvider
        theme={{
          components: {
            Radio: {
              colorPrimary: "rgb(34,32,33)",
            },
          },
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-center text-3xl font-semibold text-gray-800 mb-6">
            Add People
          </h2>

          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            style={{
              maxWidth: "100%",
            }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input the full name!" },
              ]}
            >
              <Input
                placeholder="Enter full name"
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Enter email"
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input the password!" },
              ]}
            >
              <Input.Password
                placeholder="Enter password"
                style={{
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: "Please select a role!" }]}
            >
              <Radio.Group>
                <Radio value="admin" className="text-gray-800">
                  Admin
                </Radio>
                <Radio value="tenant" className="text-gray-800">
                  Tenant
                </Radio>
                <Radio value="landlord" className="text-gray-800">
                  Landlord
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{
                  backgroundColor: "#222021",
                  borderRadius: "8px",
                  height: "40px",
                  padding: "10px",
                  fontSize: "16px",
                  borderColor: "#222021",
                  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
                }}
              >
                Add Person
              </Button>
            </Form.Item>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  );
}
