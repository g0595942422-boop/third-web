import { ConfigProvider, Tabs } from 'antd';
import { AppLayout } from './layouts/AppLayout';
import { AIRecommendation } from './pages/AIRecommendation';
import { Home } from './pages/Home';
import { MyCompetitions } from './pages/MyCompetitions';
import { designTokens } from './styles/tokens';

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: designTokens.colorPrimary, borderRadius: designTokens.borderRadiusSmall } }}>
      <AppLayout>
        <Tabs items={[{ key: 'home', label: '首页', children: <Home /> }, { key: 'ai', label: 'AI推荐', children: <AIRecommendation /> }, { key: 'mine', label: '我的竞赛', children: <MyCompetitions /> }]} />
      </AppLayout>
    </ConfigProvider>
  );
}
