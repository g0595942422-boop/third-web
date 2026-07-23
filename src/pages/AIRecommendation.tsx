import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Input,
  Button,
  Tag,
  Avatar
} from "antd";

import {
  SendOutlined,
  RobotOutlined,
  UserOutlined
} from "@ant-design/icons";

import {
  useRef,
  useState
} from "react";

import { CompetitionCard } from "../components/CompetitionCard";
import { competitions } from "../services/competitions";
import { sendMessage } from "../services/agent";
import { designTokens } from "../styles/tokens";


type Message={
  role:"user"|"assistant";
  content:string;
};


export function AIRecommendation(){

  const inputRef=useRef<any>(null);

  const [input,setInput]=useState("");

  const [loading,setLoading]=useState(false);

  const [messages,setMessages]=useState<Message[]>([
    {
      role:"assistant",
      content:"你好，我是赛智通AI竞赛智能体，请告诉我你的专业、兴趣方向和竞赛目标。"
    }
  ]);


  const [agentStatus,setAgentStatus]=useState([
    "✓ 用户背景分析完成",
    "✓ 竞赛数据库匹配完成",
    "◉ 正在评估竞赛价值",
    "○ 生成参赛方案"
  ]);


  const handleSend=async()=>{

    if(!input.trim()) return;

    const text=input;

    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        content:text
      }
    ]);

    setInput("");

    setLoading(true);


    setAgentStatus([
      "◉ 分析用户画像",
      "○ 搜索竞赛数据库",
      "○ 评估匹配程度",
      "○ 生成竞赛方案"
    ]);


    try{

      const result=await sendMessage(text);


      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:
          result.answer ||
          "根据你的情况，推荐关注AI创新、创新创业和综合实践类竞赛。"
        }
      ]);


      setAgentStatus([
        "✓ 用户背景分析完成",
        "✓ 竞赛数据库匹配完成",
        "✓ 竞赛价值评估完成",
        "✓ 推荐方案生成完成"
      ]);


    }catch{

      setMessages(prev=>[
        ...prev,
        {
          role:"assistant",
          content:"AI暂时无法连接，请稍后再试。"
        }
      ]);

    }


    setLoading(false);


    setTimeout(()=>{
      inputRef.current?.focus();
    },100);

  };


  return(
    <Space
      direction="vertical"
      size="large"
      style={{
        width:"100%"
      }}
    >

      <div>
        <Typography.Title
          level={2}
          style={{
            marginBottom:4
          }}
        >
          赛智通 AI竞赛智能体
        </Typography.Title>

        <Typography.Text type="secondary">
          基于用户画像和竞赛数据库的智能规划系统
        </Typography.Text>
      </div>


      <Row
        gutter={24}
        align="stretch"
      >

        <Col
          xs={24}
          md={16}
        >

          <Card
            title={
              <>
                <RobotOutlined/> AI智能对话
              </>
            }
            style={{
              borderRadius:designTokens.borderRadius,
              boxShadow:designTokens.boxShadow
            }}
          >

            <div
              style={{
                height:450,
                overflowY:"auto",
                padding:8
              }}
            >

              {
                messages.map((msg,index)=>(

                  <div
                    key={index}
                    style={{
                      display:"flex",
                      justifyContent:
                      msg.role==="user"
                      ?"flex-end"
                      :"flex-start",
                      marginBottom:16,
                      gap:10
                    }}
                  >

                    {
                      msg.role==="assistant" &&
                      <Avatar icon={<RobotOutlined/>}/>
                    }


                    <div
                      style={{
                        maxWidth:"75%",
                        padding:"12px 16px",
                        borderRadius:16,
                        background:
                        msg.role==="user"
                        ?" #e6f4ff"
                        :"#f5f5f5"
                      }}
                    >

                      {msg.content}

                    </div>


                    {
                      msg.role==="user" &&
                      <Avatar icon={<UserOutlined/>}/>
                    }


                  </div>

                ))
              }


              {
                loading &&
                <div>
                  <Avatar icon={<RobotOutlined/>}/>
                  <span style={{marginLeft:10}}>
                    AI正在分析竞赛方向...
                  </span>
                </div>
              }

            </div>


            <Input.TextArea
              ref={inputRef}
              value={input}
              rows={3}
              placeholder="输入你的专业、兴趣和竞赛目标..."
              onChange={e=>setInput(e.target.value)}
              onPressEnter={e=>{

                if(!e.shiftKey){

                  e.preventDefault();

                  handleSend();

                }

              }}
            />


            <Button
              type="primary"
              block
              icon={<SendOutlined/>}
              loading={loading}
              style={{
                marginTop:12
              }}
              onClick={handleSend}
            >
              {loading?"AI分析中":"发送给AI"}
            </Button>


          </Card>

        </Col>



        <Col
          xs={24}
          md={8}
        >

          <Space
            direction="vertical"
            size="large"
            style={{
              width:"100%"
            }}
          >

            <Card
              title="Agent运行状态"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              {
                agentStatus.map((item,index)=>(

                  <Typography.Paragraph
                    key={index}
                    style={{
                      marginBottom:8
                    }}
                  >
                    {item}
                  </Typography.Paragraph>

                ))
              }

            </Card>


            <Card
              title="用户画像"
              style={{
                borderRadius:designTokens.borderRadius,
                boxShadow:designTokens.boxShadow
              }}
            >

              <Tag color="blue">
                专业：待分析
              </Tag>
              <Tag color="green">
                技能：待分析
              </Tag>
              <Tag color="purple">
                目标：待分析
              </Tag>
              <Tag color="yellow">
                年级：待分析
              </Tag>
            </Card>

          </Space>

        </Col>


      </Row>



      <Card
        title="推荐竞赛"
        style={{
          borderRadius:designTokens.borderRadius,
          boxShadow:designTokens.boxShadow
        }}
      >

        <div
          style={{
            display:"flex",
            gap:16,
            overflowX:"auto",
            paddingBottom:8
          }}
        >

          {
            competitions.slice(0,10).map(item=>(

              <div
                key={item.id}
                style={{
                  minWidth:320
                }}
              >

                <CompetitionCard
                  competition={item}
                />

              </div>

            ))
          }

        </div>


      </Card>


    </Space>
  );

}
