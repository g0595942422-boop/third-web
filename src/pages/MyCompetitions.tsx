import { Table, Typography } from 'antd';
import { competitions } from '../services/competitions';

export function MyCompetitions() {
  return (
    <>
      <Typography.Title level={3}>我的竞赛</Typography.Title>
      <Table rowKey="id" dataSource={competitions} columns={[{ title: '竞赛名称', dataIndex: 'name' }, { title: '状态', dataIndex: 'status' }, { title: '截止时间', dataIndex: 'deadline' }]} />
    </>
  );
}
