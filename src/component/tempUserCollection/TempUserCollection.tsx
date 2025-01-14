import React, { CSSProperties, useEffect, useState } from 'react';

// 定义接口类型
interface UserCollectionProps {
  type: string;
  productId: string;
  title: string;
  iconStyle?: CSSProperties; // 使用 CSSProperties 来定义样式对象
}

// 模拟 API 和消息提示方法
const api = {
  userCollection: {
    addCollection: async (data: any) => {
      // 模拟成功添加收藏
      return true;
    },
    deleteCollection: async (data: any) => {
      // 模拟成功删除收藏
      return true;
    },
    checkCollection: async (data: any) => {
      // 模拟返回收藏状态
      return data.productId === '123' ? [{ id: '1' }] : [];
    }
  }
};

const message = {
  success: (msg: string) => alert(msg),
  error: (msg: string) => alert(msg)
};

// 主组件
const UserCollection = ({
  type,
  productId,
  title,
  iconStyle = { width: '24px', height: '24px' } // 默认值
}: UserCollectionProps) => {
  const [isCollected, setIsCollected] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);

  // 检查收藏状态
  const checkCollection = async () => {
    try {
      const arr = await api.userCollection.checkCollection({ type, productId });
      if (arr.length === 0) {
        setIsCollected(false);
        setId(undefined);
      } else {
        setIsCollected(true);
        setId(arr[0].id);
      }
    } catch (e) {
      console.error('Error checking collection:', e);
    }
  };

  // 添加收藏
  const handleCollected = async () => {
    try {
      const res = await api.userCollection.addCollection({ type, productId, title });
      if (res) {
        message.success('收藏成功，请点击右上角的“爱心”按钮查看');
        await checkCollection();
      } else {
        message.error('添加收藏失败');
      }
    } catch (e) {
      console.error('Error adding collection:', e);
    }
  };

  // 取消收藏
  const cancelCollected = async () => {
    try {
      if (!id) return;
      const res = await api.userCollection.deleteCollection({ id });
      if (res) {
        message.success('已取消收藏，请点击右上角的“爱心”按钮查看');
        await checkCollection();
      } else {
        message.error('取消收藏失败');
      }
    } catch (e) {
      console.error('Error deleting collection:', e);
    }
  };

  // 初始加载时检查收藏状态
  useEffect(() => {
    checkCollection();
  }, [type, productId]);

  return (
    <span className="user-collection" style={{ cursor: 'pointer' }}>
      {isCollected ? (
        <span title="取消收藏" onClick={cancelCollected}>
          <SvgIcon iconClass="icon_collection_detail_full" style={iconStyle} />
        </span>
      ) : (
        <span title="添加收藏" onClick={handleCollected}>
          <SvgIcon iconClass="icon_collection_detail" style={iconStyle} />
        </span>
      )}
    </span>
  );
};

// SvgIcon 组件的简单实现
interface SvgIconProps {
  iconClass: string;
  style?: CSSProperties;
}

const SvgIcon: React.FC<SvgIconProps> = ({ iconClass, style }) => (
  <i className={`svg-icon ${iconClass}`} style={style}></i>
);

export default UserCollection;
