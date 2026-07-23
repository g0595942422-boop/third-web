export interface WorkflowStep{
  name:string;
  status:"done"|"running"|"wait";
}

export interface AgentResponse{
  answer:string;
  workflow:WorkflowStep[];
  recommendations:any[];
}


export async function sendMessage(
  message:string
):Promise<AgentResponse>{

  try{

    const response=await fetch(
      "http://localhost:8000/chat",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message
        })
      }
    );


    if(!response.ok){
      throw new Error(
        "Agent server error"
      );
    }


    const data=await response.json();


    return {
      answer:data.answer || data.message || "",
      workflow:data.workflow || [],
      recommendations:data.recommendations || []
    };


  }catch(error){

    console.error(
      "Agent request failed:",
      error
    );


    return {
      answer:"智能体暂时无法连接，请检查后端服务。",
      workflow:[
        {
          name:"等待连接后端",
          status:"wait"
        }
      ],
      recommendations:[]
    };

  }

}
