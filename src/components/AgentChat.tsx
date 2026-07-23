import {
  Card,
  Input,
  Button,
  Typography,
  Tag
} from "antd";
import {
  RobotOutlined,
  SendOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  useState
} from "react";

export function AgentChat(){

  const [input,setInput]=useState("");

  const [messages,setMessages]=useState([
    {
      role:"ai",
      text:"你好，我是赛智通AI竞赛智能体。我会根据你的专业背景、兴趣方向和竞赛目标，为你规划适合参加的竞赛。"
    }
  ]);

  const [status,setStatus]=useState([
    "用户画像分析",
    "竞赛数据库匹配",
    "竞赛价值评估",
    "参赛方案生成"
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

        return arr;

      });

      index++;

      if(index>=4){
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
          height:380,
          overflowY:"auto",
          marginBottom:20,
          padding:10
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
                  ?
                  "flex-end"
                  :
                  "flex-start",
                marginBottom:18,
                gap:10
              }}
            >

              {
                item.role==="ai"&&
                <div
                  style={{
                    width:36,
                    height:36,
                    borderRadius:"50%",
                    background:"#1677ff",
                    color:"#fff",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                  }}
                >
                  <RobotOutlined/>
                </div>
              }


              <div
                style={{
                  maxWidth:"75%",
                  padding:"12px 16px",
                  borderRadius:
                    item.role==="user"
                    ?
                    "16px 4px 16px 16px"
                    :
                    "4px 16px 16px 16px",
                  background:
                    item.role==="user"
                    ?
                    "#e6f4ff"
                    :
                    "#f5f5f5"
                }}
              >

                <Typography.Text>
                  {item.text}
                </Typography.Text>

              </div>


              {
                item.role==="user"&&
                <div
                  style={{
                    width:36,
                    height:36,
                    borderRadius:"50%",
                    background:"#e6f4ff",
                    color:"#1677ff",
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center"
                  }}
                >
                  <UserOutlined/>
                </div>
              }


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
                <Tag color="success">
                  {item}
                </Tag>
                :
                <Tag color={index===0?"processing":"default"}>
                  ◉ {item}
                </Tag>
              }

            </div>

          ))
        }

      </Card>


      <Input.TextArea
        value={input}
        autoSize={{
          minRows:1,
          maxRows:4
        }}
        onChange={
          e=>setInput(e.target.value)
        }
        onPressEnter={
          e=>{
            if(!e.shiftKey){
              e.preventDefault();
              handleSend();
            }
          }
        }
        placeholder="输入你的专业、技能和竞赛目标..."
        style={{
          borderRadius:16
        }}
      />


      <Button
        type="primary"
        block
        icon={<SendOutlined/>}
        style={{
          marginTop:10,
          borderRadius:12
        }}
        onClick={handleSend}
      >
        发送给AI分析
      </Button>


    </Card>
  );

}
