import React, { useEffect, useState } from 'react';
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable } from '@ant-design/pro-components';
import { Button, message, Select, Tooltip } from 'antd';

import { ApiInfoItem, StepProps, UserInfo } from './constant';

const Step1 = ({ setPrevDisabled, setNextDisabled }: StepProps = {}) => {
  const [data, setData] = useState<ApiInfoItem[]>([]);
  const [userData, setUserData] = useState<UserInfo[]>([]);

  useEffect(() => {
    setPrevDisabled && setPrevDisabled(true);
    setNextDisabled && setNextDisabled(true);
    if (data) {
      const registeredNumber: number = data.filter((item) => item.registered).length;
      if (registeredNumber > 0) {
        setNextDisabled && setNextDisabled(false);
      } else {
        setNextDisabled && setNextDisabled(true);
      }
    }
  }, [data]);

  async function handleUserSearch(userId: string) {
    if (userId) {
      try {
        // 业务逻辑
        // const res = await ...
        const res: UserInfo[] = [];
        setUserData(res);
      } catch (err) {
        console.log('err->', err);
      }
    } else {
      setUserData([]);
    }
  }

  async function handleTarget(rowData: ApiInfoItem) {
    // 业务逻辑
    // const res = await ...(rowData);
    const res: ApiInfoItem[] = [];
    if (res.length !== 0) {
      message.success('接口注册成功');
      setData(res);
    } else {
      message.error('接口注册失败, 请重试');
    }
  }

  const tableColumns: ProColumns<ApiInfoItem>[] = [
    {
      title: '接口id',
      dataIndex: 'apiId',
      editable: false,
      width: 40
    },
    {
      title: '注册状态',
      dataIndex: 'registered',
      editable: false,
      width: 40,
      render: (_, record) => {
        if (record.registered) {
          return (
            <Tooltip title={'已注册'}>
              <CheckOutlined style={{ color: '#389e0d' }} />
            </Tooltip>
          );
        }
        return (
          <Tooltip title={'未注册'}>
            <CloseOutlined style={{ color: '#ff0000' }} />
          </Tooltip>
        );
      }
    },
    {
      title: '接口名称',
      dataIndex: 'desc',
      editable: false,
      width: 80
    },
    {
      title: '服务单元',
      dataIndex: 'serviceLabel',
      editable: false,
      width: 100
    },
    {
      title: '路由',
      dataIndex: 'serverUrl',
      width: 120,
      formItemProps: {
        rules: [
          {
            required: true
          }
        ]
      }
    },
    {
      title: '接口路径',
      dataIndex: 'path',
      width: 90,
      formItemProps: {
        rules: [
          {
            required: true
          }
        ]
      }
    },
    {
      title: '请求类型',
      dataIndex: 'type',
      width: 50,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择请求类型'
          }
        ]
      },
      renderFormItem: (column, { record }) => (
        <Select
          defaultValue={record?.type}
          options={[
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' }
          ]}
        ></Select>
      )
    },
    {
      title: '负责人',
      dataIndex: 'author',
      width: 70,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请选择负责人'
          }
        ]
      },
      renderFormItem: (column, { record }) => (
        <Select
          defaultValue={record?.author}
          showArrow={false}
          showSearch
          allowClear
          placeholder="请输入用户id"
          onSearch={handleUserSearch}
          options={userData.map(({ userId, name }) => {
            return {
              value: userId,
              label: `${userId}/${name}`
            };
          })}
        ></Select>
      )
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
      render: (text, record, _, action) => [
        <Button
          title={'编辑'}
          icon={<EditOutlined />}
          key="editable"
          type={'text'}
          size={'small'}
          onClick={() => {
            action?.startEditable?.(record.apiId);
          }}
        />
      ]
    }
  ];

  return (
    <EditableProTable
      id="register-api-table"
      columns={tableColumns}
      value={data}
      pagination={false}
      scroll={{ y: 530 }}
      style={{ margin: '15px 0 0' }}
      rowKey="apiId"
      recordCreatorProps={false}
      editable={{
        type: 'single',
        actionRender: (row, config, defaultDom) => [defaultDom.save, defaultDom.cancel],
        onSave: async (rowKey, row) => {
          await handleTarget(row);
        }
      }}
    />
  );
};

export default Step1;
