import { Button, Card, Col, Row, Space, Tag, Typography, Divider } from 'antd';
import { useState } from 'react';

import {
  TrophyOutlined,
  RobotOutlined,
  RightOutlined,
  ThunderboltOutlined,
  ArrowRightOutlined,
  TeamOutlined,
  ExperimentOutlined,
  OrderedListOutlined
} from '@ant-design/icons';

import { competitions } from '../services/competitions';
import { designTokens } from '../styles/tokens';


const CARD_STYLE = {
  borderRadius: designTokens.borderRadius,
  border: '1px solid rgba(22,119,255,0.08)',
  boxShadow: '0 4px 16px rgba(15,23,42,0.06)',
};
const CARD_BODY = { padding: '20px 24px' };

const SEC_GAP = { marginBottom: designTokens.spacing.xxl };

function tagColor(v: string): string {
  const map: Record<string, string> = { '报名中':'#52c41a', '热门':'#fa8c16', '推荐':'#1677ff', '入门':'#52c41a', '进阶':'#fa8c16', '挑战':'#f5222d' };
  return map[v] || '#1677ff';
}

function SectionHeader({ icon, title, sub, action }: { icon: React.ReactNode; title: string; sub?: string; action?: React.ReactNode; }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: designTokens.spacing.md }}>
      <div>
        <Typography.Title level={4} style={{ margin:0, display:'flex', alignItems:'center', gap:8, fontSize:18 }}>
          {icon}{title}
        </Typography.Title>
        {sub && <Typography.Text type='secondary' style={{ fontSize:13, marginTop:2, display:'block' }}>{sub}</Typography.Text>}
      </div>
      {action}
    </div>
  );
}

const WORKFLOW_STEPS = [
  { icon: <RobotOutlined />, title: '输入需求', desc: '描述你的专业、兴趣和竞赛目标', color: '#1677ff' },
  { icon: <ExperimentOutlined />, title: '分析画像', desc: 'AI 自动提取关键词，构建用户画像', color: '#4096ff' },
  { icon: <OrderedListOutlined />, title: '匹配数据库', desc: '从竞赛库中筛选最契合的赛事', color: '#52c41a' },
  { icon: <TeamOutlined />, title: '评估匹配度', desc: '按专业、兴趣、目标综合打分排序', color: '#fa8c16' },
  { icon: <ThunderboltOutlined />, title: '生成方案', desc: '输出个性化竞赛推荐与规划路线', color: '#eb2f96' },
];

