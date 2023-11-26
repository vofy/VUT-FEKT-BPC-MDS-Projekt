import PropTypes from 'prop-types'
import { Grid, GridItem } from "@chakra-ui/react";
import Video from "./Video";

export default function VideoGrid(props) {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={6}
      p={5}
    >
      {props.streams &&
        props.streams.map((stream) => (
          stream.uuid && <GridItem w="100%" key={stream.uuid}>
            <Video
              uuid={stream.uuid}
              title={stream.title}
              onVideoModalOpen={props.onVideoModalOpen}
            ></Video>
          </GridItem>
        ))}
    </Grid>
  );
}

VideoGrid.propTypes = {
  streams: PropTypes.array,
  onVideoModalOpen: PropTypes.func,
}