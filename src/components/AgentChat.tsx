import {
  Card,
  Input,
  Button,
  Typography,
  Tag
} from "antd";

import {
  RobotOutlined,
  SendOutlined
} from "@ant-design/icons";

import { useState } from "react";


export function AgentChat(){

  const [input,setInput]=useState("");

  const [messages,setMessages]=useState([
    {
      role:"ai",
      text:"你好，我是你的竞赛规划智能体。我会根据你的专业背景、兴趣方向和目标，为你分析适合参加的竞赛。"
    }
  ]);

  const [status,setStatus]=useState([
    "等待输入",
    "分析用户背景",
    "匹配竞赛数据库",
    "评估竞赛价值",
    "生成参赛方案"
  ]);


  const handleSend=()=>{

    if(!input.trim())return;

    setMessages(prev=>[
      ...prev,
      {
        role:"user",
        text:input
      },
      {
        role:"ai",
        text:"正在分析你的信息，并匹配适合你的竞赛方向..."
      }
    ]);

    setInput("");

    let index=0;

    const timer=setInterval(()=>{

      setStatus(prev=>{

        const arr=[...prev];

        if(index<arr.length){
          arr[index]="✓ "+arr[index];
        }

        index++;

        return arr;
      });


      if(index>=status.length){
        clearInterval(timer);
      }

    },700);

  };


  return(
    <Card
      title={
        <>
          <RobotOutlined/> AI竞赛智能体
        </>
      }
      style={{
        height:720,
        borderRadius:20
      }}
    >

      <div
        style={{
          height:300,
          overflowY:"auto",
          marginBottom:20
        }}
      >

        {
          messages.map((item,index)=>(

            <div
              key={index}
              style={{
                marginBottom:15,
                textAlign:item.role==="user"?"right":"left"
              }}
            >

              <div
                style={{
                  display:"inline-block",
                  padding:"10px 14px",
                  borderRadius:12,
                  background:item.role==="user"?"#e6f4ff":"#f5f5f5",
                  maxWidth:"85%"
                }}
              >

                <Typography.Text>
                  {item.role==="ai"?"AI：":"你："}
                  {item.text}
                </Typography.Text>

              </div>

            </div>

          ))
        }

      </div>


      <Card
        size="small"
        title="Agent执行状态"
        style={{
          marginBottom:20
        }}
      >

        {
          status.map((item,index)=>(

            <div
              key={index}
              style={{
                marginBottom:10
              }}
            >

              {
                item.startsWith("✓")
                ?
                <Tag color="success">{item}</Tag>
                :
                index===1
                ?
                <Tag color="processing">{item}</Tag>
                :
                item
              }

            </div>

          ))
        }

      </Card>


      <Input.TextArea
        rows={3}
        value={input}
        onChange={e=>setInput(e.target.value)}
        placeholder="告诉AI你的专业、兴趣和竞赛目标..."
      />

      <Button
        type="primary"
        block
        icon={<SendOutlined/>}
        style={{
          marginTop:10
        }}
        onClick={handleSend}
      >
        发送给AI分析
      </Button>

    </Card>
  );

}
