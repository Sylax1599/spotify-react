import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Album({ images, id, external_urls, release_date, name, artists }) {
  return (
    <ListItem 
      imageUrl={images.length ? images[0].url : ""}
      id={id} 
      external_url={external_urls?.spotify}
      release_date={release_date}
      name={name}
      artist={artists[0].name}
    />
  );
})