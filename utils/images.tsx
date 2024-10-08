export function getImgurl(id:string, name:string) {
    if(id&&name){
      try {
        const k = "https://www.cricbuzz.com/a/img/v1/152x152/i1/";
        const a = `c${id}/`;
        const b = `${name.split(" ").join("-").toLowerCase()}.jpg`;
        return k + a + b;
      } catch (e) {
        return "nothing";
      }
    }
    else{
      return "https://c8.alamy.com/comp/WKN91Y/illustration-of-a-cricket-sports-player-batsman-batting-front-view-set-inside-shield-WKN91Y.jpg"
    }
    }
  
    export function getImageName(id: string, match: any) {
      if(match){
      let players: any[] = [...match?.teamAwayPlayers, ...match?.teamHomePlayers]
      let player: any = {};
      player = players?.find((p: any) => p.playerId == id)
      let url: string = getImgurl(player?.image, player?.playerName)
      return url;
      }
      else{
        return 'https://media.istockphoto.com/id/1084522126/vector/cricket-helmet.jpg?s=612x612&w=0&k=20&c=mMQ3D3dgFGqRdBj-6kZzn1M0mZZ0ShLhAPwqh92bMmM=';
      }
  }