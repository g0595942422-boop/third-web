import {
  Card,
  Space,
  Typography,
  Tag
} from "antd";

import {
  UserOutlined,
  SearchOutlined,
  RobotOutlined,
  BulbOutlined
} from "@ant-design/icons";

import { designTokens } from "../styles/tokens";


const agents=[
  {
    title:"用户画像 Agent",
    icon:<UserOutlined/>,
    desc:"分析专业背景、兴趣方向、技能情况",
    status:"done"
  },
  {
    title:"竞赛检索 Agent",
    icon:<SearchOutlined/>,
    desc:"匹配竞赛数据库，寻找适合项目",
    status:"done"
  },
  {
    title:"竞赛评估 Agent",
    icon:<RobotOutlined/>,
    desc:"分析匹配程度和参赛价值",
    status:"running"
  },
  {
    title:"方案生成 Agent",
    icon:<BulbOutlined/>,
    desc:"生成最终竞赛规划建议",
    status:"waiting"
  }
];


export function AgentWorkflow(){

return(

<Card
title="AI Agent 工作流"
style={{
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
key={agent.title}
style={{
position:"relative"
}}
>


<Card
size="small"
style={{

borderLeft:
agent.status==="running"
?"4px solid #1677ff"
:
agent.status==="done"
?"4px solid #52c41a"
:"4px solid #d9d9d9",

background:
agent.status==="running"
?"#f0f7ff"
:"#fff"

}}
>


<Space>

<div
style={{
fontSize:20
}}
>

{agent.icon}

</div>


<div>

<Typography.Text strong>

{agent.title}

</Typography.Text>


<br/>


<Typography.Text type="secondary">

{agent.desc}

</Typography.Text>


</div>


</Space>



<div
style={{
marginTop:8
}}
>

{

agent.status==="done"&&(

<Tag color="success">
✓ 已完成
</Tag>

)

}


{

agent.status==="running"&&(

<Tag color="processing">
◉ 分析中
</Tag>

)

}


{

agent.status==="waiting"&&(

<Tag>
○ 等待
</Tag>

)

}


</div>


</Card>


{
index!==agents.length-1&&(

<div
style={{
height:25,
borderLeft:"2px dashed #d9d9d9",
marginLeft:20
}}
/>

)

}


</div>


))
}


</Space>


</Card>


)

}
