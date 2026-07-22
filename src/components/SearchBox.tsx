import { Button, Form, Input, Typography } from 'antd';

export function SearchBox() {
  return (
    <Form layout="vertical" style={{ maxWidth: 880 }}>

      <Typography.Paragraph type="secondary">
        请告诉AI你的专业背景、兴趣方向、技能水平、时间安排和参赛目标，
        AI将分析你的情况并推荐最适合你的竞赛方案。
      </Typography.Paragraph>

      <Form.Item label="告诉AI你的竞赛需求">
        <Input.TextArea
          rows={6}
          placeholder="例如：我是经济学专业大二学生，对人工智能和创新创业方向感兴趣，目前编程基础一般，希望利用3个月时间参加一个适合我的比赛，目标是获得奖项并积累就业经验"
        />
      </Form.Item>


      <Typography.Paragraph type="secondary">
        💡 提示：
        <br />
        可以告诉AI：
        <br />
        · 你的专业（例如：计算机、经济学、设计）
        <br />
        · 感兴趣的方向（例如：人工智能、创业、算法）
        <br />
        · 可投入时间（例如：1个月、3个月、半年）
        <br />
        · 参赛目标（例如：获奖、科研、就业、留学、保研）
          <br />
        · 拥有的技能（例如：python、c++、stata）
      </Typography.Paragraph>


      <Button type="primary" size="large">
        开始AI分析
      </Button>

    </Form>
  );
}
