import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Episidio({ images, id, external_urls, release_date, name, description }) {
  return (
    <ListItem 
      imageUrl={images.length ? images[0].url : ""}
      id={id} 
      external_url={external_urls?.spotify}
      release_date={release_date}
      name={description}
      artist={name}
    />
  );
})