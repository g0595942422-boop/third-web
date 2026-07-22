import { Table, Typography, Tag } from 'antd';
import { competitions } from '../services/competitions';

export function MyCompetitions() {
  // 目前模拟用户收藏的比赛
  // 后续这里替换成后端接口：
  // getMyCompetitions(userId)

  const myCompetitions = competitions.filter(
    (item) => item.status === '推荐' || item.status === '热门'
  );

  return (
    <>
      <Typography.Title level={3}>
        我的竞赛
      </Typography.Title>

      <Typography.Paragraph>
        查看你收藏和关注的竞赛，方便管理报名时间和准备进度。
      </Typography.Paragraph>


      <Table
        rowKey="id"
        dataSource={myCompetitions}
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
            title:'推荐理由',
            dataIndex:'reason',
          }
        ]}
      />
    </>
  );
}
