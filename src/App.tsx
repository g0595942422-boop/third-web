import { ConfigProvider, Tabs } from 'antd';
import { useEffect, useState } from 'react';

import { AppLayout } from './layouts/AppLayout';
import { AIRecommendation } from './pages/AIRecommendation';
import { Home } from './pages/Home';
import { MyCompetitions } from './pages/MyCompetitions';
import { designTokens } from './styles/tokens';

export default function App() {
  const [activeKey, setActiveKey] = useState('home');

    const navigate = (key: string) => () => setActiveKey(key);

  useEffect(() => {
    window.addEventListener('openAI', navigate('ai'));
    window.addEventListener('goMine', navigate('mine'));
    window.addEventListener('goHome', navigate('home'));

    return () => {
      window.removeEventListener('openAI', navigate('ai'));
      window.removeEventListener('goMine', navigate('mine'));
      window.removeEventListener('goHome', navigate('home'));
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: designTokens.colorPrimary,
          borderRadius: designTokens.borderRadiusSmall
        }
      }}
    >
      <AppLayout>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={[
            {
              key: 'home',
              label: '首页',
              children: <Home />
            },
            {
              key: 'ai',
              label: 'AI推荐',
              children: <AIRecommendation />
            },
            {
              key: 'mine',
              label: '我的竞赛',
              children: <MyCompetitions />
            }
          ]}
        />
      </AppLayout>
    </ConfigProvider>
  );
}
