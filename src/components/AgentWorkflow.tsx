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

import {designTokens} from "../styles/tokens";


const steps=[
{
title:"分析用户画像",
desc:"正在分析专业、兴趣、技能",
icon:<UserOutlined/>,
status:"completed"
},
{
title:"检索竞赛数据库",
desc:"找到12项相关竞赛",
icon:<SearchOutlined/>,
status:"completed"
},
{
title:"评估竞赛价值",
desc:"计算匹配度和发展价值",
icon:<RobotOutlined/>,
status:"active"
},
{
title:"生成参赛方案",
desc:"等待分析完成",
icon:<BulbOutlined/>,
status:"wait"
}
];


export function AgentWorkflow(){

return(

<div>

<Typography.Title
level={4}
>
AI 思考过程
</Typography.Title>


{
steps.map((item,index)=>(

<div
key={item.title}
style={{
display:"flex",
gap:15,
marginBottom:25,
position:"relative"
}}
>


{
index!==steps.length-1&&

<div
style={{
position:"absolute",
left:18,
top:40,
height:35,
borderLeft:"1px dashed #ccc"
}}
/>

}


<div
style={{
width:38,
height:38,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
background:
item.status==="active"
?
"#1677ff"
:
"#f5f5f5",
color:
item.status==="active"
?
"#fff"
:
"#333"
}}
>

{item.icon}

</div>


<div>

<Typography.Text strong>
{item.title}
</Typography.Text>


<br/>

<Typography.Text
type="secondary"
>
{item.desc}
</Typography.Text>


<br/>


<Tag
color={
item.status==="completed"
?
"success"
:
item.status==="active"
?
"processing"
:
"default"
}
>

{
item.status==="completed"
?
"✓ 已完成"
:
item.status==="active"
?
"◉ 分析中"
:
"○ 等待"
}

</Tag>


</div>


</div>

))

}


</div>

)

}
