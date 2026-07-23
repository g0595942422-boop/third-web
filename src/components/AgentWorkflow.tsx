import {Card,Typography,Tag} from "antd";
import {UserOutlined,SearchOutlined,RobotOutlined,BulbOutlined} from "@ant-design/icons";
import {useState,useEffect} from "react";
import {designTokens} from "../styles/tokens";

const agents=[
{
title:"分析用户画像",
desc:"正在分析专业、兴趣、技能情况",
icon:<UserOutlined/>
},
{
title:"检索竞赛数据库",
desc:"寻找匹配的竞赛项目",
icon:<SearchOutlined/>
},
{
title:"评估竞赛价值",
desc:"计算匹配程度和发展价值",
icon:<RobotOutlined/>
},
{
title:"生成参赛方案",
desc:"输出最终竞赛规划建议",
icon:<BulbOutlined/>
}
];

export function AgentWorkflow(){
const [active,setActive]=useState(0);

useEffect(()=>{
const timer=setInterval(()=>{
setActive(prev=>{
if(prev>=3){
return 3;
}
return prev+1;
});
},2000);
return()=>clearInterval(timer);
},[]);

return(
<Card
title="AI 思考过程"
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
index!==agents.length-1&&(
<div
style={{
position:"absolute",
left:22,
top:42,
height:45,
borderLeft:"1px dashed #ddd"
}}
/>
)
}
<div
style={{
display:"flex",
alignItems:"flex-start",
gap:16
}}
>
<div
style={{
width:44,
height:44,
borderRadius:"50%",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:20,
background:index===active?"#1677ff":"#f5f5f5",
color:index===active?"white":"#666"
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
index<active
?
"success"
:
index===active
?
"processing"
:
"default"
}
>
{
index<active
?
"✓ 已完成"
:
index===active
?
"◉ 分析中"
:
"○ 等待"
}
</Tag>
</div>
</div>
</div>
))
}
</div>
</Card>
);
}
