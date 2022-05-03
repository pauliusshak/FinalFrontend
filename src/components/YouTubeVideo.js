const YouTubeVideo = ({youtubeId}) => {
    if (!youtubeId) return null;

    return (
        <iframe width="150" height="150" src={`https://www.youtube.com/embed/${youtubeId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    )
}

export default YouTubeVideo;