import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Track({ album, id, external_urls, name, artists }) {
  return (
    <ListItem 
      imageUrl={album?.images.length ? album?.images[0].url : ""}
      id={id} 
      external_url={external_urls?.spotify}
      release_date={album?.release_date}
      name={name}
      artist={artists[0].name}
    />
  );
});