import {
  Card,
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
    desc:"分析专业背景、兴趣方向、技能情况",
    icon:<UserOutlined/>,
    status:"完成",
    type:"done"
  },
  {
    title:"竞赛检索 Agent",
    desc:"匹配竞赛数据库，寻找适合项目",
    icon:<SearchOutlined/>,
    status:"完成",
    type:"done"
  },
  {
    title:"竞赛评估 Agent",
    desc:"分析匹配程度和参赛价值",
    icon:<RobotOutlined/>,
    status:"分析中",
    type:"running"
  },
  {
    title:"方案生成 Agent",
    desc:"生成最终竞赛规划建议",
    icon:<BulbOutlined/>,
    status:"等待",
    type:"wait"
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


<div>

{
agents.map((agent,index)=>(

<div
key={agent.title}
style={{
position:"relative",
paddingBottom:index===agents.length-1?0:28
}}
>


{
index!==agents.length-1&&
<div
style={{
position:"absolute",
left:22,
top:45,
height:40,
borderLeft:"1px dashed #ddd"
}}
/>
}



<div
style={{
display:"flex",
alignItems:"center",
gap:14,
padding:16,
borderRadius:12,
border:
agent.type==="running"
?
"1px solid #1677ff"
:
"1px solid #eee",
background:
agent.type==="running"
?
"#f0f7ff"
:
"#fff"
}}
>


<div
style={{
fontSize:22
}}
>

{agent.icon}

</div>


<div
style={{
flex:1
}}
>

<Typography.Text strong>
{agent.title}
</Typography.Text>


<br/>


<Typography.Text
type="secondary"
style={{
fontSize:13
}}
>
{agent.desc}
</Typography.Text>


<br/>


<Tag
color={
agent.type==="done"
?
"success"
:
agent.type==="running"
?
"blue"
:
"default"
}
>

{
agent.type==="done"
?
"✓ "
:
agent.type==="running"
?
"◉ "
:
"○ "
}

{agent.status}

</Tag>


</div>


</div>


</div>

))

}


</div>


</Card>

)

}
