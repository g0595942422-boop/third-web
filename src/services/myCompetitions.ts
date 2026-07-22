import { Competition } from './competitions';

const STORAGE_KEY = 'myCompetitions';


export function getMyCompetitions(): Competition[] {

  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);

}



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
window.dispatchEvent(
  new Event("competitionChange")
);
}




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
window.dispatchEvent(
  new Event("competitionChange")
);
}
