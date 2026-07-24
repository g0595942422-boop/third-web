/* ===== 类型定义 ===== */

export type CompetitionDifficulty = '入门' | '进阶' | '挑战';

export interface Competition {
  id: number;
  name: string;
  summary: string;
  difficulty: CompetitionDifficulty;
  deadline: string;
  officialUrl: string;
  reason: string;
  tags: string[];
  status: '报名中' | '热门' | '推荐';
}

/* ===== Mock 数据 ===== */

export const competitions: Competition[] = [
  {
    id: 1,
    name: '全国大学生人工智能创新大赛',
    summary: '面向AI应用创意、算法实践与产品原型的综合型竞赛。',
    difficulty: '进阶',
    deadline: '2026-09-15',
    officialUrl: 'https://example.com/ai-contest',
    reason: '适合计算机与人工智能方向学生，3个月内可完成模型方案与演示作品。',
    tags: ['人工智能', '算法', '团队赛'],
    status: '推荐',
  },
  {
    id: 2,
    name: '中国大学生服务外包创新创业大赛',
    summary: '聚焦企业真实命题，考察产品设计、工程实现与商业表达。',
    difficulty: '进阶',
    deadline: '2026-08-30',
    officialUrl: 'https://example.com/service-outsourcing',
    reason: '对就业导向用户友好，能够沉淀项目作品集与答辩经验。',
    tags: ['软件工程', '产品', '就业'],
    status: '热门',
  },
  {
    id: 3,
    name: '蓝桥杯全国软件和信息技术专业人才大赛',
    summary: '程序设计与软件开发方向的经典个人赛。',
    difficulty: '入门',
    deadline: '2026-10-20',
    officialUrl: 'https://example.com/lanqiao',
    reason: '适合希望通过稳定训练获得奖项的同学，备赛路径清晰。',
    tags: ['编程', '算法', '个人赛'],
    status: '报名中',
  },
];
