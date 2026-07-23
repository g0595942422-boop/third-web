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

interface WorkflowStep{
  name:string;
  status:string;
}

interface AgentWorkflowProps{
  steps:WorkflowStep[];
}

export function AgentWorkflow({
  steps
}:AgentWorkflowProps){

  const items=steps.map(step=>{

    let icon;

    let status:
    "finish" |
    "process" |
    "wait";


    if(step.status==="done"){

      icon=<CheckCircleOutlined/>;

      status="finish";

    }else if(step.status==="running"){

      icon=<LoadingOutlined/>;

      status="process";

    }else{

      icon=<ClockCircleOutlined/>;

      status="wait";

    }


    return {
      title:step.name,
      icon,
      status
    };

  });


  return(
    <Card
      title="Agent任务流"
      style={{
        borderRadius:designTokens.borderRadius,
        boxShadow:designTokens.boxShadow
      }}
    >

      {
        steps.length===0
        ?
        <Typography.Text type="secondary">
          等待用户输入，智能体将自动生成任务流程。
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
