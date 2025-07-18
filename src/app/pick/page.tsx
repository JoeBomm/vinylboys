import PickCard, { PickCardProps } from "./components/PickCard";

export default function Pick({ className }: {className?: string}) {

  const picks: PickCardProps[] = [
    { user: { name: "Tom", color: "#f5a6a2" }, pick: { artist:"artist", year:1234, spotifyUrl:"https://www.google.com", notes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a molestie diam. Cras pellentesque erat diam, in asdfasdfa." }},
    { user: { name: "Kevin", color: "#f4a986" }, pick: { artist:"artist", year:1234, spotifyUrl:"https://www.google.com", notes:"abc123" }},
    { user: { name: "Alex", color: "#f5eba2" }},
    { user: { name: "Will", color: "#baf6af" }, pick: { artist:"artist", year:1234, spotifyUrl:"https://www.google.com", notes:"abc123" }},
    { user: { name: "Anthony", color: "#afd5f6" }, pick: { artist:"artist", year:1234, spotifyUrl:"https://www.google.com"}},
    { user: { name: "Joe", color: "#d3b8f7" }},
    { user: { name: "Jon", color: "#f7b8c9" }, pick: { artist:"artist", year:1234, spotifyUrl:"https://www.google.com" }},

  ]
  
  return (
    <>
    <div className={`${className} gap-4 flex`}>
      {picks.map((props, i) => (
        <PickCard
          key={i}
          user={props.user}
          pick={props.pick}
        />
      ))}
    </div>
    </>
  )
}