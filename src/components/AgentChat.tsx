import {
  Card,
  Input,
  Button,
  Typography,
  Space
} from "antd";

import {
  SendOutlined
} from "@ant-design/icons";

import {
  useState
} from "react";


import { designTokens } from "../styles/tokens";


export function AgentChat(){


 const [input,setInput]=useState("");



 return (

<Card

 title="赛智通 AI"

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


<div
style={{
height:300,
padding:20,
background:"#fafafa",
borderRadius:12
}}
>


<Typography.Title
level={4}
>

你好，我是赛智通

</Typography.Title>


<Typography.Paragraph>

我可以帮助你：

<br/>

• 分析适合你的竞赛方向

<br/>

• 推荐高匹配度比赛

<br/>

• 制定参赛规划

</Typography.Paragraph>


</div>



<Input.TextArea

rows={4}

value={input}

onChange={
e=>setInput(e.target.value)
}

placeholder="告诉我你的专业、兴趣和竞赛目标..."

/>


<Button

type="primary"

icon={<SendOutlined/>}

block

>

发送给AI分析

</Button>



</Space>


</Card>


 );


}
