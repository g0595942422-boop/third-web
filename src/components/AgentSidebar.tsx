import {
  Card,
  Typography,
  Space,
  Tag
} from "antd";

import {
  UserOutlined,
  SearchOutlined,
  BulbOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";

import { designTokens } from "../styles/tokens";


export function AgentSidebar(){

  const agents=[
    {
      icon:<UserOutlined/>,
      title:"用户画像 Agent",
      desc:"分析专业背景、兴趣方向、技能情况",
      status:"已完成",
      done:true
    },
    {
      icon:<SearchOutlined/>,
      title:"竞赛检索 Agent",
      desc:"匹配竞赛数据库，寻找适合项目",
      status:"已完成",
      done:true
    },
    {
      icon:<BulbOutlined/>,
      title:"竞赛评估 Agent",
      desc:"分析匹配程度和竞赛价值",
      status:"分析中",
      done:false
    },
    {
      icon:<CheckCircleOutlined/>,
      title:"方案生成 Agent",
      desc:"生成最终竞赛规划建议",
      status:"等待",
      done:false
    }
  ];


  return (

    <Card
      title="AI Agent 工作流"
      style={{
        height:"100%",
        borderRadius:designTokens.borderRadius,
        boxShadow:designTokens.boxShadow
      }}
    >

      <Space
        direction="vertical"
        size="large"
        style={{
          width:"100%"
        }}
      >


      {
        agents.map((agent,index)=>(

          <div
            key={index}
            style={{
              padding:"16px",
              borderRadius:12,
              borderLeft:
                agent.done
                ?"4px solid #52c41a"
                :"4px solid #1677ff",
              background:
                agent.done
                ?"rgba(82,196,26,0.05)"
                :"rgba(22,119,255,0.05)"
            }}
          >

            <Space>

              {agent.icon}

              <Typography.Text strong>
                {agent.title}
              </Typography.Text>

            </Space>


            <Typography.Paragraph
              type="secondary"
              style={{
                margin:"10px 0"
              }}
            >

              {agent.desc}

            </Typography.Paragraph>


            <Tag
              color={
                agent.done
                ?"green"
                :"blue"
              }
            >

              {agent.done?"✓ ":"◉ "}
              {agent.status}

            </Tag>


          </div>


        ))
      }


      </Space>


    </Card>

  );

}
