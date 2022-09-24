import React, { useState, useEffect } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Button } from 'antd';
import { PartitionOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons';
import { getDictList } from '@/api/modules/metaData/dataDict';
import { DictListRes } from '@/api/modules/metaData/constant';
import { DictAddType, DictListType, DictItemType } from './constant';

import './dataDict.less';
import AddDictModal from './AddDictModal';
import EditDictModal from './EditDictModal';
import EditMemberModal from './EditMemberModal';

const DataDict = () => {
  const navigate = useNavigate();
  const [dictList, setDictList] = useState<DictListType[]>([]);
  const [dictAdd, setDictAdd] = useState<DictAddType>({ isVisible: false });
  const [dictItem, setDictItem] = useState<DictItemType>({} as DictItemType);
  const [dictMember, setDictMember] = useState<DictItemType>({} as DictItemType);

  useEffect(() => {
    async function firstLoad() {
      const res: DictListRes[] = await getDictList({});
      const resAddInfo: DictListType[] = [];

      res.forEach((item) => {
        const isDictMember = true;
        if (item.isOpen) {
          resAddInfo.push({
            ...item,
            isDictMember
          });
        }
      });
      setDictList(resAddInfo);
    }

    firstLoad().catch((err) => console.log('err->', err));
  }, []);

  function handleDictDetail(dictId: number) {
    const params = { dictId: `${dictId}` };
    navigate({
      pathname: '/metaData/dictDetail',
      search: `?${createSearchParams(params)}`
    });
  }

  function handleDictLink(e: React.MouseEvent, dictId: number) {
    e.stopPropagation();
    const params = { dictId: `${dictId}` };
    navigate({
      pathname: '/metaData/dictConnect',
      search: `?${createSearchParams(params)}`
    });
  }

  function handleEditDictInfo(e: React.MouseEvent, dictItemRes: DictListRes) {
    const dictItem: DictItemType = {
      ...dictItemRes,
      isVisible: true
    };
    setDictItem(dictItem);
    e.stopPropagation();
  }

  function handleEditDictMember(e: React.MouseEvent, dictItemRes: DictListRes) {
    const dictItem: DictItemType = {
      ...dictItemRes,
      isVisible: true
    };
    setDictMember(dictItem);
    e.stopPropagation();
  }

  return (
    <>
      <div className="dict-header">
        <Button type="primary" onClick={() => setDictAdd({ isVisible: true })}>
          新建字典
        </Button>
      </div>
      <div className="dict-container">
        {dictList.map((item) => (
          <div
            className="dict-item-container"
            key={item.dictId}
            onClick={() => handleDictDetail(item.dictId)}
          >
            <div className="dict-item">
              <div className="dict-item-title">
                {item.isDictMember && (
                  <div className="dict-item-title__right">
                    <PartitionOutlined onClick={(e) => handleDictLink(e, item.dictId)} />
                    <UsergroupAddOutlined onClick={(e) => handleEditDictMember(e, item)} />
                    <SettingOutlined onClick={(e) => handleEditDictInfo(e, item)} />
                  </div>
                )}
              </div>
              <div className="dict-item-content">
                <div className="dict-item-content__top">
                  <span className="intro-item">字典名称:</span>
                  <span className="info-item">{item.dictName}</span>
                </div>
                <div className="dict-item-content__bottom">
                  <span className="intro-item">字典描述:</span>
                  <span className="info-item">{item.dictDesc}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddDictModal itemDetail={dictAdd}></AddDictModal>
      <EditDictModal itemDetail={dictItem}></EditDictModal>
      <EditMemberModal itemDetail={dictMember}></EditMemberModal>
    </>
  );
};

export default DataDict;
