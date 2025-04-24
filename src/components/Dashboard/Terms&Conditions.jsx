/* eslint-disable no-unused-vars */
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../Redux/api/settingsApi";
import { toast } from "sonner";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();

  // console.log("termsOfService", getSettingsData);

  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  useEffect(() => {
    if (getSettingsData?.data.termsOfService) {
      setContent(getSettingsData.data.termsOfService);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      await updateSettings({ termsOfService: content }).unwrap();
      toast.success("Terms & Condition updated successfully!");
      if (getSettingsData?.data.termsOfService) {
        await updateSettings({ termsOfService: content }).unwrap();
        toast.success("Terms & Condition updated successfully!");
      } else {
        // Add a new termsOfService if not existing
        await addSettings({ termsOfService: content }).unwrap();
        toast.success("Terms & Condition added successfully!");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to save Terms & Condition. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Terms & Condition..." />
      </div>
    );
  }
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms & Condition. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-1 px-4 bg-gray-100">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#222021]">
          Terms and Condition
        </h1>

        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          loading={isUpdating}
          className="w-full py-6 border !border-[#222021] hover:border-[#222021] text-xl !text-primary-color bg-[#222021] hover:!bg-[#222021] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default TermsAndConditions;
