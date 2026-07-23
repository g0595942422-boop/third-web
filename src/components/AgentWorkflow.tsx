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

    if(step.status==="done"){
      icon=<CheckCircleOutlined/>;
    }else if(step.status==="running"){
      icon=<LoadingOutlined/>;
    }else{
      icon=<ClockCircleOutlined/>;
    }

    return {
      title:step.name,
      icon:icon,
      status:
      step.status==="done"
      ?
      "finish"
      :
      step.status==="running"
      ?
      "process"
      :
      "wait"
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
