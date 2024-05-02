import React, { useEffect } from 'react';
import { RedoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, DatePicker, Form, Input, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';

import { OperationRecordReq, SelectorValueType } from '@/api/modules/operation/constant';
import { batchGetServiceUnit, getSystem } from '@/api/modules/operation/serviceUnit';
import PerspectiveSwitch from '@/component/perspectiveSwitch/PerspectiveSwitch';

import { maintenanceStateOptions, OperationType, productionStateOptions } from './constant';

type ProductionHistoryQueryFormType = {
  range: [dayjs.Dayjs, dayjs.Dayjs];
  filter: boolean;
  state: string[];
  system?: string[];
  service?: string[];
  perspective: string;
};

interface OperationQueryHeaderProps {
  register: boolean;
  onRegister(): any;
  type: OperationType;
  onChange(query: OperationRecordReq): any;
  onRefresh(): any;
}


const OperationQueryHeader: React.FC<OperationQueryHeaderProps> = ({
  register,
  onRegister,
  type,
  onChange,
  onRefresh
}) => {
  const [form] = Form.useForm<ProductionHistoryQueryFormType>();

  const system = useRequest<SelectorValueType[], []>(getSystem);

  const serviceUnit = useRequest<SelectorValueType[], [string]>(batchGetServiceUnit, {
    manual: true,
    debounceWait: 500
  });

  useEffect(() => {
    form.setFieldValue('state', undefined);
    form.setFieldValue('system', undefined);
    form.setFieldValue('service', undefined);
  }, [type]);

  // 系统选中变更回调
  const onSystemSelected = (system: string[]) => {
    serviceUnit.run(system.join(','));
    form.setFieldsValue({
      ...form.getFieldsValue,
      service: undefined
    });
  };

  const onQueryChange = () => {
    form
      .validateFields()
      .then((value) => {
        onChange({
          start: value.range[0].format('YYYY-MM-DD'),
          end: value.range[1].format('YYYY-MM-DD'),
          states: type == 'production' ? value.state : [],
          filter: value.filter,
          systemIds: value.system,
          serviceLabels: value.service,
          action: type == 'production' ? [] : value.state,
          perspective: value.perspective
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const releaseHour = 20;
  return (
    <>
      <Form<ProductionHistoryQueryFormType>
        form={form}
        layout={'inline'}
        initialValues={{
          range:
            dayjs().hour() >= releaseHour || type == 'maintenance'
              ? [dayjs(), dayjs()]
              : [dayjs().subtract(1, 'day'), dayjs().subtract(1, 'day')],
          perspective: 'ROOM'
        }}
        onValuesChange={async (changeValues: ProductionHistoryQueryFormType) => {
          if (changeValues.system) {
            onSystemSelected(changeValues.system);
          }
          if (Object.keys(changeValues).includes('range')) {
            return;
          }
          onQueryChange();
        }}
      >
        <Form.Item name={'range'} rules={[{ required: true, message: '请选择日期区间' }]}>
          <DatePicker.RangePicker
            format={'YYYY-MM-DD'}
            presets={[
              { label: '今天', value: [dayjs().startOf('day'), dayjs()] },
              {
                label: '昨天',
                value: [
                  dayjs().subtract(1, 'day').startOf('day'),
                  dayjs().subtract(1, 'day').startOf('day')
                ]
              },
              { label: '近7天', value: [dayjs().subtract(6, 'day').startOf('day'), dayjs()] },
              { label: '近14天', value: [dayjs().subtract(13, 'day').startOf('day'), dayjs()] },
              { label: '近30天', value: [dayjs().subtract(29, 'day').startOf('day'), dayjs()] },
              {
                label: '上个月',
                value: [
                  dayjs().subtract(1, 'month').startOf('month'),
                  dayjs().subtract(1, 'month').endOf('month')
                ]
              }
            ]}
            maxDate={dayjs()}
            onChange={onQueryChange}
            style={{ width: 250 }}
          />
        </Form.Item>
        <Form.Item name={'state'}>
          <Select
            allowClear
            mode={'multiple'}
            placeholder={'默认选中所有状态'}
            options={type === 'production' ? productionStateOptions : maintenanceStateOptions}
            maxTagCount={2}
            style={{ width: 235 }}
          />
        </Form.Item>
        <Form.Item>
          <Input.Group compact>
            <Form.Item name={'system'}>
              <Select
                allowClear
                mode={'multiple'}
                placeholder={'默认选中所有系统'}
                options={system.data}
                maxTagCount={2}
                loading={system.loading}
                disabled={system.loading}
                style={{ width: 280 }}
                optionLabelProp={'value'}
              />
            </Form.Item>
            <Form.Item name={'service'}>
              <Select
                allowClear
                mode={'multiple'}
                placeholder={'默认选中全部'}
                options={serviceUnit.data?.map((e) => {
                  return { ...e, prefix: e.label.split('@')[1].substring(0, 20) + '...' };
                })}
                maxTagCount={2}
                loading={serviceUnit.loading}
                disabled={serviceUnit.loading}
                style={{ width: 360 }}
                optionLabelProp={'prefix'}
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>
        <Form.Item name={'perspective'}>
          <PerspectiveSwitch
            value={form.getFieldsValue(['perspective'])}
            onChange={(val) => form.setFieldValue('perspective', val)}
          />
        </Form.Item>
        <Button type={'link'} icon={<RedoOutlined />} onClick={() => onRefresh()} />
        <Form.Item style={{ flex: 1, textAlign: 'right', marginRight: 0 }}>
          <Tooltip title={'勾选登记'} placement={'left'}>
            <Button type={'primary'} disabled={!register} onClick={onRegister}>
              登记
            </Button>
          </Tooltip>
        </Form.Item>
      </Form>
    </>
  );
};

export default OperationQueryHeader;
