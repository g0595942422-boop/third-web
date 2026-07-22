const { Button, Card, Col, ConfigProvider, Form, Input, Layout, Menu, Row, Select, Space, Table, Tabs, Tag, Typography } = antd;
const { createElement: h } = React;

const designTokens = {
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#fa8c16',
  colorTextSecondary: '#667085',
  colorBgLayout: '#f5f7fb',
  colorBgContainer: '#ffffff',
  borderRadius: 16,
  borderRadiusSmall: 8,
  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
  spacing: { sm: 12, lg: 24, xl: 32 },
};

const competitions = [
  { id: 1, name: '全国大学生人工智能创新大赛', summary: '面向AI应用创意、算法实践与产品原型的综合型竞赛。', difficulty: '进阶', deadline: '2026-09-15', officialUrl: 'https://example.com/ai-contest', reason: '适合计算机与人工智能方向学生，3个月内可完成模型方案与演示作品。', tags: ['人工智能', '算法', '团队赛'], status: '推荐' },
  { id: 2, name: '中国大学生服务外包创新创业大赛', summary: '聚焦企业真实命题，考察产品设计、工程实现与商业表达。', difficulty: '进阶', deadline: '2026-08-30', officialUrl: 'https://example.com/service-outsourcing', reason: '对就业导向用户友好，能够沉淀项目作品集与答辩经验。', tags: ['软件工程', '产品', '就业'], status: '热门' },
  { id: 3, name: '蓝桥杯全国软件和信息技术专业人才大赛', summary: '程序设计与软件开发方向的经典个人赛。', difficulty: '入门', deadline: '2026-10-20', officialUrl: 'https://example.com/lanqiao', reason: '适合希望通过稳定训练获得奖项的同学，备赛路径清晰。', tags: ['编程', '算法', '个人赛'], status: '报名中' },
];

const statusType = { 报名中: 'success', 热门: 'warning', 推荐: 'primary' };
const colorMap = { primary: designTokens.colorPrimary, success: designTokens.colorSuccess, warning: designTokens.colorWarning, default: designTokens.colorTextSecondary };

function CompetitionTag({ children, type = 'default' }) {
  return h(Tag, { color: colorMap[type] }, children);
}

function CompetitionCard({ competition }) {
  return h(Card, { style: { borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow, height: '100%' } },
    h(Space, { direction: 'vertical', size: designTokens.spacing.sm, style: { width: '100%' } },
      h(Space, { wrap: true },
        h(CompetitionTag, { type: statusType[competition.status] }, competition.status),
        h(CompetitionTag, null, competition.difficulty),
      ),
      h(Typography.Title, { level: 4, style: { margin: 0 } }, competition.name),
      h(Typography.Paragraph, { type: 'secondary' }, competition.summary),
      h(Space, { wrap: true }, competition.tags.map((tag) => h(CompetitionTag, { key: tag, type: 'primary' }, tag))),
      h(Typography.Text, { type: 'secondary' }, `截止时间：${competition.deadline}`),
      h(Typography.Paragraph, null, `推荐理由：${competition.reason}`),
      h(Button, { type: 'primary', href: competition.officialUrl, target: '_blank' }, '查看官网'),
    ),
  );
}

function SearchBox() {
  return h(Form, { layout: 'vertical', style: { maxWidth: 880 } },
    h(Form.Item, { label: '专业方向', name: 'major' }, h(Input, { placeholder: '例如：计算机' })),
    h(Form.Item, { label: '兴趣领域', name: 'interest' }, h(Input, { placeholder: '例如：人工智能' })),
    h(Form.Item, { label: '备赛时间', name: 'time' }, h(Select, { placeholder: '请选择可投入时间', options: [{ value: '1个月', label: '1个月' }, { value: '3个月', label: '3个月' }, { value: '6个月', label: '6个月' }] })),
    h(Form.Item, { label: '目标', name: 'goal' }, h(Select, { placeholder: '请选择参赛目标', options: [{ value: '获奖', label: '获得奖项' }, { value: '科研', label: '科研积累' }, { value: '就业', label: '就业作品集' }] })),
    h(Button, { type: 'primary', size: 'large', style: { borderRadius: designTokens.borderRadiusSmall } }, '生成推荐'),
  );
}

function CompetitionGrid() {
  return h(Row, { gutter: [designTokens.spacing.lg, designTokens.spacing.lg] }, competitions.map((competition) => h(Col, { xs: 24, md: 8, key: competition.id }, h(CompetitionCard, { competition }))));
}

function Home() {
  return h(Space, { direction: 'vertical', size: designTokens.spacing.xl, style: { width: '100%' } },
    h(Card, { style: { borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow } },
      h(Typography.Title, null, '找到真正适合你的竞赛'),
      h(Typography.Paragraph, { type: 'secondary' }, '根据专业、兴趣、技能水平、时间安排与目标，快速获得竞赛推荐。'),
      h(Button, { type: 'primary', size: 'large' }, '开始 AI 推荐'),
    ),
    h(Typography.Title, { level: 3 }, '热门竞赛'),
    h(CompetitionGrid),
  );
}

function AIRecommendation() {
  return h(Space, { direction: 'vertical', size: designTokens.spacing.xl, style: { width: '100%' } },
    h(Card, { title: 'AI 推荐条件', style: { borderRadius: designTokens.borderRadius, boxShadow: designTokens.boxShadow } }, h(SearchBox)),
    h(Typography.Title, { level: 3 }, '推荐结果'),
    h(CompetitionGrid),
  );
}

function MyCompetitions() {
  return h(React.Fragment, null,
    h(Typography.Title, { level: 3 }, '我的竞赛'),
    h(Table, { rowKey: 'id', dataSource: competitions, columns: [{ title: '竞赛名称', dataIndex: 'name' }, { title: '状态', dataIndex: 'status' }, { title: '截止时间', dataIndex: 'deadline' }] }),
  );
}

function AppLayout({ children }) {
  return h(Layout, { style: { minHeight: '100vh' } },
    h(Layout.Header, { style: { background: designTokens.colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: designTokens.boxShadow } },
      h(Typography.Title, { level: 4, style: { margin: 0, color: designTokens.colorPrimary } }, '竞赛智能推荐平台'),
      h(Menu, { mode: 'horizontal', selectable: false, items: [{ key: 'home', label: '首页' }, { key: 'recommend', label: 'AI推荐' }, { key: 'mine', label: '我的竞赛' }] }),
    ),
    h(Layout.Content, { style: { padding: designTokens.spacing.xl, background: designTokens.colorBgLayout } }, children),
    h(Layout.Footer, { style: { textAlign: 'center', color: designTokens.colorTextSecondary } }, '用 AI 帮你找到更适合的竞赛'),
  );
}

function App() {
  return h(ConfigProvider, { theme: { token: { colorPrimary: designTokens.colorPrimary, borderRadius: designTokens.borderRadiusSmall } } },
    h(AppLayout, null,
      h(Tabs, { items: [{ key: 'home', label: '首页', children: h(Home) }, { key: 'ai', label: 'AI推荐', children: h(AIRecommendation) }, { key: 'mine', label: '我的竞赛', children: h(MyCompetitions) }] }),
    ),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
