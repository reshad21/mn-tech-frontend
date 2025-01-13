import { Button, Form, message, Progress, Upload } from "antd";
import { RcFile } from "antd/es/upload/interface";
import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure you have your supabase client properly configured

const DocumentUploadComponent: React.FC = () => {
  const [fileStatus, setFileStatus] = useState<
    "Pending" | "Uploaded" | "Failed"
  >("Pending");
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // File upload handler
  const handleFileUpload = async (file: RcFile) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

    // Validate file size
    if (file.size > maxSize) {
      message.error("File size exceeds 5MB!");
      return false;
    }

    // Start the upload process
    try {
      setUploading(true);
      setFileStatus("Pending");
      setFileName(file.name);
      setProgress(0); // Reset progress

      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("documents") // Use your Supabase storage bucket here
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
          onUploadProgress: (event) => {
            const progressPercent = Math.round(
              (event.loaded / event.total) * 100
            );
            setProgress(progressPercent);
          },
        });

      if (error) {
        message.error("File upload failed!");
        setFileStatus("Failed");
        setUploading(false);
        return false;
      }

      // After successful upload
      setFileStatus("Uploaded");
      setUploading(false);
      message.success("File uploaded successfully!");
      return true;
    } catch (error) {
      message.error("An error occurred while uploading the file.");
      setFileStatus("Failed");
      setUploading(false);
      return false;
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Document Upload</h2>
      <Form
        layout="vertical"
        onFinish={() => console.log("Form submitted")} // Handle form submission logic as required
      >
        <Form.Item label="Upload Document" name="file" required>
          <Upload
            customRequest={({ file, onSuccess, onError }) => {
              // Handle the file upload when the user selects a file
              handleFileUpload(file as RcFile)
                .then(() => onSuccess?.({}, file))
                .catch(() => onError?.(new Error("Upload failed")));
            }}
            showUploadList={false} // Hide the default upload list
            beforeUpload={(file) => false} // Prevent automatic upload
          >
            <Button type="primary" disabled={uploading}>
              {uploading ? "Uploading..." : "Click to Upload"}
            </Button>
          </Upload>
        </Form.Item>

        {/* File status and progress */}
        {fileStatus !== "Pending" && (
          <div style={{ marginBottom: 20 }}>
            <h4>File Status: {fileStatus}</h4>
            {fileName && <p>File: {fileName}</p>}
          </div>
        )}

        {fileStatus === "Pending" && uploading && (
          <Progress percent={progress} status="active" />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={fileStatus !== "Uploaded" || uploading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DocumentUploadComponent;
