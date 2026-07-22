import { Button, Form, Input, Select } from 'antd';
import { designTokens } from '../styles/tokens';

export function SearchBox() {
  return (
    <Form layout="vertical" style={{ maxWidth: 880 }}>
      <Form.Item label="专业方向" name="major">
        <Input placeholder="例如：计算机" />
      </Form.Item>
      <Form.Item label="兴趣领域" name="interest">
        <Input placeholder="例如：人工智能" />
      </Form.Item>
      <Form.Item label="备赛时间" name="time">
        <Select placeholder="请选择可投入时间" options={[{ value: '1个月', label: '1个月' }, { value: '3个月', label: '3个月' }, { value: '6个月', label: '6个月' }]} />
      </Form.Item>
      <Form.Item label="目标" name="goal">
        <Select placeholder="请选择参赛目标" options={[{ value: '获奖', label: '获得奖项' }, { value: '科研', label: '科研积累' }, { value: '就业', label: '就业作品集' }]} />
      </Form.Item>
      <Button type="primary" size="large" style={{ borderRadius: designTokens.borderRadiusSmall }}>生成推荐</Button>
    </Form>
  );
}
