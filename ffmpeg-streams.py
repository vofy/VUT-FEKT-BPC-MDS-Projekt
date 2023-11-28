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
        src_scale = int(subprocess.Popen(["ffprobe", "-v", "error", 
                                            "-select_streams",  "v:0", 
                                            "-show_entries", "stream=height", 
                                            "-of", "csv=s=x:p=0", str(stream["src"])], 
                                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True).stdout.read())
            
        ffstream_in = ffmpeg.input(stream["src"], loop=1, use_wallclock_as_timestamps=1)
            
        ffstreams_out = []

        for scale in config["output"]["scales"]:
            if (scale <= src_scale):
                ffstreams_out.append(
                    ffmpeg.output(ffstream_in, 
                                  "{}/{}_{}.flv".format(config["output"]["dst"], stream["uuid"], scale), 
                                  vcodec="libx264", 
                                  preset="veryfast", 
                                  r=10))
            
        ffstream = ffmpeg.merge_outputs(*ffstreams_out)
        # ffmpeg.run_async(ffstream, quiet=True)
        print(" ".join(ffmpeg.get_args(ffstream)))

        print("Stream {} started".format(stream["uuid"]))

if __name__ == '__main__':
    main()