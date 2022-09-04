import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Upload, Modal, Row, Col, Typography, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import commonFuc from "src/utils/commonFuc";

const { Text } = Typography;

ImageField.propTypes = {
  title: PropTypes.string,
  titleCol: PropTypes.number,
  inputCol: PropTypes.number,
  isRequire: PropTypes.bool,
  heightPreview: PropTypes.number,
  widthPreview: PropTypes.number,
};

ImageField.defaultProps = {
  title: "",
  titleCol: 24,
  inputCol: 24,
  isRequire: false,
  heightPreview: 400,
  widthPreview: 500
};

function ImageField({ title, titleCol, inputCol, isRequire, field, widthPreview, heightPreview }) {
  const { name, value } = field;
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState(value);

  const handleChange = async (info) => {
    const { file } = info;
    console.log(file)
    console.log(file.url);
    console.log(file.preview);

    if (!file.url && !file.preview) {
      file.preview = await commonFuc.getBase64(file.originFileObj);
    }

    setImage(file.url || file.preview);
  };

  const handleAction = (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const changeEvent = {
      target: {
        name: name,
        value: formData,
      },
    };

    field.onChange(changeEvent);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (value) setImage(value);
  }, [value]);

  return (
    <Row>
      <Col span={titleCol}>
        <Text strong>
          {title} {isRequire && <Text type="danger">*</Text>}
        </Text>
      </Col>

      <Col span={inputCol}>
        <Upload
          action={handleAction}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>

        {image && <Image src={image} width={widthPreview} height={heightPreview} />}
      </Col>
    </Row>
  );
}

export default ImageField;