export function Home() {
  const hot = competitions.slice(0,3);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const goAI = () => window.dispatchEvent(new Event('openAI'));
  const goMine = () => window.dispatchEvent(new Event('goMine'));

  // 判断摘要是否超过2行：按中文字符估算，每行~28字
  const isMultiLine = (text: string) => text.length > 56;

  return (
    <div>

      <div style={{ position:'relative', overflow:'hidden', borderRadius: designTokens.borderRadius, background:'linear-gradient(135deg,#0c1833 0%,#132952 40%,#1a3a6b 100%)', padding:'64px 48px', ...SEC_GAP }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)', backgroundSize:'48px 48px' }} />
        <div style={{ position:'absolute', top:-80, right:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(22,119,255,0.18) 0%, transparent 70%)' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:520 }}>
            <div style={{ marginBottom: designTokens.spacing.md }}>
              <Tag style={{ borderRadius:20, padding:'4px 14px', fontSize:13, margin:0, background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.85)', border:'1px solid rgba(255,255,255,0.15)' }}>
                <RobotOutlined style={{ marginRight:6 }} /> 基于 AI 的竞赛规划平台
              </Tag>
            </div>
            <Typography.Title level={1} style={{ color:'#fff', margin:0, marginBottom: designTokens.spacing.md, fontSize:36, fontWeight:700, letterSpacing:'-0.5px', lineHeight:1.2 }}>
              让 AI 为你找到最适合的竞赛
            </Typography.Title>
            <Typography.Paragraph style={{ color:'rgba(255,255,255,0.65)', fontSize:15, margin:0, marginBottom: designTokens.spacing.lg, lineHeight:1.7 }}>
              输入你的专业、兴趣和目标，赛智通 AI 将自动分析你的画像，从赛事库中精准匹配竞赛，并生成个性化的参赛规划路线。
            </Typography.Paragraph>
            <div style={{ display:'flex', gap:12 }}>
              <Button type='primary' size='large' icon={<RobotOutlined />} onClick={goAI}
                style={{ height:48, padding:'0 28px', borderRadius:12, fontSize:15, border:'none', boxShadow:'0 8px 24px rgba(22,119,255,0.35)' }}>
                开始 AI 竞赛规划
              </Button>

            </div>
          </div>
        </div>
      </div>

      <Row gutter={[designTokens.spacing.lg, designTokens.spacing.md]} style={SEC_GAP}>
        {[
          { icon: <RobotOutlined style={{ color:'#fff', fontSize:20 }} />, gradient:'linear-gradient(135deg,#1677ff,#4096ff)', title:'AI 智能规划', desc:'输入背景信息，AI 帮你分析最匹配的竞赛', arrowColor:'#1677ff', onClick:goAI },
          { icon: <TrophyOutlined style={{ color:'#fff', fontSize:20 }} />, gradient:'linear-gradient(135deg,#52c41a,#73d13d)', title:'浏览竞赛库', desc: competitions.length + ' 个赛事，涵盖 AI、算法、创新创业等方向', arrowColor:'#52c41a' },
          { icon: <ThunderboltOutlined style={{ color:'#fff', fontSize:20 }} />, gradient:'linear-gradient(135deg,#fa8c16,#ffa940)', title:'管理参赛计划', desc:'收藏竞赛、跟踪进度，让备赛有条不紊', arrowColor:'#fa8c16', onClick: goMine },
        ].map((item, i) => (
          <Col xs={24} md={8} key={i}>
            <Card hoverable style={CARD_STYLE} bodyStyle={CARD_BODY} onClick={item.onClick}>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:44, height:44, borderRadius:12, background: item.gradient, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {item.icon}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <Typography.Text strong style={{ fontSize:15, display:'block', marginBottom:2 }}>{item.title}</Typography.Text>
                  <Typography.Text type='secondary' style={{ fontSize:13, lineHeight:1.4 }}>{item.desc}</Typography.Text>
                </div>
                <ArrowRightOutlined style={{ color: item.arrowColor, fontSize:14, flexShrink:0 }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={SEC_GAP}>
        <SectionHeader
          icon={<TrophyOutlined style={{ color: designTokens.colorPrimary, fontSize:18 }} />}
          title='热门竞赛'
          sub='当前推荐赛事，AI 将根据你的背景自动匹配'

        />
        <Row gutter={[designTokens.spacing.lg, designTokens.spacing.md]}>
          {hot.map(item => (
            <Col xs={24} md={8} key={item.id}>
              <Card hoverable style={{ ...CARD_STYLE, height:'100%' }} bodyStyle={CARD_BODY}>
                <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
                  {/* Tags - fixed 32px */}
                  <div style={{ height:32, display:'flex', gap:6, alignItems:'center', marginBottom:4 }}>
                    <Tag color={tagColor(item.status)} style={{ borderRadius:6, fontSize:12, padding:'2px 10px', margin:0, border:'none', lineHeight:'22px' }}>{item.status}</Tag>
                    <Tag color={tagColor(item.difficulty)} style={{ borderRadius:6, fontSize:12, padding:'2px 10px', margin:0, border:'none', lineHeight:'22px' }}>{item.difficulty}</Tag>
                  </div>
                  {/* Title - fixed 48px */}
                  <div style={{ height:48, display:'flex', alignItems:'flex-start', marginBottom:4 }}>
                    <Typography.Text strong style={{ fontSize:16, lineHeight:1.4, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                      {item.name}
                    </Typography.Text>
                  </div>
                  {/* Summary - expandable */}
                  <div style={{ minHeight:48, marginBottom:4 }}>
                    <Typography.Paragraph type='secondary' style={{ fontSize:13, margin:0, lineHeight:1.6 }} ellipsis={expandedId === item.id ? false : { rows:2 }}>{item.summary}</Typography.Paragraph>
                  </div>
                  {/* Tags */}
                  <div style={{ minHeight:28, display:'flex', gap:6, flexWrap:'wrap', marginBottom:4 }}>
                    {item.tags.map(t => (
                      <Tag key={t} style={{ borderRadius:4, fontSize:12, padding:'0 10px', lineHeight:'24px', background:'rgba(22,119,255,0.06)', color: designTokens.colorPrimary, border:'1px solid rgba(22,119,255,0.12)', margin:0 }}>{t}</Tag>
                    ))}
                  </div>
                  {/* Expand/Collapse - only show if multi-line */}
                  {isMultiLine(item.summary) && (
                    <div
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      style={{ cursor:'pointer', color: designTokens.colorPrimary, fontSize:12, marginBottom:4, userSelect:'none' }}
                    >
                      {expandedId === item.id ? '收起详情 ▲' : '展开详情 ▼'}
                    </div>
                  )}
                  <Divider style={{ margin:0 }} />
                  <div style={{ marginTop:'auto', display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:8 }}>
                    <Typography.Text type='secondary' style={{ fontSize:12, lineHeight:'22px' }}>截止 {item.deadline}</Typography.Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Card style={{ ...CARD_STYLE, marginBottom: designTokens.spacing.xxl, background:'linear-gradient(135deg, rgba(22,119,255,0.02) 0%, rgba(22,119,255,0.05) 100%)' }} bodyStyle={{ padding:'32px 28px' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <Tag color={designTokens.colorPrimary} style={{ borderRadius:20, padding:'2px 14px', fontSize:12, marginBottom:10 }}>
            <RobotOutlined style={{ marginRight:4 }} /> Agentic Workflow
          </Tag>
          <Typography.Title level={4} style={{ margin:0, marginBottom:6, fontSize:18 }}>AI 智能体工作流</Typography.Title>
          <Typography.Text type='secondary' style={{ fontSize:14 }}>从你输入需求到获得推荐方案，AI 智能体自动完成五个步骤</Typography.Text>
        </div>
        <Row gutter={[16, 20]} justify='center'>
          {WORKFLOW_STEPS.map((step, index) => (
            <Col xs={12} sm={8} md={4} key={index}>
              <div style={{ textAlign:'center', padding:'8px 4px' }}>
                <div style={{ width:52, height:52, borderRadius:14, background:`linear-gradient(135deg, ${step.color}18, ${step.color}08)`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', color: step.color, fontSize:22 }}>
                  {step.icon}
                </div>
                <Typography.Text strong style={{ fontSize:13, display:'block', marginBottom:2 }}>{step.title}</Typography.Text>
                <Typography.Text type='secondary' style={{ fontSize:12, lineHeight:1.4, display:'block' }}>{step.desc}</Typography.Text>
              </div>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign:'center', marginTop:28 }}>
          <Button type='primary' icon={<RobotOutlined />} onClick={goAI} style={{ height:44, padding:'0 28px', borderRadius:12, fontSize:14 }}>开始体验 AI 规划</Button>
        </div>
      </Card>

      <div style={{ borderTop:'1px solid rgba(15,23,42,0.06)', paddingTop: designTokens.spacing.md, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <Space size={12}>
          <Typography.Text strong style={{ fontSize:14, display:'flex', alignItems:'center', gap:6 }}>
            <RobotOutlined style={{ color: designTokens.colorPrimary, fontSize:16 }} /> 赛智通
          </Typography.Text>
          <Typography.Text type='secondary' style={{ fontSize:13 }}>基于 AI 的大学生竞赛规划平台</Typography.Text>
        </Space>
        <Space size={16}>
          <Typography.Link style={{ fontSize:13 }}>首页</Typography.Link>
          <Typography.Link style={{ fontSize:13 }}>AI推荐</Typography.Link>
          <Typography.Link style={{ fontSize:13 }}>我的竞赛</Typography.Link>
        </Space>
        <Typography.Text type='secondary' style={{ fontSize:12 }}>&copy; 2026 赛智通</Typography.Text>
      </div>

    </div>
  );
}
