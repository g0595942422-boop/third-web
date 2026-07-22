import { Table, Typography, Tag } from 'antd';
import { getMyCompetitions } from '../services/myCompetitions';

export function MyCompetitions() {

  const myCompetitions = getMyCompetitions();

  return (
    <>
      <Typography.Title level={3}>
        我的竞赛
      </Typography.Title>


      <Typography.Paragraph>
        查看你已经加入的竞赛，管理报名时间和备赛计划。
      </Typography.Paragraph>


      <Table
        rowKey="id"
        dataSource={myCompetitions}
        locale={{
          emptyText: '你还没有加入任何竞赛'
        }}
        columns={[
          {
            title:'竞赛名称',
            dataIndex:'name',
          },


          {
            title:'难度',
            dataIndex:'difficulty',
            render:(difficulty)=>(
              <Tag>
                {difficulty}
              </Tag>
            )
          },


          {
            title:'状态',
            dataIndex:'status',
            render:(status)=>(
              <Tag color="blue">
                {status}
              </Tag>
            )
          },


          {
            title:'截止时间',
            dataIndex:'deadline',
          },


          {
            title:'AI推荐理由',
            dataIndex:'reason',
          }
        ]}
      />
    </>
  );
}
