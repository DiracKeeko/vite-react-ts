import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Table, Space, Col, Row, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { MemberItem, DictMemberReq, DeleteDictMemberReq } from '@/api/modules/metaData/constant';
import { editDictMember, deleteDictMember } from '@/api/modules/metaData/dataDict';
import '@/style/resetAntdTable.less';

import { DictItemType } from './constant';

type Props = {
  itemDetail: DictItemType;
};

type TableDataType = {
  userId: string;
  userName: string;
};

const EditMemberModal = ({ itemDetail }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [dictId, setDictId] = useState<number>(0);
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [addButtonDisable, setAddButtonDisable] = useState<boolean>(true);

  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const { isVisible, dictId, members } = itemDetail;
    setVisible(isVisible);
    setDictId(dictId);
    setMembers(members);
  }, [itemDetail]);

  const columns: ColumnsType<TableDataType> = [
    {
      title: '用户Id',
      dataIndex: 'userId',
      width: 100,
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      width: 100,
      key: 'userName'
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="middle" onClick={() => handleDelete(record.userId)}>
          <a>删除</a>
        </Space>
      )
    }
  ];

  const clearInput = () => {
    setUserId('');
    setUserName('');
    setAddButtonDisable(true);
  };

  const handleAdd = async () => {
    if (members.some((member) => member.userId === userId)) {
      notification.error({
        message: `添加失败`,
        description: `该用户已是字典成员`,
        placement: 'topRight',
        duration: 2
      });
      return;
    }

    const memberItem: MemberItem = {
      userId,
      userName
    };
    const memberReq: DictMemberReq = {
      dictId,
      ...memberItem
    };

    const isSuccess = await editDictMember(memberReq);
    if (isSuccess) {
      notification.success({
        message: `添加成功`,
        placement: 'topRight',
        duration: 2
      });
      setMembers([...members, memberItem]);
      clearInput();
    } else {
      notification.error({
        message: `添加失败`,
        placement: 'topRight',
        duration: 2
      });
    }
  };

  const handleDelete = async (userId: string) => {
    const deleteDictMemberReq: DeleteDictMemberReq = {
      dictId,
      userId
    };

    const isSuccess = await deleteDictMember(deleteDictMemberReq);
    if (isSuccess) {
      notification.success({
        message: `删除成功`,
        placement: 'topRight',
        duration: 2
      });
      const modifiedMembers = members.filter((member) => member.userId !== userId);
      setMembers(modifiedMembers);
    } else {
      notification.error({
        message: `删除失败`,
        placement: 'topRight',
        duration: 2
      });
    }
  };

  return (
    <Modal
      title="编辑字典成员"
      centered
      visible={visible}
      onOk={() => {
        setVisible(false);
        clearInput();
      }}
      onCancel={() => {
        setVisible(false);
        clearInput();
      }}
      width={1000}
    >
      <Table
        columns={columns}
        dataSource={members}
        pagination={false}
        rowKey={(item) => item.userId}
      />

      <Row style={{ margin: '20px 0 0 0'}}>
        <Col span={2} offset={1}>
          UserId:
        </Col>
        <Col span={4}>
          <Input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              if (e.target.value.length > 0) {
                setAddButtonDisable(false);
              } else {
                setAddButtonDisable(true);
              }
            }}
          />
        </Col>
        <Col span={2} offset={1}>
          用户名:
        </Col>
        <Col span={4}>
          <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
        </Col>
        <Col span={6} offset={1}>
          <Button type="primary" disabled={addButtonDisable} onClick={() => handleAdd()}>
            添加字典成员
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default EditMemberModal;
