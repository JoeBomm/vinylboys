import { PickDto } from "../model"

export default function PickCard(pick: PickDto) {
  return (
    <>
      <div className="size-56 p-2 border">
        <div style={{ backgroundColor: pick.user.color}} className="text-soft-black">{pick.user.userName}</div>
        {(pick.pickId && <div>
            <div>{pick.artist}</div>
            <div>{pick.albumName}</div>
            <div>{pick.year}</div>
            <div><a href={pick.spotifyUrl} target="_blank" rel="noreferrer">Spotify</a></div>
            <div>Notes: {pick.note}</div>
          </div>)
          || (pick.user.userName === "Joe" && <div>Click to Pick</div>) // mock active user zero state
          || <div>This dang ol' boy ain't picked!</div>
        }
      </div>
    </>
  )
}