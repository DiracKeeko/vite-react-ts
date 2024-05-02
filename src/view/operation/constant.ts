type OperationType = 'production' | 'maintenance'; // 投产登记，运维变更

const maintenanceStateOptions = [
  { label: '容器发布', value: 'APP_RELEASE_DOCKER' },
  { label: '数据库发布', value: 'APP_RELEASE_DATABASE' },
  { label: '应用回退', value: 'APP_ROLLBACK_ROLLBACK' }
];

const productionStateOptions = [
  { label: '投产成功', value: 'success' },
  { label: '投产失败', value: 'failure' }
];

export type { OperationType };
export { maintenanceStateOptions, productionStateOptions };
