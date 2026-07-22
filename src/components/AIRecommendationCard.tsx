import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Progress,
  Tag
} from "antd";

import {
  RobotOutlined,
  SendOutlined
} from "@ant-design/icons";

import { useState } from "react";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function AIRecommendation() {

  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role:"ai",
      content:"你好，我是你的竞赛规划助手。请告诉我你的专业方向、兴趣以及参赛目标。"
    }
  ]);


  const handleSend = () => {

    if (!input.trim()) return;


    setMessages(prev => [
      ...prev,
      {
        role:"user",
        content:input
      }
    ]);


    setTimeout(()=>{

      setMessages(prev=>[
        ...prev,
        {
          role:"ai",
          content:"根据你的情况，我建议关注人工智能创新、创新创业以及综合实践类竞赛。这些方向能够帮助你积累项目经验，提高竞争力。"
        }
      ]);

    },500);


    setInput("");

  };


  return (
    <Space
      direction="vertical"
      size={designTokens.spacing.xl}
      style={{width:"100%"}}
    >

      <Typography.Title level={2}>
        AI竞赛规划助手
      </Typography.Title>


      <Row
        gutter={[
          designTokens.spacing.lg,
          designTokens.spacing.lg
        ]}
      >

        <Col xs={24} md={10}>

          <Card
            title={
              <>
                <RobotOutlined /> AI助手
              </>
            }
            style={{
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <Space
              direction="vertical"
              size="middle"
              style={{width:"100%"}}
            >

              {
                messages.map((item,index)=>(

                  <Card
                    size="small"
                    key={index}
                    style={{
                      background:
                        item.role==="user"
                          ? "#f0f5ff"
                          : "#fafafa"
                    }}
                  >

                    <Typography.Text>

                      {
                        item.role==="user"
                          ? "你："
                          : "AI："
                      }

                      {item.content}

                    </Typography.Text>

                  </Card>

                ))
              }


              <Input.TextArea
                rows={4}
                value={input}
                onChange={
                  e=>setInput(e.target.value)
                }
                placeholder="输入你的专业、兴趣和竞赛目标..."
              />


              <Button
                type="primary"
                icon={<SendOutlined />}
                block
                onClick={handleSend}
              >
                发送给AI分析
              </Button>


            </Space>

          </Card>

        </Col>



        <Col xs={24} md={14}>

          <Space
            direction="vertical"
            size="large"
            style={{width:"100%"}}
          >

            <Card
              title="AI分析结果"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Typography.Text strong>
                综合匹配度
              </Typography.Text>


              <Progress percent={95}/>


              <Typography.Title level={5}>
                推荐方向：AI创新与应用
              </Typography.Title>


              <Typography.Paragraph>
                <b>适合你的原因：</b>
                <br/>
                · AI方向发展空间大
                <br/>
                · 可以结合个人专业背景形成优势
                <br/>
                · 有利于积累项目经验
              </Typography.Paragraph>


              <Typography.Paragraph>
                <b>提升方向：</b>
                <br/>
                · 学习Python基础
                <br/>
                · 增加项目实践
                <br/>
                · 提前准备竞赛作品
              </Typography.Paragraph>


            </Card>




            <Card
              title="推荐竞赛"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Row
                gutter={[
                  designTokens.spacing.lg,
                  designTokens.spacing.lg
                ]}
              >

                {
                  competitions.slice(0,4).map(item=>(

                    <Col
                      xs={24}
                      sm={12}
                      key={item.id}
                    >

                      <Card>

                        <Tag color="blue">
                          AI匹配度90%
                        </Tag>


                        <CompetitionCard
                          competition={item}
                        />

                      </Card>

                    </Col>

                  ))
                }

              </Row>

            </Card>


          </Space>

        </Col>


      </Row>


    </Space>
  );
}
