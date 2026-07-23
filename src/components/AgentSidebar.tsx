import {
  Card,
  Typography,
  Tag,
  Divider
} from "antd";
import {
  RobotOutlined,
  UserOutlined,
  AimOutlined,
  CodeOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { designTokens } from "../styles/tokens";

export function AgentSidebar(){

  return(
    <Card
      style={{
        height:"100%",
        borderRadius:designTokens.borderRadius,
        boxShadow:designTokens.boxShadow
      }}
      bodyStyle={{
        padding:20
      }}
    >

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:12
        }}
      >

        <div
          style={{
            width:42,
            height:42,
            borderRadius:12,
            background:"#1677ff",
            color:"#fff",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            fontSize:20
          }}
        >
          <RobotOutlined/>
        </div>


        <div>

          <Typography.Text strong>
            赛智通 AI Agent
          </Typography.Text>

          <br/>

          <Typography.Text
            type="secondary"
            style={{
              fontSize:12
            }}
          >
            竞赛规划智能助手
          </Typography.Text>

        </div>

      </div>


      <Divider/>


      <Typography.Text strong>
        当前状态
      </Typography.Text>


      <div
        style={{
          marginTop:12,
          padding:12,
          borderRadius:10,
          background:"#f6f8fa"
        }}
      >

        <Tag color="green">
          ● 智能体已就绪
        </Tag>

        <Typography.Paragraph
          type="secondary"
          style={{
            marginTop:10,
            marginBottom:0
          }}
        >
          等待输入竞赛目标，开始分析。
        </Typography.Paragraph>

      </div>


      <Divider/>


      <Typography.Text strong>
        用户画像
      </Typography.Text>


      <div
        style={{
          marginTop:12
        }}
      >

        <ProfileItem
          icon={<UserOutlined/>}
          title="专业"
          value="待分析"
        />


        <ProfileItem
          icon={<AimOutlined/>}
          title="竞赛目标"
          value="待分析"
        />


        <ProfileItem
          icon={<CodeOutlined/>}
          title="技能"
          value="待分析"
        />


        <ProfileItem
          icon={<TrophyOutlined/>}
          title="适合方向"
          value="待推荐"
        />


      </div>


    </Card>
  );

}


function ProfileItem({
  icon,
  title,
  value
}:{
  icon:any;
  title:string;
  value:string;
}){

  return(

    <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        padding:"10px 0"
      }}
    >

      <div
        style={{
          display:"flex",
          alignItems:"center",
          gap:8
        }}
      >

        {icon}

        <Typography.Text>
          {title}
        </Typography.Text>

      </div>


      <Typography.Text
        type="secondary"
      >
        {value}
      </Typography.Text>


    </div>

  );

}
