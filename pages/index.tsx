import Link from "next/link";
import Image from "next/image";
import store from './store'

function operatorList (listArray:{id:number, name:string, img:string}[]) {
  function getLink(id: number, name: string, img: string): any {
    return (<Link key={id} href={`/operator/${id}`}>
      <div className="operator">
        <Image className="operator-img" src={`/${img}`} width={80} height={80}/>
        <h2>{name}</h2>
      </div>
    </Link>)
  }

  return (
    listArray.map(key => getLink(key.id, key.name, key.img))
  )
}

export default function Home() {
  return (
    <div className="main-page">
      <div className="operators-list">
        {operatorList(store.opeartors)}
      </div>
    </div>
  )
}