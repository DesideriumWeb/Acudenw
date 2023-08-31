import {FaPlay} from "react-icons/fa";
import React from "react";

const ResourcesVideos = ({videos}) => {
    return(
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  my-12">
            {videos.map((video, index) => (
                <div key={index} className="w-full flex flex-col gap-3">
                    <div
                        style={{
                            background: `url(${video.image})`,
                            backgroundSize: "cover",
                        }}
                        className={`aspect-video w-full rounded-lg relative`}
                    >
                        <FaPlay
                            color="white"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
                        />
                    </div>

                    <h2 className="text-cyan-900 font-semibold">{video.title}</h2>
                    <p className="line-clamp-2">{video.desc}</p>
                    <button className="p-2 border-2 border-cyan-900 text-cyan-900 w-fit rounded-md">
                        Ver video
                    </button>
                </div>
            ))}
        </section>
    );
}

export default ResourcesVideos