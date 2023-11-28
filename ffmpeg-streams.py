import uuid
import toml
import ffmpeg
import subprocess

def assign_uuids(streams):
    # Generate unique identifiers for each stream
    for stream in streams:
        if ("uuid" not in stream):
            stream["uuid"] = str(uuid.uuid4())

def main():
    CONFIG_PATH = "./config.toml"

    config = toml.load(CONFIG_PATH)

    assign_uuids(config["input"])

    with open(CONFIG_PATH, 'w') as file:
        toml.dump(config, file)

    for stream in config["input"]:
        
        kwargs = {}
        
        if (stream["loop"] is True):
            kwargs['loop'] = 1
            
        kwargs['use_wallclock_as_timestamps'] = 1
        
        ffstream = ffmpeg.input(stream["src"], **kvargs)
            
        ffstream = ffmpeg.output(ffstream, 
            "{}/{}.flv".format(config["output"]["dst"], stream["uuid"]), 
            vcodec="libx264", 
            preset="veryfast", 
            r=10
        )
        
        ffmpeg.run_async(ffstream, quiet=False)
        print(" ".join(ffmpeg.get_args(ffstream)))

        print("Stream {} started".format(stream["uuid"]))

if __name__ == '__main__':
    main()