import { request } from "./apiClient";
import type { AgentResponse } from "../features/ai-agent/types";

export type { AgentResponse };

export async function sendMessage(
  message: string,
): Promise<AgentResponse> {
  try {
    const data = await request<AgentResponse>("/chat", {
      method: "POST",
      body: { message },
    });

    return {
      answer: data.answer || "",
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
