import {
  Card,
  Steps,
  Typography
} from "antd";

import {
  CheckCircleOutlined,
  LoadingOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";

import { designTokens } from "../styles/tokens";

export interface WorkflowStep{
  name:string;
  status:"done"|"running"|"wait";
}

interface AgentWorkflowProps{
  steps:WorkflowStep[];
}

export function AgentWorkflow({
  steps
}:AgentWorkflowProps){

  const items=steps.map(step=>{

    if(step.status==="done"){
      return {
        title:step.name,
        icon:<CheckCircleOutlined/>,
        status:"finish" as const
      };
    }

    if(step.status==="running"){
      return {
        title:step.name,
        icon:<LoadingOutlined/>,
        status:"process" as const
      };
    }

    return {
      title:step.name,
      icon:<ClockCircleOutlined/>,
      status:"wait" as const
    };

  });


  return(
    <Card
      title="AI Agent 工作流"
      style={{
        borderRadius:designTokens.borderRadius,
        boxShadow:designTokens.boxShadow
      }}
    >

      {
        steps.length===0
        ?
        <Typography.Text type="secondary">
          等待用户输入，AI将自动规划任务。
        </Typography.Text>
        :
        <Steps
          direction="vertical"
          size="small"
          items={items}
        />
      }

    </Card>
  );
}
