import { Competition } from './competitions';

const STORAGE_KEY = 'myCompetitions';


// 获取我的竞赛
export function getMyCompetitions(): Competition[] {

  const data = localStorage.getItem(STORAGE_KEY);


  if (!data) {
    return [];
  }


  return JSON.parse(data);

}



// 添加竞赛
export function addMyCompetition(
  competition: Competition
) {

  const list = getMyCompetitions();


  const exists = list.some(
    item => item.id === competition.id
  );


  if (exists) {
    return;
  }


  list.push(competition);


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list)
  );

}



// 删除竞赛
export function removeMyCompetition(
  id:number
) {

  const list = getMyCompetitions();


  const newList = list.filter(
    item => item.id !== id
  );


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(newList)
  );

}

}
