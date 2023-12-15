import React, { useState } from "react";
import { Button, Form, Select, Tooltip } from "antd";
const FormCreateSQL = () => {
  const [form] = Form.useForm();
  const [count, setCount] = useState(0);

  const [listSQL, setListSQL] = useState([]);

  const handleFinish = () => {};

  const onClickAddField = (item, value, type) => {
    const found = listSQL.find((e) => e?.key === item?.key);
    found[type] = value;
    const foundExit = listSQL.filter((e) => e.key !== item.key);
    setListSQL([...foundExit, found].sort((a, b) => a.key - b.key));
  };

  return (
    <Form form={form} onFinish={handleFinish}>
      <Form.Item label="Select dataset" name={"dataset"}>
        <Select
          placeholder="Search and select dataset"
          style={{ width: 400 }}
          options={ArrDataSet}
          onChange={(_, data) => {
            setListSQL(data);
          }}
          mode="multiple"
        ></Select>
      </Form.Item>

      {listSQL?.map((item, index) => {
        return (
          <div key={index.toString()}>
            <div style={{ fontWeight: "bold", marginBottom: 4 }}>
              {item.label}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginBottom: 16,
                padding: 16,
                border: "1px solid gray",
                borderRadius: 16,
              }}
            >
              {item?.listField?.map((it, id) => {
                if (it.value === "none") {
                  return (
                    <Select
                      placeholder="Search and select dataset"
                      style={{ width: 150, margin: 8 }}
                      options={[
                        { label: "country", value: "country" },
                        { label: "app_id", value: "app_id" },
                      ]}
                      onChange={(_, data) => {}}
                    ></Select>
                  );
                }
                return (
                  <Tooltip
                    key={id.toString() + "listField"}
                    color="#fff"
                    trigger="click"
                    placement="bottom"
                    title={
                      <div style={{ color: "#333" }}>
                        <div>
                          <div>Aggregation</div>
                          <Select
                            style={{ width: 200 }}
                            onChange={(value, data) => {
                              const found = item?.listField.find(
                                (e) => e?.count === it?.count
                              );

                              const foundExit = item?.listField.filter(
                                (e) => e.count !== it.count
                              );
                              const newData = {
                                ...found,
                                ...data,
                              };
                              onClickAddField(
                                item,
                                [...foundExit, newData].sort(
                                  (a, b) => a.count - b.count
                                ),
                                "listField"
                              );
                            }}
                            options={[
                              {
                                label: "sum(price)",
                                value: "sum",
                              },
                              {
                                label: "count(price)",
                                value: "count",
                              },
                              {
                                label: "none",
                                value: "none",
                              },
                            ]}
                          ></Select>
                        </div>
                      </div>
                    }
                  >
                    <Button style={{ margin: 8 }}>{it.label + it.count}</Button>
                  </Tooltip>
                );
              })}
              <Button
                onClick={() => {
                  setCount((v) => v + 1);
                  onClickAddField(
                    item,
                    [
                      ...(item?.listField || []),
                      {
                        label: `label_${
                          (item?.listField[item?.listField.length - 1]?.count ||
                            0) + 1
                        }`,
                        value: `value_${
                          (item?.listField[item?.listField.length - 1]?.count ||
                            0) + 1
                        }`,
                        count: count + 1,
                      },
                    ],
                    "listField"
                  );
                }}
                style={{ margin: 8 }}
              >
                ADD
              </Button>
            </div>
          </div>
        );
      })}
    </Form>
  );
};
export default FormCreateSQL;

const ArrDataSet = [
  {
    value: "dataset_A",
    label: "Dataset A",
    key: 1,
    listField: [],
  },
  {
    value: "dataset_B",
    label: "Dataset B",
    key: 2,
    listField: [],
  },
  {
    value: "dataset_C",
    label: "Dataset C",
    key: 3,
    listField: [],
  },
  {
    value: "dataset_D",
    label: "Dataset D",
    key: 4,
    listField: [],
  },
];
