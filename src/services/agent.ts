import { request } from "./apiClient";

export interface WorkflowStep {
  name: string;
  status: "done" | "running" | "wait";
}

export interface AgentResponse {
  answer: string;
  workflow: WorkflowStep[];
  recommendations: unknown[];
}

export async function sendMessage(
  message: string,
): Promise<AgentResponse> {
  try {
    const data = await request<{
      answer?: string;
      message?: string;
      workflow?: WorkflowStep[];
      recommendations?: unknown[];
    }>("/chat", {
      method: "POST",
      body: { message },
    });

    return {
      answer: data.answer || data.message || "",
      workflow: data.workflow || [],
      recommendations: data.recommendations || [],
    };
  } catch (error) {
    console.error("Agent request failed:", error);

    return {
      answer: "智能体暂时无法连接，请检查后端服务。",
      workflow: [
        {
          name: "等待连接后端",
          status: "wait",
        },
      ],
      recommendations: [],
    };
  }
}
