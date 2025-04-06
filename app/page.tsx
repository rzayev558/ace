"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Space,
  Divider,
  Typography
} from "antd";

const { Option } = Select;
const { Title } = Typography;

function Home() {
  const [children, setChildren] = useState([{ id: 1 }]);

  const addChild = () => {
    if (children.length < 8) {
      setChildren([...children, { id: Date.now() }]);
    }
  };

  const removeChild = (id: number) => {
    setChildren(children.filter(child => child.id !== id));
  };

  const onFinish = async(values: unknown) => {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Error sending email:', response.statusText);
        return;
      }
    console.log("Form values:", values);
  };

  return (
    <div className="bg-sky-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <Title level={2} className="text-sky-700 text-center mb-6">Antragsformular</Title>
        <Form layout="vertical" onFinish={onFinish} className="space-y-6">
          <div className="bg-sky-100 p-4 rounded-lg">
            <Form.Item label="Gewähltes Paket" name="package" className="mb-0">
              <Select className="w-full">
                <Option value="classic">ACE Classic</Option>
                <Option value="comfort">ACE Comfort</Option>
                <Option value="comfortPlus">ACE Comfort Plus</Option>
              </Select>
            </Form.Item>
          </div>

          <Divider className="text-sky-700 font-medium">Personal</Divider>
          <Space direction="vertical" size="middle" className="w-full border border-sky-200 p-6 rounded-lg relative bg-sky-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Vorname" name="name">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
              <Form.Item label="Nachname" name="surname">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
            </div>
            <Form.Item label="Straße und Hausnummer" name="streetNumber">
              <Input className="hover:border-sky-500 focus:border-sky-500" />
            </Form.Item>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Postleitzahl" name="postalCode">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
              <Form.Item label="Stadt" name="city">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Geburtsdatum" name="dob">
                <DatePicker className="w-full hover:border-sky-500 focus:border-sky-500" format="DD.MM.YYYY" />
              </Form.Item>
              <Form.Item label="E-Mail" name="email">
                <Input type="email" className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Telefonnummer" name="phone">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
              <Form.Item label="Kündigungsdatum der Vorversicherung" name="termination">
                <DatePicker className="w-full hover:border-sky-500 focus:border-sky-500" format="DD.MM.YYYY" />
              </Form.Item>
            </div>
          </Space>

          <Divider className="text-sky-700 font-medium">Kinder</Divider>
          {children.map((child, index) => (
            <Space key={child.id} direction="vertical" className="w-full border border-sky-200 p-6 rounded-lg relative bg-sky-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item label={`Vorname Kind ${index + 1}`} name={`child_name_${index}`}>
                  <Input className="hover:border-sky-500 focus:border-sky-500" />
                </Form.Item>
                <Form.Item label={`Nachname Kind ${index + 1}`} name={`child_surname_${index}`}>
                  <Input className="hover:border-sky-500 focus:border-sky-500" />
                </Form.Item>
              </div>
              <Form.Item label={`Geburtsdatum Kind ${index + 1}`} name={`child_dob_${index}`}>
                <DatePicker className="w-full hover:border-sky-500 focus:border-sky-500" format="DD.MM.YYYY" />
              </Form.Item>
              <div className="flex flex-wrap gap-3 mt-2">
                <Button danger className="bg-red-50 hover:bg-red-100" onClick={() => removeChild(child.id)}>
                  Kind entfernen
                </Button>
                {children.length < 8 && index === children.length - 1 && (
                  <Button className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-sky-300" onClick={addChild}>
                    Kind hinzufügen
                  </Button>
                )}
              </div>
            </Space>
          ))}

          <Divider className="text-sky-700 font-medium">IBAN & Zahlungsdaten</Divider>
          <Space direction="vertical" className="w-full border border-sky-200 p-6 rounded-lg relative bg-sky-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="Name der Bank" name="bank">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
              <Form.Item label="Kontoinhaber*in" name="owner">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item label="BIC" name="bic">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
              <Form.Item label="IBAN" name="iban">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>
            </div>
            <Form.Item label="Datum der Einzugsermächtigung" name="iban_date">
              <DatePicker className="w-full hover:border-sky-500 focus:border-sky-500" format="DD.MM.YYYY" />
            </Form.Item>

                <Form.Item label="Referrername" name="referred">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>

                  <Form.Item label="Referrer IBAN" name="referrer_iban">
                <Input className="hover:border-sky-500 focus:border-sky-500" />
              </Form.Item>

            <Form.Item className="mt-6">
              <Button type="primary" htmlType="submit" className="bg-sky-600 hover:bg-sky-700 border-sky-600 w-full md:w-auto px-8 h-10 font-medium">
                Absenden
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
}

export default Home;