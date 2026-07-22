import { Card, Col, Row, Space, Typography } from "antd";
import { CompetitionCard } from "../components/CompetitionCard";
import { SearchBox } from "../components/SearchBox";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";

export function AIRecommendation() {
  return (
    <Space
      direction="vertical"
      size={designTokens.spacing.xl}
      style={{ width: "100%" }}
    >
      <Card
        title="告诉AI你的竞赛目标"
        style={{
          borderRadius: designTokens.borderRadius,
          boxShadow: designTokens.boxShadow,
        }}
      >
        <Typography.Paragraph type="secondary">
          描述你的专业背景、兴趣方向和竞赛目标，AI将分析你的情况，为你推荐适合的竞赛方案。
        </Typography.Paragraph>

        <SearchBox />
      </Card>

      <Typography.Title level={3}>
        AI分析后的推荐方案
      </Typography.Title>

      <Row gutter={[designTokens.spacing.lg, designTokens.spacing.lg]}>
        {competitions.map((competition) => (
          <Col xs={24} md={8} key={competition.id}>
            <CompetitionCard competition={competition} />
          </Col>
        ))}
      </Row>
    </Space>
  );
}
