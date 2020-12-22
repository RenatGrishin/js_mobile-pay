import Image from "next/image";

export default function complete () {
  return(
    <div>
        <Image className={'complete-img'} src={`/complete.svg`} layout={'fill'}></Image>
    </div>
  )
}