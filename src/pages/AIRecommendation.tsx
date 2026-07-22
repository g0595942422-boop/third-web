import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button
} from "antd";

import {
  RobotOutlined,
  SendOutlined
} from "@ant-design/icons";

import { useRef, useState } from "react";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { designTokens } from "../styles/tokens";


export function AIRecommendation() {

  const [input,setInput]=useState("");

  const inputRef=useRef<any>(null);

  const [messages,setMessages]=useState([
    {
      role:"ai",
      content:"你好，我是你的竞赛规划助手。请告诉我你的专业方向、兴趣以及参赛目标。"
    }
  ]);

  const [loading,setLoading]=useState(false);


  const handleSend=()=>{

    if(!input.trim()) return;

    const message=input;

    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        content:message
      }
    ]);

    setInput("");

    setLoading(true);


    setTimeout(()=>{

      setLoading(false);

      setMessages(prev=>[
        ...prev,
        {
          role:"ai",
          content:"根据你的情况，我建议关注人工智能创新、创新创业以及综合实践类竞赛，这些方向能够帮助你积累项目经验。"
        }
      ]);

    },1200);


    setTimeout(()=>{
      inputRef.current?.focus();
    },100);

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


        {/* 左侧AI聊天 */}

        <Col xs={24} md={10}>

          <Card
            title={
              <>
                <RobotOutlined/> AI助手
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

              <div
                style={{
                  maxHeight:400,
                  overflowY:"auto"
                }}
              >

                {
                  messages.map((item,index)=>(

                    <div
                      key={index}
                      style={{
                        display:"flex",
                        justifyContent:
                          item.role==="user"
                          ?"flex-end"
                          :"flex-start",
                        marginBottom:12
                      }}
                    >

                      <div
                        style={{
                          maxWidth:"80%",
                          padding:"10px 14px",
                          borderRadius:12,
                          background:
                            item.role==="user"
                            ?"#e6f4ff"
                            :"#f5f5f5"
                        }}
                      >

                        <Typography.Text>
                          {item.role==="ai"?"AI：":"你："}
                          {item.content}
                        </Typography.Text>

                      </div>

                    </div>

                  ))
                }


                {
                  loading && (

                    <div
                      style={{
                        marginBottom:12
                      }}
                    >

                      <div
                        style={{
                          display:"inline-block",
                          padding:"10px 14px",
                          borderRadius:12,
                          background:"#f5f5f5"
                        }}
                      >

                        AI正在分析你的竞赛方向...

                      </div>

                    </div>

                  )
                }


              </div>


              <Input.TextArea
                ref={inputRef}
                rows={4}
                value={input}
                onChange={
                  e=>setInput(e.target.value)
                }
                onPressEnter={(e)=>{

                  if(!e.shiftKey){

                    e.preventDefault();

                    handleSend();

                  }

                }}
                placeholder="输入你的专业、兴趣和竞赛目标..."
              />


              <Button
                type="primary"
                icon={<SendOutlined/>}
                block
                onClick={handleSend}
              >
                发送给AI分析
              </Button>


            </Space>

          </Card>

        </Col>



        {/* 右侧推荐保持原样 */}

        <Col xs={24} md={14}>

          <Card
            title="AI推荐竞赛"
            style={{
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <Typography.Paragraph type="secondary">
              AI根据你的背景和目标，
              推荐适合你的竞赛方向。
            </Typography.Paragraph>


            <Row
              gutter={[
                designTokens.spacing.lg,
                designTokens.spacing.lg
              ]}
            >

              {
                competitions.slice(0,4).map(
                  competition=>(

                    <Col
                      xs={24}
                      sm={12}
                      key={competition.id}
                    >

                      <CompetitionCard
                        competition={competition}
                      />

                    </Col>

                  )
                )
              }

            </Row>


          </Card>

        </Col>


      </Row>


    </Space>

  );

}
